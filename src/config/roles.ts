import { objectFlip } from "../utils/objectUtils";

export enum Role {
  SIMPLE_USER = "simple-user",
  MODERATOR = "moderator",
  ADMIN = "admin"
}

export const roles = Object.values(Role);

const rolesByPrecedence: Record<number, Role> = {
  0: Role.ADMIN,
  1: Role.MODERATOR,
  2: Role.SIMPLE_USER,
};
export const rolesPrecedences = objectFlip(rolesByPrecedence) as Record<Role, `${number}`>;
