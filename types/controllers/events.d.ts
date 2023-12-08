import { Request, Response, NextFunction } from "express";
declare global {
    namespace Express {
        interface Request {
            dogma_id?: string;
        }
        interface Response {
            dogma_id?: string;
        }
    }
}
export default function Events(request: Request, response: Response, next: NextFunction): void;
export declare function broadcast(type: string, data: object): void;
