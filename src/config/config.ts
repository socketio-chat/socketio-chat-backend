import 'dotenv/config';
import { AppConfig } from './types';

const env = process.env as Record<string, string>;

export const config: AppConfig = {
  port: Number(env.PORT),
};
