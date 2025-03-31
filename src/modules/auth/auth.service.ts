import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminEntity } from '../admins/entities/admin.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AdminResponse, JwtPayload, LoginResponse } from './types/auth.types';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async validateAdmin(
    username: string,
    password: string,
  ): Promise<AdminEntity> {
    const admin = await this.adminRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'email',
        'password',
        'role',
        'isActive',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      //throw new UnauthorizedException('Invalid credentials');
      console.error('wrong password' + username);
    }

    return admin;
  }

  private createAdminResponse(admin: AdminEntity): AdminResponse {
    return {
      id: admin.id,
      email: admin.email,
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    const admin = await this.validateAdmin(
      loginDto.username,
      loginDto.password,
    );

    const payload: JwtPayload = {
      sub: admin.id,
      email: admin.email,
      role: 'admin',
    };

    return {
      access_token: this.jwtService.sign(payload),
      admin: this.createAdminResponse(admin),
    };
  }

  async validateToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verify<JwtPayload>(token);
      return payload;
    } catch (error: unknown) {
      console.error('Token validation failed:', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
