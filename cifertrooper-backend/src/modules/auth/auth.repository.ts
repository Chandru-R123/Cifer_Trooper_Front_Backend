import { User, IUser } from './auth.model';

export const AuthRepository = {
  findByEmail: (email: string) => User.findOne({ email }).select('+password'),
  findById: (id: string) => User.findById(id),
  create: (data: Partial<IUser>) => User.create(data),
  updateById: (id: string, data: Partial<IUser>) =>
    User.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
};
