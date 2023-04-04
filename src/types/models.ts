export interface User {
  avatar?: string;
  username: string;
  name: string;
  surname: string;
}

export interface Post {
  image?: string;
  message: string;
  likes?: User[];
  author: User;
  create_at: Date;
  location: string;
  status: 'drafted' | 'deleted' | 'published';
}

export interface Feed {
  posts: Post[];
}
