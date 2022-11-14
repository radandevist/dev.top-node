import { dataSource } from "../../infra/dataSource";

import { User } from "./users.entity";

export const usersRepository = dataSource.getRepository(User);
