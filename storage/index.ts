import express from "express";
import multer from "multer";
import fs from "fs";
import Path from "path";
import sqlite3 from "sqlite3";

const BASE_DIR = Path.resolve("./uploads");
const upload = multer({
    dest: "temp/",
    limits: { fileSize: 12 * 1024 * 1024 }, // 12MB
});

const db = new sqlite3.Database("./file_stats.db");

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS file_stats (
            path TEXT PRIMARY KEY,
            downloads INTEGER DEFAULT 0,
            visits INTEGER DEFAULT 0
        )
    `);
});

const app = express();
app.use((req, res, next) => {
    const apiToken = req.headers["x-api-token"];

    if (!apiToken || apiToken !== process.env.secret) {
        res.status(403).send("Forbidden");
        return;
    }

    next();
});
app.use((req, res, next) => {
    const start = Date.now();

    // const originalJson = res.json;
    // res.json = function (body) {
    //     console.log("Response JSON:", body);
    //     return originalJson.call(this, body);
    // };

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(
            `${req.method} ${req.originalUrl}`.padEnd(55, " ") + ` ${res.statusCode} - ${duration}ms`
        );
    });

    next();
});

function incrementVisit(path: string) {
    db.run(
        `INSERT INTO file_stats (path, visits) VALUES (?, 1)
        ON CONFLICT(path) DO UPDATE SET visits = visits + 1;`,
        [path]
    );
}

function incrementDownload(path: string) {
    db.run(
        `INSERT INTO file_stats (path, downloads) VALUES (?, 1)
        ON CONFLICT(path) DO UPDATE SET downloads = downloads + 1;`,
        [path]
    );
}

function getFileStats(path: string): Promise<{ visits: number; downloads: number }> {
    return new Promise((resolve, reject) => {
        path = path.replaceAll(/\\\\|\/\/|\\/g, "/"); // common windows dev L
        path = path.replace(/^\//, '')
        db.get(
            `SELECT visits, downloads FROM file_stats WHERE path = ?`,
            [path],
            (err: any, row: { visits: number; downloads: number } | undefined) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                if (!(row?.visits ?? 0 > 0)) console.log(`path not found in db: ${path}`);
                resolve(row ?? { visits: 0, downloads: 0 });
            }
        );
    });
}

app.post("/upload/:path(*)?", upload.single("file"), (req, res): any => {
    const file = req.file;
    const path = (req.params.path as string) || ".";

    if (!file) return res.status(400).send("File Required");

    const targetPath = Path.resolve(Path.join(__dirname, "uploads", path));
    if (!targetPath.startsWith(BASE_DIR) || path.includes("..")) {
        fs.rmSync(file.path, { force: true });
        return res.status(400).send("Unauthorized");
    }

    const targetFilePath = Path.join(targetPath, file.originalname);

    fs.mkdirSync(targetPath, { recursive: true });

    if (fs.existsSync(targetFilePath)) {
        fs.rmSync(file.path, { force: true });
        return res.status(400).send("File already exists");
    }

    fs.rename(file.path, targetFilePath, (err) => {
        if (err) {
            fs.rmSync(file.path, { force: true });
            return res.status(500).send("Internal Error");
        }
        res.send("ok");
    });
});

app.get("/download/:path(*)", (req, res): any => {
    const path = req.params.path as string;

    if (!path) return res.status(400).send("Route Required");
    const filePath = Path.resolve(Path.join(__dirname, "uploads", path));
    if (!filePath.startsWith(BASE_DIR) || path.includes("..")) {
        return res.status(400).send("Unauthorized");
    }

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("File Not Found");
    }

    if (fs.statSync(filePath).isDirectory()) {
        // TODO: zip and upload maybe
        // TODO: implement rate limits or smth
        return res.status(400).send("File is a Directory");
    }

    incrementDownload(path);

    res.download(filePath, filePath, (err) => {
        if (err) res.status(500).send("Internal Error");
    });
});

app.get("/get/:path(*)?", async (req, res): Promise<void> => {
    const path = (req.params.path as string) || "/";

    const filePath = Path.resolve(Path.join(__dirname, "uploads", path));
    if (!filePath.startsWith(BASE_DIR) || path.includes("..")) {
        res.status(400).send("Unauthorized");
        return;
    }

    if (!fs.existsSync(filePath)) {
        res.status(404).send("File Not Found");
        return;
    }

    const fileInfo = await getFileInfo(path);

    incrementVisit(path);

    res.json(fileInfo);
});

interface FileInfo {
    label: string;
    path: string;
    isDirectory: boolean;
    directoryChildren?: FileInfo[];
    mimeType: string;
    lastModified: Date;
    size: number;
    downloads: number | null;
    visits: number | null;
}

async function getFileInfo(path: string, recursive: boolean = true): Promise<FileInfo> {
    const fullPath = Path.join(__dirname, "uploads", path);
    const stat = fs.statSync(fullPath);
    const isDirectory = stat.isDirectory();
    const mimeType = isDirectory ? "directory" : require("mime-types").lookup(fullPath) || "unknown";
    const fileInfo: FileInfo = {
        label: Path.basename(path),
        path: path,
        isDirectory,
        mimeType,
        lastModified: stat.mtime,
        size: stat.size,
        downloads: null,
        visits: null,
    };

    const { visits, downloads } = await getFileStats(path);
    fileInfo.visits = visits;
    fileInfo.downloads = downloads;

    if (isDirectory && recursive) {
        const children: FileInfo[] = [];
        const childNames = fs.readdirSync(fullPath);
        for (const child of childNames) {
            const childInfo = await getFileInfo(Path.join(path, child), false);
            children.push(childInfo);
        }
        fileInfo.directoryChildren = children;
    }

    return fileInfo;
}

app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
