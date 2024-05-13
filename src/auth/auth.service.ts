import { Injectable } from '@nestjs/common';
import { UserService } from 'src/app/user/user.service';
import { compareSync } from 'bcryptjs';
import { UserEntity } from 'src/app/user/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    let user: UserEntity;
    try{
      user = await this.userService.findByEmail(email);
    } catch (error) {
      return null;
    }
    const isPasswordValid = await compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
