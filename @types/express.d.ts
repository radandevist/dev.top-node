// import { Role } from "../src/config/roles";
import { User } from "../src/res/users/users.entity";

declare module "express" {
  export interface Request {
    // userPayload?: {
    //   id?: string;
    //   role?: Role;
    // };
    user?: User;
  }
}
