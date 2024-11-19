import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.strategy';
import { AuthService } from './auth.service';

@Module({
imports: [
PassportModule.register({ defaultStrategy: 'jwt' }),
JwtModule.register({
  secret: 'toy',
  signOptions: { expiresIn: '60s' }
})

],
providers: [AuthService,JwtStrategy],
exports: [AuthService,JwtModule, PassportModule]

})

export class AuthModule {}