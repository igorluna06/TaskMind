import {Request, Response, NextFunction} from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): Response {
    if(err.getStatusCode){
        return res.status(err.getStatusCode()).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
}