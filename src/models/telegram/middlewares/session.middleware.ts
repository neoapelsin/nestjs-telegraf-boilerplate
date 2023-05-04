import { Inject, Injectable } from '@nestjs/common';
import { MiddlewareObj } from 'telegraf/typings/middleware';
import { Context } from 'telegraf';
import { SessionService } from '@/models/db/session/sessions.service';

interface Options {
    property: string;
    getSessionID(ctx);
    store: object;
}

@Injectable()
export class MainMiddleware implements MiddlewareObj<Context> {
    private options: Options;
    constructor(@Inject(SessionService) private readonly sessionService: SessionService) {
        this.options = Object.assign(
            {
                property: 'session',
                getSessionID: (ctx: Context) => ctx.from && ctx.chat && `${ctx.from.id}:${ctx.chat.id}`,
                store: {},
            },
            this.options,
        );
    }

    async getSession(id) {
        const session = await this.sessionService.get(id);

        const { state = {} } = session || {};

        return {
            ...state,
        };
    }

    clearSession(id) {
        return this.sessionService.delete(id);
    }

    async saveSession(id, state) {
        if (!state || Object.keys(state).length === 0) {
            return this.clearSession(id);
        }

        await await this.sessionService.set(id, state);
    }

    public middleware() {
        return async (ctx: Context, next: (...args: any[]) => Promise<any>) => {
            const id = this.options.getSessionID(ctx);
            if (!id) {
                return next();
            }

            let session = await this.getSession(id);

            Object.defineProperty(ctx, this.options.property, {
                get: function () {
                    return session;
                },
                set: function (newValue) {
                    session = Object.assign({}, newValue);
                },
            });

            return next().then(() => this.saveSession(id, session));
        };
    }
}
