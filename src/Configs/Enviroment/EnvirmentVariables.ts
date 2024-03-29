export const DATABASE_NAME = process.env.DATABASE_NAME;
export const DATABASE_PORT = +process.env.DATABASE_PORT;
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
export const DATABASE_HOST = process.env.DATABASE_HOST;
export const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
export const PORT = +process.env.PORT;
export const AUTH_TOKEN_SECRET_KEY = process.env.AUTH_TOKEN_SECRET_KEY;
export const AUTH_TOKEN_TIME = process.env.AUTH_TOKEN_TIME;
export const CAR_SITE_FRONTEND_URL = process.env.CAR_SITE_FRONTEND_URL;
export const NODE_ENV = process.env.NODE_ENV;
export const AUTH_API_DOMAIN = process.env.AUTH_API_DOMAIN;
export const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN;
export const RABBITMQ_URL = process.env.RABBITMQ_URL;
export const KUBERENETES_AUTH = process.env.KUBERENETES_AUTH === 'true' ? true : false 