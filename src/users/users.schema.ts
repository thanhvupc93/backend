import { EntitySchema } from 'typeorm';
import { User } from './users.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    fullName: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
});
