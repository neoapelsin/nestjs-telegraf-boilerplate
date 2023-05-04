import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SessionEntity } from './session.entity';

@Injectable()
export class SessionService {
    constructor(@InjectRepository(SessionEntity) private readonly sessionRepository: Repository<SessionEntity>) {}

    async get(id: string) {
        return await this.sessionRepository.findOne({ where: { id: id } });
    }

    async set(id: string, state: object): Promise<void> {
        await this.sessionRepository.save({ id, state, updated_at: new Date() });
    }

    async delete(id: string): Promise<void> {
        await this.sessionRepository.delete({ id: id });
    }
}
