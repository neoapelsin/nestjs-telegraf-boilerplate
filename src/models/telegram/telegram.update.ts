import { UserService } from '@/models/db/user/user.service';
import { Start, Update, Ctx } from 'nestjs-telegraf';
import { TelegrafExceptionFilter } from '@/common';
import { UseFilters } from '@nestjs/common';
import { IContext, LocalePhrase } from '@/interface';
import { TelegramKeyboardFactory } from './telegram-keyboard.factory';
import { TgHearsLocale } from './decorators/tg-hears-locale.decorator';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class TelegramUpdate {
    constructor(
        private readonly keyboardbBuilder: TelegramKeyboardFactory,
        private readonly userService: UserService,
    ) {}
    @Start()
    async onStart(@Ctx() ctx: IContext) {
        const msg = ctx.i18n.t(LocalePhrase.page_start);
        const kb = this.keyboardbBuilder.getStart(ctx);
        await ctx.replyWithHTML(msg, kb);
        return;
    }
    @TgHearsLocale(LocalePhrase.button_scene)
    async exampleScene(@Ctx() ctx: IContext) {
        await ctx.scene.enter('ExampleScene');
        return;
    }

    @TgHearsLocale(LocalePhrase.button_wizard_scene)
    async profileScene(@Ctx() ctx: IContext) {
        await ctx.scene.enter('WizardScene');
        return;
    }
}
