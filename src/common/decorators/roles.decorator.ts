import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, ERole } from '../constants/role';

export const HasRoles = (...roles: ERole[]) => SetMetadata(ROLES_KEY, roles);
