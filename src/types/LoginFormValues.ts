import { User } from './models';

export type LoginFormValues = Pick<User, 'username'>;
