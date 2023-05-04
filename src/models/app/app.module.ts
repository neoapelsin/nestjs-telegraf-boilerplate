import { Module, Global } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../db/user/user.entity';
import { SessionEntity } from '../db/session/session.entity';
import * as Env from '@/environment';
import { DBModule } from '../db/db.module';

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: Env.POSTGRES_HOST,
            port: Env.POSTGRES_PORT,
            username: Env.POSTGRES_USER,
            password: Env.POSTGRES_PASSWORD,
            database: Env.POSTGRES_DATABASE,
            synchronize: true,
            logging: false,
            entities: [UserEntity, SessionEntity],
            migrations: [],
            subscribers: [],
        }),
        TypeOrmModule.forFeature([UserEntity, SessionEntity]),
        TelegramModule.register(),
        DBModule,
    ],
})
export class AppModule {}
