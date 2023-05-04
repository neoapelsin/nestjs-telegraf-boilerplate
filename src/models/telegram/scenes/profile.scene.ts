import { IContext, LocalePhrase } from '@/interface';
import { UserService } from '@/models/db/user/user.service';
import { Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { TelegramKeyboardFactory } from '../telegram-keyboard.factory';

@Scene('ProfileScene')
export class ProfileScene {
    constructor(private readonly kbBuilder: TelegramKeyboardFactory, private readonly userService: UserService) {}
    @SceneEnter()
    async onEnter(@Ctx() ctx: IContext) {
        const user = await this.userService.getById(ctx.from.id);
        const msg = ctx.i18n.t(LocalePhrase.page_profile, { id: user.id, username: user.username });
        await ctx.replyWithHTML(msg);
        return;
    }
}
