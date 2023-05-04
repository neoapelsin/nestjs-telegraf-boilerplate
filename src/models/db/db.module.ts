import { Module, Global } from '@nestjs/common';
import { SessionModule } from './session/session.model';
import { UsersModule } from './user/user.model';

@Global()
@Module({
    imports: [UsersModule, SessionModule],
    exports: [UsersModule, SessionModule],
})
export class DBModule {}
