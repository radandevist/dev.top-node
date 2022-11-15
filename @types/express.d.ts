import { Role } from "../src/config/roles";

export {};

declare module "express" {
  export interface Request {
    userPayload?: {
      id?: string;
      role?: Role;
    };
  }
}
