import express from "express";
import multer from "multer";
import Path from "path";
import { Database } from "./services/database";
import { FileService } from "./services/fileService";
import { authMiddleware } from "./middleware/auth";
import { errorHandler, asyncHandler } from "./middleware/errorHandler";
import { loggerMiddleware } from "./middleware/logger";
import fs from "fs/promises";

const BASE_DIR = Path.resolve("./uploads");
const upload = multer({
    dest: "temp/",
    limits: { fileSize: 12 * 1024 * 1024 }, // 12MB
});

const app = express();
const db = new Database("./file_stats.db");
const fileService = new FileService(BASE_DIR, db);

// Middleware
app.use(authMiddleware(process.env.secret || ""));
app.use(loggerMiddleware);

declare global {
    interface Error {
        statusCode?: number;
    }
}

// Routes
app.post(
    "/upload/:path(*)?",
    upload.single("file"),
    asyncHandler(async (req, res) => {
        const file = req.file;
        const path = (req.params.path as string) || ".";

        if (!file) {
            const error = new Error("File Required");
            error.statusCode = 400;
            throw error;
        }

        const targetPath = Path.resolve(Path.join(BASE_DIR, path));
        fileService.validatePath(targetPath);

        const targetFilePath = Path.join(targetPath, file.originalname);
        await fs.mkdir(Path.dirname(targetFilePath), { recursive: true });

        if (
            await fs
                .access(targetFilePath)
                .then(() => true)
                .catch(() => false)
        ) {
            await fs.unlink(file.path);
            const error = new Error("File already exists");
            error.statusCode = 400;
            throw error;
        }

        await fs.rename(file.path, targetFilePath);
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

        const filePath = Path.resolve(Path.join(BASE_DIR, path));
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
