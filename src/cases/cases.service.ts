import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Case from '../../models/case';
import { UsersService } from '../users/users.service';

@Injectable()
export class CasesService {
  constructor(private usersService: UsersService) {}

  async getCases(): Promise<any> {
    try {
      const filenames = fs.readdirSync(
        path.join(__dirname, '../../../assets/cases/'),
      );
      if (!filenames) return null;
      const cases = filenames.map((filename: string) => {
        return {
          id: path.parse(filename).name,
          content: fs.readFileSync(
            path.join(__dirname, `../../../assets/cases/${filename}`),
            'utf-8',
          ),
        };
      });
      const savedCases = await Case.getCaseIds();
      // Return only if the cases weren't recorded by the doctor
      return cases.filter(
        (c: any) => !savedCases.some((sc) => sc && sc.caseId === c.id),
      );
    } catch (error) {
      console.log('Some error ocurred while reading files', error);
      return null;
    }
  }

  async saveRecord(username, caseRecord): Promise<any> {
    const user = await this.usersService.findOne(username);
    const caseRecordCompleted = {
      ...caseRecord,
      doctorId: user._id,
    };
    return Case.saveCase(caseRecordCompleted);
  }
}
