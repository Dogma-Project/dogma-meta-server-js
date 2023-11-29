import { Request, Response, NextFunction } from "express";
export declare function getConfig(req: Request, res: Response, next: NextFunction): void;
export declare function setConfig(req: Request, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
