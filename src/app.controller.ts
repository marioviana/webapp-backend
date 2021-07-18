import {
  Controller,
  Body,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const { email, name } = await this.usersService.findOne(req.user.username);
    return { name, email };
  }

  @Get('conditions')
  @UseGuards(JwtAuthGuard)
  async getConditions(): Promise<any> {
    return new Promise((resolve) => {
      const conditions = [];
      fs.createReadStream(
        path.join(__dirname, '../../assets/conditions/', 'conditions.csv'),
      )
        .pipe(
          csv.parse({
            headers: ['ICD_10', 'ICD_10_Description'],
            delimiter: '\t',
            discardUnmappedColumns: true,
          }),
        )
        .on('error', (error) => console.error(error))
        .on('data', (row) => {
          conditions.push(row);
        })
        .on('end', () => resolve(conditions));
    });
  }
}
