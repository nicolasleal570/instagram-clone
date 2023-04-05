export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS';

export interface UserErrors {
  [key: string]: (value?: string) => string;
}

export const userErrors: UserErrors = {
  [USER_NOT_FOUND]: () => 'Este usuario no existe',
  [USER_ALREADY_EXISTS]: (username = '') =>
    `El nombre de usuario "${username}" ya existe`,
};

export function isUserError(error: unknown) {
  return (
    error instanceof Error && Object.keys(userErrors).includes(error.message)
  );
}
