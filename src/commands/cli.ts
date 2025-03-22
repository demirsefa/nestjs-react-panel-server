import { CommandFactory } from 'nest-commander';
import { CommandsModule } from './commands.module';

async function bootstrap(): Promise<void> {
  await CommandFactory.run(CommandsModule, { logger: ['warn', 'error'] });
}

bootstrap();
