import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { UserDocument } from '@src/database/schemas/user.schema';
import { UserService } from '@src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  	constructor(
		private readonly reflector: Reflector,
		private readonly userService: UserService
	) {}

  	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();
		const userDoc = await this.userService.findUserById(user.id);
		return user && this.hasRole(roles, userDoc);
	}

	private hasRole(roles: string[], user: UserDocument): boolean {
		return roles.indexOf(user.role) > -1;
	}
}
