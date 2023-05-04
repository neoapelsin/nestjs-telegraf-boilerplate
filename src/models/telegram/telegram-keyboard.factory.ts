import { Injectable } from '@nestjs/common';
import { Markup } from 'telegraf';
import { Markup as MarkupType } from 'telegraf/typings/markup';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { LocalePhrase, IContext } from '@/interface/index';

@Injectable()
export class TelegramKeyboardFactory {
    public getStart(ctx: IContext) {
        return Markup.keyboard([
            [ctx.i18n.t(LocalePhrase.button_scene), ctx.i18n.t(LocalePhrase.button_wizard_scene)],
            [ctx.i18n.t(LocalePhrase.button_profile)],
        ]).resize();
    }

    public exampleScene(ctx: IContext) {
        return Markup.inlineKeyboard([[Markup.button.callback(ctx.i18n.t(LocalePhrase.scene_button), '/button')]]);
    }

    public getPagination<T extends string>(
        name: string,
        current: number,
        maxpage: number,
    ): MarkupType<InlineKeyboardMarkup>;
    public getPagination<T extends string>(
        name: string,
        current: number,
        maxpage: number,
        items: T[],
        actionPrefix: string,
    ): MarkupType<InlineKeyboardMarkup>;
    public getPagination<T extends string>(
        name: string,
        current: number,
        maxpage: number,
        items?: T[],
        actionPrefix?: string,
    ) {
        const buttons1 = [];
        if (items && items.length > 0) {
            for (const item of items) {
                buttons1.push([Markup.button.callback(item, `${actionPrefix}:${item}`)]);
            }
        }

        const buttons2 = [];
        buttons2.push(
            current > 1 ? Markup.button.callback(`«1`, `pager:${name}:1`) : Markup.button.callback(`☺`, 'nope'),
            current > 2
                ? Markup.button.callback(`‹${current - 1}`, `pager:${name}:${current - 1}`)
                : Markup.button.callback(`☺`, 'nope'),
            Markup.button.callback(`-${current}-`, `pager:${name}:${current}`),
            current < maxpage - 1
                ? Markup.button.callback(`${current + 1}›`, `pager:${name}:${current + 1}`)
                : Markup.button.callback(`☺`, 'nope'),
            current < maxpage
                ? Markup.button.callback(`${maxpage}»`, `pager:${name}:${maxpage}`)
                : Markup.button.callback(`☺`, 'nope:The end'),
        );

        return Markup.inlineKeyboard(buttons1.length > 0 ? [...buttons1, buttons2] : [buttons2]);
    }
}
