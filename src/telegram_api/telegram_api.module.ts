import { Module } from '@nestjs/common';
import { TelegramApiService } from './telegram_api.service';
import { TelegramApiController } from './telegram_api.controller';
import {RateLimiterModule} from "nestjs-rate-limiter"
@Module({
  imports: [ RateLimiterModule.register({
    points: 10, // Number of points
    duration: 60, // Per second(s)
  })],
  controllers: [TelegramApiController],
  providers: [TelegramApiService],
})
export class TelegramApiModule { }
