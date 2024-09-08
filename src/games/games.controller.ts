import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto, CreateGamesDto } from './dto/create-game.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { UseRoles } from 'src/roles/roles.decorator';
import { Roles } from 'src/user/entities/user.entity';
import { RolesGuard } from 'src/roles/roles.guard';

@Controller('games')
@UseGuards(AuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}
  @Post()
  @UseRoles([Roles.Admin])
  @UseGuards(RolesGuard)
  async add(@Body() gameDto: CreateGameDto){
    return this.gamesService.add_game(gameDto);
  }
  @Get()
  async get(){
    return this.gamesService.get_all();
  }
}
