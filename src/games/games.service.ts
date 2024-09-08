import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Games } from './entities/game.entity';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';

@Injectable()
export class GamesService {
    /**
     *
     */
    constructor(@InjectRepository(Games) private gamesRepository: Repository<Games>) {
    }
    add_game(createGame: CreateGameDto){
        return this.gamesRepository.save(createGame);   
    }
    find_by_name(name: string){
        return this.gamesRepository.findOne({where: {gameName: name}});   
    }
    get_all(){
        return this.gamesRepository.find()
    }
}
