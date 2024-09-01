import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials":true
}
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  app.enableCors(options);
  await app.listen(3001);
}
bootstrap();
