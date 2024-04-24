import { getUsersList } from "../repository/user.repository";

export const getUserById = async (userId: string) => {
  const users = getUsersList();
  return (await users).find(user => user.id === userId) || null;
}
