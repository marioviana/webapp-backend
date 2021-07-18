import { Schema, model } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
}

const schema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const createMockData = async () => {
  const UserModel = await getModel();
  const email = 'mariovianaferreira@gmail.com';
  const user = await UserModel.findOne({
    email,
  });
  if (!user) {
    const hash = await bcrypt.hash('teste', 10);
    return UserModel.create({
      name: 'Mário',
      email,
      password: hash,
    });
  }
};

export const getUserByEmail = async (email: string) => {
  const UserModel = await getModel();
  return UserModel.findOne({
    email,
  }).lean();
};

const getModel = () => model<User>('User', schema);
