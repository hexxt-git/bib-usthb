import type { Request, Response, NextFunction } from "express";
import logger from "../services/logger";

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(process.env.errors) console.error(err)

    logger.error(`${req.method} ${req.originalUrl}`.padEnd(30, " ") + ` ${err.statusCode} ${err.message}`);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || "Internal Server Error",
    });
};
