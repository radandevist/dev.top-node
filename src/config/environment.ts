export enum Environment {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  TEST = "test",
}

const NODE_ENV = process.env.NODE_ENV as Environment;

const environments = Object.values(Environment);

export const environment: Environment = environments.includes(NODE_ENV) ? NODE_ENV : Environment.DEVELOPMENT;

export const isProd = environment === Environment.PRODUCTION;
