import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { TelegramError } from 'telegraf';
import { LocalePhrase, IContext } from '../../interface/index';

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(TelegrafExceptionFilter.name);

    async catch(exception: Error, host: ArgumentsHost): Promise<void> {
        const telegrafHost = TelegrafArgumentsHost.create(host);
        const ctx = telegrafHost.getContext<IContext>();
        const content = exception.message;

        if (exception.message !== LocalePhrase.common_noAccess) {
            this.logger.error(`OnUpdateType(${ctx?.updateType}): ${exception?.message || exception}`, exception.stack);
        }

        if (!(exception instanceof Error) || !ctx) {
            return;
        }

        if (exception instanceof TelegramError) {
            if (
                exception.description.includes('bot was blocked by the user') ||
                exception.description.includes('user is deactivated') ||
                exception.description.includes('chat not found')
            ) {
                try {
                    ctx.session.isBlockedBot = true;
                } catch (err) {
                    console.error(err);
                }
                return;
            }
        }

        try {
            if (ctx.callbackQuery) {
                ctx.answerCbQuery(content);
            } else {
                ctx.replyWithHTML(content);
            }
        } catch {
            /* empty */
        }
    }
}
