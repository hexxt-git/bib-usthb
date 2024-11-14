import fs from "fs/promises";
import Path from "path";
import { lookup } from "mime-types";
import type { FileInfo } from "../models/FileInfo";
import { Database } from "./database";

export class FileService {
    constructor(private readonly baseDir: string, private readonly db: Database) {
        // make sure to restart file server after updating files
        this.initPath("/").then(() => {
            console.log("DATABASE UP TO DATE");
        });
    }

    private async initPath(path: string) {
        if (path.split(/\/|\\/).length <= 3) console.log("initializing path", path);
        try {
            const entries = await fs.readdir(Path.join(this.baseDir, path), { withFileTypes: true });
            for (const entry of entries) {
                await this.db.insertFile({
                    path: Path.join(path, entry.name),
                    checked: true,
                });
                if (entry.isDirectory()) {
                    await this.initPath(Path.join(path, entry.name));
                }
            }
        } catch (error) {
            console.error(`Error initializing path ${path}:`, error);
        }
    }

    public validatePath(path: string): void | never {
        const fullPath = Path.resolve(Path.join(this.baseDir, path));
        if (!fullPath.startsWith(this.baseDir) || path.includes("..")) {
            const error = new Error("Directory Unauthorized");
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
