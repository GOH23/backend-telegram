import { Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { TelegramApiService } from './telegram_api.service';

import { RateLimiterGuard } from 'nestjs-rate-limiter'


@Controller('telegram-api')
@UseGuards(RateLimiterGuard)
export class TelegramApiController {
  constructor(private readonly telegramApiService: TelegramApiService) {}
  @Get("reviews")
  async get_messages_reviews(){
    return this.telegramApiService.get_reviews()
  }

  @Get("news")
  async get_news(){
    return this.telegramApiService.get_news()
  }
}
