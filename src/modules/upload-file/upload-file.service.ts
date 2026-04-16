import { BadRequestException, Injectable } from '@nestjs/common';
import { DecodedIdToken } from 'firebase-admin/auth';
import { FirebaseAdmin } from 'src/firebase-config/firebase.setup';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadFileService {
  constructor(private readonly admin: FirebaseAdmin) {}

  private readonly MAX_SIZE = 5 * 1024 * 1024; // 2MB
  private readonly ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  /**
   * @description Subir imágenes (Crear o Editar)
   * @param {Express.Multer.File} file
   */
  async uploadIMG(file: Express.Multer.File, path: string) {
    // Verifico si se envió algún archivo
    if (!file) {
      throw new BadRequestException('Must sent an image');
    }

    // Validar tipo
    if (!this.ALLOWED_TYPES.includes(file.mimetype)) {
      console.log(file.mimetype)
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${this.ALLOWED_TYPES.join(', ')}`,
      );
    }

    // Validar tamaño
    if (file.size > this.MAX_SIZE) {
      throw new BadRequestException(
        `File too large. Max size: ${this.MAX_SIZE / (1024 * 1024)}MB`,
      );
    }

    // Cambio el nombre
    const extension = file.originalname.split('.').pop();
    file.originalname = `${uuidv4()}.${extension}`;

    const app = this.admin.getApp();
    const bucket = app.storage().bucket();
    const fileUpload = bucket.file(`${path}/${file.originalname}`);

    // Cargo el archivo en Firebase Storage
    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Hago el archivo público
    await fileUpload.makePublic();

    return `${path}/${file.originalname}`;
  }

  /**
   * @description Eliminar imágenes
   */
  async deleteImg(imageURL: string) {
    if (!imageURL) {
      console.log('No image URL provided, skipping delete');
      return;
    }

    const app = this.admin.getApp();
    const bucket = app.storage().bucket();
    const fileUpload = bucket.file(imageURL);

    fileUpload
      .exists()
      .then((data) => {
        if (data[0]) {
          console.log('Image deleted');
          return fileUpload.delete();
        } else {
          console.log(`The image doesn't exist`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async verifyUID(UIDtoken: string): Promise<DecodedIdToken | null>{
    const app = this.admin.getApp();

    const token = await app.auth().verifyIdToken(UIDtoken)

    if(token) {
      return token
    }

    return null

  }

}
