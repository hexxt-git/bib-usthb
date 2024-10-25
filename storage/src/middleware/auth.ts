import type { Request, Response, NextFunction } from "express";

export function authMiddleware(secret: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const apiToken = req.headers["x-api-token"];

        if (!apiToken || apiToken !== secret) {
            const error = new Error("Unauthorized");
            error.statusCode = 401;
            throw error;
        }

        next();
    };
}
