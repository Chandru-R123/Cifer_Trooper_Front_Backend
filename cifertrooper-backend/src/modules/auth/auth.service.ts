import { AuthRepository } from './auth.repository';
import { signToken } from '../../utils/jwt';
import { AppError } from '../../middleware/errorHandler';

export const AuthService = {
  async register(name: string, email: string, password: string) {
    const existing = await AuthRepository.findByEmail(email);
    if (existing) throw new AppError('Email already registered', 409);
    const user = await AuthRepository.create({ name, email, password });
    const token = signToken({ userId: String(user._id), role: user.role });
    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  },

  async login(email: string, password: string) {
    const user = await AuthRepository.findByEmail(email);
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid credentials', 401);
    }
    if (!user.isActive) throw new AppError('Account disabled', 403);
    const token = signToken({ userId: String(user._id), role: user.role });
    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  },

  async getProfile(userId: string) {
    const user = await AuthRepository.findById(userId);
    if (!user) throw new AppError('User not found', 404);
    return user;
  },

  async updateProfile(userId: string, data: { name?: string; email?: string }) {
    const user = await AuthRepository.updateById(userId, data);
    if (!user) throw new AppError('User not found', 404);
    return user;
  },
};
