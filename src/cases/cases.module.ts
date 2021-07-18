import { Module } from '@nestjs/common';
import { CasesService } from './cases.service';
import { CasesController } from './cases.controller';

@Module({
  providers: [CasesService],
  exports: [CasesService],
  controllers: [CasesController],
})
export class CasesModule {}
