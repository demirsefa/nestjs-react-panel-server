import { NestFactory } from '@nestjs/core';
import { CommandsModule } from './commands.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(CommandsModule);
  await app.close();
}
bootstrap(); 