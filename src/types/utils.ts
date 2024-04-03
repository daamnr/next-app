// utils.ts
import { User } from "./user";

// Define a function to find a user by id
export function findUserById(users: User[], userId: number): User | undefined {
  return users.find(user => user.id === userId);
}
