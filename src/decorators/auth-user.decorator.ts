import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export class AuthProfileDto {
  profileId: number;
  accountId: number;
  username: string;
  email: string;
}

export const AuthUser = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});
