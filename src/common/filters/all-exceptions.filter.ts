import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from "@nestjs/common";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Almacena el error HTTP
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : 500;

    // Determina el mensaje de error
    const message = exception instanceof HttpException
      ? exception.getResponse()
      : exception.message;

    // Devuelve un JSON con estructura uniforme
    response.status(status).json({
      success: false,
      message: typeof message === 'string' ? message : message?.message || 'Error',
      result: [],
      errors: [message],
      token: null,
    });
  }
}
