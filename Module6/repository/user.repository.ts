import User, { UserEntity } from "../model/user.entity";

export const getUsersList = async (): Promise<UserEntity[]> => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Failed to fetch users data.");
  }
}
