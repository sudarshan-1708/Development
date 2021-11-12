import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('NEST Api').setDescription('Basic CRUD Api using Nestjs with database connectivity and Authentication.')
  .setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app,config);

  SwaggerModule.setup('/',app,document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);


}
bootstrap();
