import { faker } from '@faker-js/faker';
import { Post, User } from '../types/models';

const USERS: User[] = [];

const POSTS: Post[] = [];

export function createRandomUser(): User {
  return {
    username: faker.internet.userName().toLowerCase(),
    avatar: faker.image.avatar(),
    name: faker.name.firstName(),
    surname: faker.name.firstName(),
  };
}

export function createRandomPost(
  author: User,
  likes: User[] = [],
  withImage = false
): Post {
  return {
    id: faker.datatype.uuid(),
    message: faker.lorem.sentence(),
    create_at: faker.date.between(
      '2023-01-01T00:00:00.000Z',
      '2023-04-07T00:00:00.000Z'
    ),
    location: `${faker.address.cityName()}, ${faker.address.country()}`,
    image: withImage ? faker.image.image(468, 585, true) : '',
    status: 'published',
    author,
    likes,
  };
}

export function generateUsers(quantity = 10): User[] {
  Array.from({ length: quantity }).forEach(() => {
    USERS.push(createRandomUser());
  });

  return USERS;
}

export function generatePosts(users: User[], quantity = 10): Post[] {
  Array.from({ length: quantity }).forEach(() => {
    const randomAuthorIndex = faker.datatype.number({
      min: 0,
      max: users.length - 1,
    });

    const randomLikesCount = faker.datatype.number({
      min: 0,
      max: users.length - 1,
    });

    const author = users[randomAuthorIndex];
    const likes = faker.helpers.arrayElements(users, randomLikesCount);

    POSTS.push(createRandomPost(author, likes, randomAuthorIndex % 2 === 0));
  });

  return POSTS.sort(
    (a, b) =>
      Date.parse(b.create_at as string) - Date.parse(a.create_at as string)
  );
}
