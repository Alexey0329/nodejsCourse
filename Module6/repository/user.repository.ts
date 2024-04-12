import { UserEntity } from "../model/user.entity";
import { usersList } from "../test-data";

export const getUsersList = (): UserEntity[] => {
  return usersList;
}

