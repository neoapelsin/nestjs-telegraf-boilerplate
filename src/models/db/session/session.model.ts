import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionService } from './sessions.service';
import { SessionEntity } from './session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([SessionEntity])],
    providers: [SessionService],
    exports: [TypeOrmModule, SessionService],
})
export class SessionModule {}
