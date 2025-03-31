import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admins/admin.module';
import { UserModule } from './modules/users/user.module';
import { ThreadModule } from './modules/threads/thread.module';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { AssetsModule } from './modules/assets/assets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    AdminModule,
    UserModule,
    ThreadModule,
    AssetsModule,
  ],
  providers: [],
})
export class AppModule {}
