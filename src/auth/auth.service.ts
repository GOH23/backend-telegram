import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInDto } from './dto/login-in.dto';
import { parse, User, validate } from '@telegram-apps/init-data-node';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {User as DB_user} from 'src/user/entities/user.entity'
@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) { }
    async loginIn({ initData }: LoginInDto) {
        try {
            validate(initData, process.env.BOT_TOKEN, { expiresIn: 23000 })
            const parsedData = parse(initData)

            return {
                user: await this.userService.add_profile(parsedData.user),
                token: await this.jwtService.signAsync({ userId: parsedData.user.id },{
                    secret: process.env.BOT_TOKEN
                })
            }
        } catch (er) {
            console.log(er)
            throw new UnauthorizedException();
        }
    }

}
