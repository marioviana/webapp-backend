import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CasesService } from './cases.service';

@Controller('cases')
export class CasesController {
  constructor(private casesService: CasesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getCases(): Promise<any> {
    return this.casesService.getCases();
  }

  @Post('record')
  @UseGuards(JwtAuthGuard)
  async saveRecord(@Request() req, @Body() caseRecord: any): Promise<any> {
    return this.casesService.saveRecord(req.user.username, caseRecord);
  }
}
