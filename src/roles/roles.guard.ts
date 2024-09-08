import { BadRequestException, CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UseRoles } from './roles.decorator';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,@Inject(UserService) private userService: UserService) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get(UseRoles, context.getHandler());
    const req = context.switchToHttp().getRequest();
    try{
      
    } catch{
      
    }
    if(!await this.userService.rolesHas(req.user,roles)) throw new BadRequestException()
    return true;
  }
}
