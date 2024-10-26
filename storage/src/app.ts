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
        .replaceAll("/", "-")}`;
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
    upload.array("file"),
    asyncHandler(async (req, res) => {
        console.log(req.body);
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
                isUsthbStudent: req.body.isUsthbStudent,
                studyField: req.body.studyField,
            },
            files: [] as any[],
            additional: req.body.additional,
        };

        const files = req.files as Express.Multer.File[];
        const fileData = Array.isArray(req.body.file_data)
            ? req.body.file_data.map(JSON.parse)
            : [JSON.parse(req.body.file_data)];

        for (let i = 0; i < files.length && i < fileData.length; i++) {
            let file = {
                name: files[i].originalname,
                ...fileData[i],
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
        await db.incrementVisit(path);
        res.json(fileInfo);
    })
);

// Error handler goes last
app.use(errorHandler);

app.listen(25565, () => {
    console.log("listening on http://localhost:25565");
});
