import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { RequestWithUserData } from "src/types";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest<RequestWithUserData>();

    // Ejecuto el método del controlador
    return next.handle().pipe(
      map((data) => {


        

        // Aca modificamos lo que envía el controlador
        return {
          success: true,
          message: 'Operación exitosa',
          result: data ?? [],  //Esto es lo que devuelven los endpoints
          errors: [],
          token: null,
        };
      }),
    );
  }
}
