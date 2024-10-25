import sqlite3 from "sqlite3";
import type { FileStats } from "../models/FileStats";

export class Database {
    private db: sqlite3.Database;

    constructor(dbPath: string) {
        this.db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE);
        this.initialize();
    }

    private initialize(): void {
        this.db.run(
            `
            CREATE TABLE IF NOT EXISTS file_stats (
                path TEXT PRIMARY KEY,
                downloads INTEGER DEFAULT 0,
                visits INTEGER DEFAULT 0
            )
        `,
            (err) => {
                if (err) console.error("Error initializing database:", err);
            }
        );
    }

    async incrementVisit(path: string): Promise<void> {
        path = this.sanitizePath(path);
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO file_stats (path, visits) VALUES (?, 1)
                ON CONFLICT(path) DO UPDATE SET visits = visits + 1;`,
                [path],
                (err) => (err ? reject(err) : resolve())
            );
        });
    }

    async incrementDownload(path: string): Promise<void> {
        path = this.sanitizePath(path);
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO file_stats (path, downloads) VALUES (?, 1)
                ON CONFLICT(path) DO UPDATE SET downloads = downloads + 1;`,
                [path],
                (err) => (err ? reject(err) : resolve())
            );
        });
    }

    async getFileStats(path: string): Promise<FileStats> {
        path = this.sanitizePath(path);
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT visits, downloads FROM file_stats WHERE path = ?`,
                [path],
                (err, row: FileStats) => {
                    if (err) {
                        console.error(`Error getting file stats for ${path}:`, err);
                        resolve({ path, visits: 0, downloads: 0 });
                    } else {
                        resolve(row ?? ({ path, visits: 0, downloads: 0 } as FileStats));
                    }
                }
            );
        });
    }

    private sanitizePath(path: string): string {
        return path.replaceAll(/\\\\|\/\/|\\/g, "/").replace(/^\//, "") || "/";
    }
}
