import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1")
  app.enableCors({
    origin: [
      "https://telegram-sell-bot.vercel.app/"
    ],
  });
  await app.listen(3001);
}
bootstrap();
