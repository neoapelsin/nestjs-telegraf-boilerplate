import { createHash } from 'crypto';

export const md5 = (str: string) => createHash('md5').update(str).digest('hex');

export * from './filter/telegraf-exception.filter';

export * from './guard/telegram-admin.guard';

export * from './utils/other.util';
