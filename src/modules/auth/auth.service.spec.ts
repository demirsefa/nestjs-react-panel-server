import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { AdminEntity } from '../admins/entities/admin.entity';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const findOne = jest.fn();

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(AdminEntity), useValue: { findOne } },
        { provide: JwtService, useValue: { sign: () => 'token' } },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('rejects a wrong password with 401', async () => {
    findOne.mockResolvedValue({
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('right-password', 4),
    });

    const login = service.login({ username: 'admin', password: 'wrong' });

    await expect(login).rejects.toThrow(UnauthorizedException);
    await expect(login).rejects.toMatchObject({ status: 401 });
  });
});
