import type { Request, Response, NextFunction } from "express";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const apiToken = req.headers["x-api-token"];

    if (!apiToken || apiToken !== process.env.secret) {
        const error = new Error("Token Unauthorized");
        error.statusCode = 401;
        throw error;
    }

    next();
}
