import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }))

  app.enableCors();

  app.setGlobalPrefix('api/v1');

  //Para generalizar la respuesta de los controllers
  app.useGlobalInterceptors(new ResponseInterceptor());

  //Para generalizar la respuesta de errores de los controllers
  app.useGlobalFilters(new AllExceptionsFilter());

    const config = new DocumentBuilder()
    .setTitle('Project Docs')
    .setDescription('All the endpoints for the project are goint to be shown here')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Endpoints:')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
