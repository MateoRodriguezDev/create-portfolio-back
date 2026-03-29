// Funciones de Firebase //

import { BadRequestException } from "@nestjs/common";

  /**
   * @description Subir imágenes (Crear o Editar)
   * @param {Express.Multer.File} file
   */
  async function uploadIMG(file: Express.Multer.File) {
    // Verifico si se envió algún archivo
    if (!file) {
      throw new BadRequestException('Must sent an image');
    }
  
    const app = this.admin.getApp();
    const bucket = app.storage().bucket();
    const fileUpload = bucket.file(`products/img/${file.originalname}`);

    // Cargo el archivo en Firebase Storage
    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Hago el archivo público
    await fileUpload.makePublic();
  }

  /**
   * @description Eliminar imágenes
   * @param {Product} product
   */
  async function deleteImg(imageURL: string) {
    

    const app = this.admin.getApp();
    const bucket = app.storage().bucket();
    const fileUpload = bucket.file(imageURL);

    fileUpload
      .exists()
      .then((data) => {
        if (data[0]) {
          return fileUpload.delete();
        } else {
          console.log('La imagen no existe');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }