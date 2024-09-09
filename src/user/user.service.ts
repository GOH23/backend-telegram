import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles, User  } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {User as TGuser} from '@telegram-apps/init-data-node'
@Injectable()
export class UserService {
  constructor (@InjectRepository(User) private readonly userRepository : Repository<User>){
    
  }
  async add_profile({id,allowsWriteToPm,firstName,
    languageCode,
    username}: TGuser){
    return await this.userRepository.exists({where: {userId: id}}) ? this.userRepository.findOne({where: {userId: id}}) : this.userRepository.save({
      userId: id,
      firstName: firstName,
      languageCode: languageCode,
      username: username,
      allowsWriteToPm: allowsWriteToPm
    });
  }
  async rolesHas(userId: number,role: Roles[]) {
    var user = await this.userRepository.findOneBy({userId: userId})
    return role.includes(user.roles) 
  }
}
