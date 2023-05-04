import { LocalePhrase } from '@/interface/index';
import { Hears } from 'nestjs-telegraf';
import { checkLocaleCondition } from '../utils/i18n.util';

export const TgHearsLocale = (phrases: LocalePhrase | LocalePhrase[]) => {
    const _phrases = Array.isArray(phrases) ? phrases : [phrases];
    return Hears(checkLocaleCondition(_phrases));
};
