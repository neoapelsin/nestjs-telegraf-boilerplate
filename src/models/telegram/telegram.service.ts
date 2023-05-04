import { Injectable, Logger, OnModuleInit, OnApplicationShutdown } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { IContext } from '@/interface/index';
import { UserService } from '../db/user/user.service';

@Injectable()
export class TelegramService implements OnModuleInit, OnApplicationShutdown {
    private readonly logger = new Logger(TelegramService.name);

    constructor(@InjectBot() public readonly bot: Telegraf, private readonly userService: UserService) {}

    async onModuleInit() {
        await this.notifyAdmin('🚀 Bot is running');
    }

    async onApplicationShutdown(signal: string) {
        await this.shutdown(signal);
    }

    public async shutdown(signal: string) {
        await this.notifyAdmin(`⚠️ Bot shutdown [${signal}]`);
    }

    public async sendMessage(chatId: number | string, text: string, extra: ExtraReplyMessage = {}) {
        try {
            return await this.bot.telegram.sendMessage(chatId, text, {
                parse_mode: 'HTML',
                ...extra,
            });
        } catch (err) {
            this.logger.error(err);
        }
    }

    public async notifyAdmin(message: string, extra: ExtraReplyMessage = {}) {
        const admins = await this.userService.getAdmins();
        for (const admin of admins) {
            await this.sendMessage(admin.id, message, {
                disable_notification: true,
                ...extra,
            });
        }
    }
}
