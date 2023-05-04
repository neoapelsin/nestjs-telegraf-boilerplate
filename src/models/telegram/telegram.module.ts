import { MainMiddleware } from '@/models/telegram/middlewares/session.middleware';
import { Module, Global } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.update';
import { i18n } from './utils/i18n.util';
import { TelegramService } from './telegram.service';
import * as Env from '@/environment';
import { TelegramKeyboardFactory } from './telegram-keyboard.factory';
import { ExampleScene } from './scenes/example.scene';
import { ProfileScene } from './scenes/profile.scene';
import { WizardScene } from './scenes/wizard.scene';

@Global()
@Module({})
export class TelegramModule {
    static register() {
        return {
            module: TelegramModule,
            imports: [
                TelegrafModule.forRootAsync({
                    inject: [MainMiddleware],
                    useFactory: (session: MainMiddleware) => {
                        console.log();
                        return {
                            token: Env.TELEGRAM_API,
                            middlewares: [session.middleware(), i18n],
                        };
                    },
                }),
            ],
            providers: [
                TelegramUpdate,
                MainMiddleware,
                TelegramService,
                TelegramKeyboardFactory,
                ExampleScene,
                ProfileScene,
                WizardScene,
            ],
            exports: [
                TelegramUpdate,
                MainMiddleware,
                TelegramService,
                TelegramKeyboardFactory,
                ExampleScene,
                ProfileScene,
                WizardScene,
            ],
        };
    }
}
