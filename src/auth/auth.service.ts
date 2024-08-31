import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginInDto } from './dto/login-in.dto';
import { parse, User, validate } from '@telegram-apps/init-data-node';

@Injectable()
export class AuthService {
    async loginIn({initData}: LoginInDto){

        try{
            validate(initData,process.env.BOT_TOKEN)
            const parsedData= parse(initData)
            return {
                user: parsedData.user as User,
                token: "secret-token"
            }
        }catch {
            throw new UnauthorizedException();
        }
    }
}
