import { SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles as RefRoles } from 'src/user/entities/user.entity';

export const UseRoles = Reflector.createDecorator<RefRoles[]>();
