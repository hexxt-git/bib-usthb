import express from "express";
import multer from "multer";
import Path from "path";
import { Database } from "./services/database";
import { FileService } from "./services/fileService";
import { authMiddleware } from "./middleware/auth";
import { errorHandler, asyncHandler } from "./middleware/errorHandler";
import { loggerMiddleware } from "./middleware/logger";
import fsCB from "fs";
import fs from "fs/promises";

const CONTENT_BASE_DIR = Path.resolve("./content");
const UPLOADS_BASE_DIR = Path.resolve("./uploads");

const getSaveToPath = (req: express.Request) => {
    const directory = `${req.body?.name.replaceAll(/\\|\//g, " ") || "Anonymous"} - ${new Date()
        .toLocaleString("en-GB")
        .replaceAll("/", "-")}`.replaceAll(/:|,/g, " ");
    const saveTo = Path.join(UPLOADS_BASE_DIR, directory);
    return saveTo;
};

const upload = multer({
    limits: { fileSize: 12 * 1024 * 1024 }, // 12MB
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const saveTo = getSaveToPath(req);
            fsCB.mkdirSync(saveTo, { recursive: true });
            cb(null, saveTo);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname.replace(/\\|\//g, " "));
        },
    }),
});

const app = express();
const db = new Database("./file_stats.db");
const fileService = new FileService(CONTENT_BASE_DIR, db);

// Middleware
app.use(loggerMiddleware);
app.use(authMiddleware);

declare global {
    interface Error {
        statusCode?: number;
    }
}

// Routes
app.post(
    "/upload",
    upload.array("files"),
    asyncHandler(async (req, res) => {
        if (!req.files) {
            const error = new Error("Files Required");
            error.statusCode = 400;
            throw error;
        }

        const saveTo = getSaveToPath(req);
        let information = {
            sender: {
                name: req.body.name,
                email: req.body.email,
                usthb_student: req.body.usthb_student,
                domain: req.body.domain,
            },
            resources: {
                specialty: req.body.specialty,
                year: req.body.year,
                module: req.body.module,
            },
            files: [] as any[],
            additional: req.body.additional,
        };

        const files = req.files as Express.Multer.File[];

        const formatBytes = (size: number): string => {
            if (size === 0) return "0 Bytes";
            const k = 1024;
            const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            const i = Math.floor(Math.log(size) / Math.log(k));
            return parseFloat((size / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
        };

        for (let i = 0; i < files.length; i++) {
            let file = {
                name: files[i].originalname,
                size: formatBytes(files[i].size)
            };

            information.files.push(file);
        }

        await fs.writeFile(Path.join(saveTo, ".upload.json"), JSON.stringify(information, null, 4));
        res.send("ok");
    })
);

app.get(
    "/download/:path(*)",
    asyncHandler(async (req, res) => {
        const path = req.params.path;

        if (!path) {
            const error = new Error("Route Required");
            error.statusCode = 400;
            throw error;
        }

        const filePath = Path.resolve(Path.join(CONTENT_BASE_DIR, path));
        fileService.validatePath(filePath);

        const fileExists = await fs
            .access(filePath)
            .then(() => true)
            .catch(() => false);
        if (!fileExists) {
            const error = new Error("File Not Found");
            error.statusCode = 404;
            throw error;
        }

        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            const error = new Error("File is a Directory");
            error.statusCode = 400;
            throw error;
        }

        await db.incrementDownload(path);
        res.sendFile(filePath);
    })
);

app.get(
    "/get/:path(*)?",
    asyncHandler(async (req, res) => {
        const path = (req.params.path as string) || "/";
        const fileInfo = await fileService.getFileInfo(path);
        const filePath = Path.resolve(Path.join(CONTENT_BASE_DIR, path));
        const fileExists = await fs
            .access(filePath)
            .then(() => true)
            .catch(() => false);
        if (!fileExists) {
            const error = new Error("File Not Found");
            error.statusCode = 404;
            throw error;
        }
        await db.incrementVisit(path);
        res.json(fileInfo);
    })
);

app.get(
    "/search",
    asyncHandler(async (req, res) => {
        const query = req.query.query;
    })
);

// Error handler goes last
app.use(errorHandler);

app.listen(25565, () => {
    console.log("listening on http://localhost:25565");
});

