import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as db from './db';
import * as User from '../models/user';

const { PORT } = process.env;

async function bootstrap() {
  await db.connect();
  await User.createMockData();
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
