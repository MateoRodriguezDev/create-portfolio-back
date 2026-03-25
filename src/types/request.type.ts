// src/types/express.d.ts
import { Request } from 'express';

export interface RequestWithUserData extends Request {
  user?: {
        email: string, 
        idusuario: number,
  };
}
