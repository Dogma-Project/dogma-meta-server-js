import { Request, Response, NextFunction } from "express";
export declare function getNetwork(req: Request, res: Response, next: NextFunction): Promise<void>;
export declare function getOnline(): Promise<void>;
