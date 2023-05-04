import { NestFactory } from '@nestjs/core';
import { AppModule } from './models/app/app.module';
import * as Env from '@/environment';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.enableShutdownHooks();

    await app.listen(Env.SERVER_PORT);

    if (Env.NODE_ENV !== Env.EnvType.PROD) {
        console.log(`🤬 Develop: ${await app.getUrl()}`, 'Bootstrap');
    } else {
        console.log(`🚀 Prod ${Env.SERVER_PORT}`, 'Bootstrap');
    }
}
bootstrap().catch((e) => {
    console.warn(`❌  Error starting server, ${e}`, 'Bootstrap');
    throw e;
});
