import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './modules/admins/admin.module';
import { UserModule } from './modules/users/user.module';
import { ThreadModule } from './modules/threads/thread.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    AdminModule,
    UserModule,
    ThreadModule,
  ],
  providers: [],
})
export class AppModule {}
