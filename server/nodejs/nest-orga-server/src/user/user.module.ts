import { Module } from '@nestjs/common';
import { UserController} from './user.controller';
import { UserService} from './user.service';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from './user.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [UserService, ...userProviders],
    exports: [UserService]
})
export class UserModule{}