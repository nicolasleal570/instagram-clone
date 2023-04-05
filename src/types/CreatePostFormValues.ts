import { Post } from './models';

export type CreatePostFormValues = Pick<
  Post,
  'message' | 'image' | 'location' | 'status'
>;
