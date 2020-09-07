import { Request, Response } from "express";
import XlsxToJsonParser from "@infra/parserxlsFiles/converterXlsxToJson";
export default class AdminController {

  async convertXlsx(req: Request, res: Response): Promise<Response> { 
    const xlsx = new XlsxToJsonParser();
    xlsx.parserToJson()
    return res.status(200).json({message: 'loaded'})
  }
}