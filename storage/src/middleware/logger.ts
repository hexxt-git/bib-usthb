import type { Request, Response, NextFunction } from "express";
import logger from "../services/logger.ts";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        logger.info(
            ` ${req.method} ${req.originalUrl}`.padEnd(30, " ") + ` ${res.statusCode} - ${duration}ms`
        );
    });

    next();
}
