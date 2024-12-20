import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService){}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const req = context.switchToHttp().getRequest()
    try{
      const data = await this.jwtService.verifyAsync(this.extractTokenFromHeader(req),{
        secret: process.env.JWT_SECRET,
        maxAge: "1h"
      })
      req['user'] = data.userId
      req['queryId'] = data.queryId
    }
    catch (e){
      console.log(e)
      throw new UnauthorizedException()
    }
    return true;
  }
  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' || 'Api' ? token : undefined;
  }
}
