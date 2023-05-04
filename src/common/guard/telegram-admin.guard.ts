import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { LocalePhrase, IContext } from '../../interface/index';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';
import { UserService } from '@/models/db/user/user.service';

@Injectable()
export class TelegramAdminGuard implements CanActivate {
    constructor(@Inject(UserService) private readonly userService: UserService) {}

    async canActivate(context: ExecutionContext) {
        const eCtx = TelegrafExecutionContext.create(context);
        const ctx = eCtx.getContext<IContext>();
        const check = await this.userService.checkAdmin(ctx.from.id);
        if (!check) {
            throw new TelegrafException(ctx.i18n.t(LocalePhrase.common_noAccess));
        }

        return true;
    }
}
