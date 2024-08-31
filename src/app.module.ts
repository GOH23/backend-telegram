import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}),TypeOrmModule.forRoot({
    type: 'sqlite',
    database: "/db/main.sqlite3",
    entities: [],
    synchronize: true
  }),AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
