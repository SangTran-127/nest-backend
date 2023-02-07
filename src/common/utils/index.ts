import { User } from '../schemas/user.schema';

export function hidePassword(user: User) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...restProperty } = user;
  return restProperty;
}
