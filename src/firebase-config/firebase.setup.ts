import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

let app: admin.app.App | null = null;

@Injectable()
export class FirebaseAdmin implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}


  /**
   * @description
   * conecta a firebase con las keys de nuestro proyecto
   */
  async onApplicationBootstrap() {
    if (!app) {
      const serviceAccountPath = this.configService.get<string>(
        'FIREBASE_SERVICE_ACCOUNT_KEY',
      );
      const storageBucket = this.configService.get<string>(
        'FIREBASE_STORAGE_BUCKET',
      );
      let serviceAccount : string = ''
      if(serviceAccountPath) {
        serviceAccount = JSON.parse(serviceAccountPath);
      }

      app = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: storageBucket,
      });
      console.log('Conexion a firebase exitosa');
    }
  }

  /**
   * @description
   * te devuelve una instancia de firebase para poder utilizarla cuando la requerimos
   * 
   * @returns {admin.app.App} app
   */
  getApp(): admin.app.App {
    if (!app) {
      throw new Error('Firebase app has not been initialized');
    }
    return app;
  }
}

