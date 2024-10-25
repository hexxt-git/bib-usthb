import fs from "fs/promises";
import Path from "path";
import { lookup } from "mime-types";
import type { FileInfo } from "../models/FileInfo";
import { Database } from "./database";

export class FileService {
    constructor(private readonly baseDir: string, private readonly db: Database) {}

    public validatePath(path: string): void {
        const fullPath = Path.resolve(Path.join(this.baseDir, path));
        if (!fullPath.startsWith(this.baseDir) || path.includes("..")) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }
    }

    async getFileInfo(path: string, recursive = true): Promise<FileInfo> {
        this.validatePath(path);
        const fullPath = Path.join(this.baseDir, path);

        try {
            const stat = await fs.stat(fullPath);
            const isDirectory = stat.isDirectory();
            const mimeType = isDirectory ? "directory" : lookup(fullPath) || "unknown";

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

            const stats = await this.db.getFileStats(path);
            fileInfo.visits = stats.visits;
            fileInfo.downloads = stats.downloads;

            if (isDirectory && recursive) {
                const children = await fs.readdir(fullPath);
                fileInfo.directoryChildren = await Promise.all(
                    children.map((child) => this.getFileInfo(Path.join(path, child), false))
                );
            }

            return fileInfo;
        } catch (error) {
            if ((error as NodeJS.ErrnoException).code === "ENOENT") {
                const error = new Error("File Not Found");
                error.statusCode = 404;
                throw error;
            }
            throw error;
        }
    }
}
