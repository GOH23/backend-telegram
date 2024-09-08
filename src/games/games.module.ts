import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Games } from './entities/game.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Games]),UserModule],
  exports: [GamesService],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
