export default class AppError {
  readonly message: string;
  readonly statusCode: number;
  readonly erroMessage: string;
  constructor(msg: string, status = 400, errMessage= "Um erro interno foi gerado") {
    this.message = msg;
    this.statusCode = status;
    this.erroMessage = errMessage;
  }

}