import {Request, Response, NextFunction} from "express";
import { HttpErrorMessages } from "../errors/messages/HttpErrorMessages";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): Response {
    if(err.getStatusCode){
        return res.status(err.getStatusCode()).json({ error: err.message });
    }
    console.error(err);
    return res.status(500).json({ error: HttpErrorMessages.INTERNAL_SERVER_ERROR });
}