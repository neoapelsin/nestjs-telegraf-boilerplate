import { IContext, LocalePhrase } from '@/interface';
import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { TelegramKeyboardFactory } from '../telegram-keyboard.factory';

@Scene('ExampleScene')
export class ExampleScene {
    constructor(private readonly kbBuilder: TelegramKeyboardFactory) {}
    @SceneEnter()
    async onEnter(@Ctx() ctx: IContext) {
        const msg = ctx.i18n.t(LocalePhrase.page_scene);
        const kb = this.kbBuilder.exampleScene(ctx);
        await ctx.replyWithHTML(msg, kb);
        return;
    }

    @Action('/button')
    async onButton(@Ctx() ctx: IContext) {
        await ctx.answerCbQuery(ctx.i18n.t(LocalePhrase.scene_click), { show_alert: true });
        return;
    }
}
