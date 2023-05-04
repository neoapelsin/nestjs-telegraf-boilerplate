import { resolve } from 'path';
import { config } from 'dotenv';

const repoBranch = '';

config({
    path: resolve(process.cwd(), `.env${repoBranch ? `.${repoBranch}` : ''}`),
});

export enum EnvType {
    DEV = 'development',
    PROD = 'production',
    TEST = 'testing',
}

// environment
export const NODE_ENV: EnvType = (process.env.NODE_ENV as EnvType) || EnvType.DEV;

export const SERVER_PORT: number = +process.env.SERVER_PORT || 8080;

// TELEGRAM
export const TELEGRAM_API: string = process.env.TELEGRAM_API;

// POSTGRES
export const POSTGRES_HOST: string = process.env.POSTGRES_HOST || 'localhost';
export const POSTGRES_PORT: number = +process.env.POSTGRES_PORT || 5432;
export const POSTGRES_USER: string = process.env.POSTGRES_USER;
export const POSTGRES_PASSWORD: string = process.env.POSTGRES_PASSWORD;
export const POSTGRES_DATABASE: string = process.env.POSTGRES_DATABASE;
