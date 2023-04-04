import { User } from './models';

export type RegisterFormValues = Pick<
  User,
  'name' | 'surname' | 'username' | 'avatar'
>;
