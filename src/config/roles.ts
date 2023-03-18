import { Role } from "@prisma/client";

import { objectFlip } from "../utils/objectUtils";

export const roles = Object.values(Role);

const rolesByPrecedence: Record<number, Role> = {
  0: Role.ADMIN,
  1: Role.AUTHOR,
  2: Role.AUTHENTICATED,
};
export const rolesPrecedences = objectFlip(rolesByPrecedence) as Record<Role, `${number}`>;
