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
            `--sql
                CREATE TABLE IF NOT EXISTS file_stats (
                    path TEXT PRIMARY KEY,
                    downloads INTEGER DEFAULT 0,
                    visits INTEGER DEFAULT 0,
                    checked BOOLEAN DEFAULT 0
                )
            `,
            (err) => {
                if (err) console.error("Error initializing database:", err);
            }
        );
        this.db.run(
            `--sql
            UPDATE file_stats
            SET checked = false
            `,
            (err) => {
                if (err) console.error("Error initializing database:", err);
            }
        );
        
        console.log('database initialized')
    }

    async searchFile(searchTerm: string): Promise<any[]> {
        const sanitizedTerm = this.sanitizePath(searchTerm);

        return new Promise((resolve, reject) => {
            const sql = `--sql
                SELECT 
                    path,
                    visits,
                    downloads,
                    checked
                FROM file_stats 
                WHERE checked = true AND
                LOWER(path) LIKE '%' || LOWER(?) || '%'
                ORDER BY visits DESC, downloads DESC
                LIMIT 20
            `;
            this.db.all(sql, [sanitizedTerm], (err, rows) => {
                if (err) reject(err);
                else resolve(rows || []);
            });
        });
    }

    async insertFile(fileStats: {
        path: string;
        checked?: boolean;
        downloads?: number;
        visits?: number;
    }): Promise<void> {
        const sanitizedPath = this.sanitizePath(fileStats.path);
        return new Promise((resolve, reject) => {
            this.db.run(
                `INSERT INTO file_stats (path, checked, downloads, visits) 
                VALUES (?, ?, ?, ?)
                ON CONFLICT(path) DO UPDATE SET checked = true;`,
                [
                    sanitizedPath,
                    fileStats.checked ?? 0,
                    fileStats.downloads ?? 0,
                    fileStats.visits ?? 0,
                ],
                (err) => (err ? reject(err) : resolve())
            );
        });
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
