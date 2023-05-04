import { IStepContext } from '@/interface';
import { Action, Ctx, WizardStep, Wizard } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { TelegramKeyboardFactory } from '../telegram-keyboard.factory';

@Wizard('WizardScene')
export class WizardScene {
    constructor(private readonly kbBuilder: TelegramKeyboardFactory) {}
    @WizardStep(1)
    async step1(@Ctx() ctx: IStepContext) {
        await ctx.reply('1', { ...Markup.inlineKeyboard([Markup.button.callback('2', '2')]) });
        ctx.wizard.next();
        return;
    }
    @WizardStep(2)
    @Action('2')
    async step2(@Ctx() ctx: IStepContext) {
        await ctx.answerCbQuery();
        await ctx.editMessageText('2', { ...Markup.inlineKeyboard([Markup.button.callback('3', '3')]) });
        ctx.wizard.next();
        return;
    }
    @WizardStep(3)
    @Action('3')
    async step3(@Ctx() ctx: IStepContext) {
        await ctx.answerCbQuery();
        await ctx.editMessageText('DONE');
        ctx.scene.leave();
        return;
    }
}
