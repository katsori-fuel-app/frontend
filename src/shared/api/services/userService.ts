import { instance } from "..";
import { User } from "../types";

export const userService = {
  getAllUser: () => instance.get<User[]>("users"),
};
