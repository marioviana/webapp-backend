import { Schema, model } from 'mongoose';

export interface Case {
  _id: string;
  caseId: string;
  doctorId: string;
  label: string;
  time: Date;
  duration: number;
}

const schema = new Schema<Case>({
  caseId: { type: String, required: true },
  doctorId: { type: String, required: true },
  label: { type: String, required: true },
  time: { type: Date, required: true },
  duration: { type: Number, required: true },
});

export const saveCase = async (caseRecord: Case) => {
  const CaseModel = await getModel();
  return CaseModel.create(caseRecord);
};

export const getCaseIds = async () => {
  const CaseModel = await getModel();
  return CaseModel.find({}, 'caseId');
};

const getModel = () => model<Case>('Case', schema);
