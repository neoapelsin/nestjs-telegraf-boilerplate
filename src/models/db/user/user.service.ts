import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SetUserInput } from '@/interface/db';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

    async getById(id: string | number) {
        return await this.userRepository.findOne({ where: { id: `${id}` } });
    }

    async set(setUserInput: SetUserInput) {
        return await this.userRepository.save(setUserInput);
    }

    async getAll() {
        return await this.userRepository.find();
    }

    async getAdmins() {
        return await this.userRepository.find({ where: { isAdmin: true } });
    }

    async checkAdmin(id: string | number) {
        const check = await this.userRepository.findOne({ where: { id: `${id}`, isAdmin: true } });
        return check ? true : false;
    }
}
