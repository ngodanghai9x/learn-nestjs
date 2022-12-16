import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ERole, ROLES_KEY } from '../constants/role';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<ERole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredRoles', requiredRoles);
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    console.log('req roles', req.roles);
    return requiredRoles.some((role) => (req?.roles || [ERole.Admin + 1]).includes(role));
  }
}