export class ControllerResponse<Type> {
  code: number;
  message?: string;
  data?: Type;

  constructor(code: number, message?: string, data?: Type) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
