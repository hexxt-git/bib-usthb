export interface FileInfo {
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