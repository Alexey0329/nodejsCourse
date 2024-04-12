import { getUsersList } from "../repository/user.repository";

export const getUserById = (userId: string) => {
  const users = getUsersList();
  return users.find(user => user.id === userId) || null;
}
