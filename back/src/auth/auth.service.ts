import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private jwtOptions: { secret: string; verify: { algorithms: string[] } };

  constructor(private readonly jwtService: JwtService) {
    this.jwtOptions = {
      secret: 'toy',
      verify: { algorithms: ['HS256'] },
    };
  }

  login(user: { username: string; userId: number }) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, this.jwtOptions),
    };
  }

  validate(payload: { sub: number; username: string }) {
    return { userId: payload.sub, username: payload.username };
  }
}
