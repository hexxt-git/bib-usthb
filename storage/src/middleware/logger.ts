import type { Request, Response, NextFunction } from "express";
import logger from "../services/logger.ts";

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
        logger.info(
            ` ${req.method} ${decodeURIComponent(req.originalUrl)}`.padEnd(30, " ") +
                ` ${res.statusCode} - ${duration}ms - ip:${ip}`
        );
    });

    next();
}
