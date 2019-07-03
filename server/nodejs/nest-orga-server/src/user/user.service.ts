import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
var hash = require('hash.js');

@Injectable()
export class UserService{
    
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>){}

    async create(createUserDto: CreateUserDto): Promise<User>{
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto): Promise<User>{
        const updateUser = new this.userModel(updateUserDto);
        return await this.userModel.updateOne({loginname: updateUser.loginname}, this.getQueryFromUserModel(updateUser));
    }

    async delete(deleteUserDto: DeleteUserDto): Promise<User>{
        const deleteUser = new this.userModel(deleteUserDto);
        return await this.userModel.deleteAll({loginname:deleteUser.loginname}).exec();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    getQueryFromUserModel(userModel: Model<User>): Object {
        let query = {};
        if(userModel.dispname !== undefined && userModel.dispname !== null){
            query["dispname"] = userModel.dispname;
        }
        if(userModel.pw !== undefined && userModel.pw !== null){
            query["pw"] = hash.sha256().update(userModel.pw).digest('hex');
        }
        return query;
    }
}