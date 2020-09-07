import { Request, Response } from "express";

export default interface ControllerBase {
  index(req: Request, res: Response): Promise<Response>
  one(req: Request, res: Response): Promise<Response>
  create(req: Request, res: Response): Promise<Response>
  update(req: Request, res: Response): Promise<Response>
  remove(req: Request, res: Response): Promise<Response>
  
}