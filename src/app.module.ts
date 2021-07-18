import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CasesController } from './cases/cases.controller';
import { CasesService } from './cases/cases.service';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [AppController, CasesController],
  providers: [AppService, CasesService],
})
export class AppModule {}
