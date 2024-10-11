import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions';
const options = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true
}
export var client: TelegramClient = new TelegramClient(new StringSession(process.env.SESSION), Number(process.env.API_ID), process.env.API_HASH, {
  connectionRetries: 5,
})
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  app.enableCors(options);
  await client.connect()
  await client.getDialogs()
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3001);
}

bootstrap();
