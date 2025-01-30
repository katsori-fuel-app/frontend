import { instance } from "..";
import { User } from "../types";

export const userService = {
  getAllUser: () => instance.get<UserDto[]>("users"),

  createUser: (user: UserDto) => instance.post<UserDto[]>("users", user),
};
