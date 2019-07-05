import { Model } from 'mongoose';
import { Injectable, Inject, UseGuards } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
var hash = require('hash.js');

@Injectable()
@UseGuards(AuthGuard())
export class UserService{
    
    constructor(@Inject('USER_MODEL') private readonly userModel: Model<User>){}

    generateBearerToken(loginname: string, pw: string): string | Promise<string> {
        throw new Error("Method not implemented.");
    }

    async create(createUserDto: CreateUserDto): Promise<User>{
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async update(updateUserDto: UpdateUserDto): Promise<User>{
        const updateUser = new this.userModel(updateUserDto);
        return await this.userModel.updateOne({loginname: updateUser.loginname}, this.getUpdateQueryFromUserModel(updateUser));
    }

    async delete(deleteUserDto: DeleteUserDto): Promise<User>{
        const deleteUser = new this.userModel(deleteUserDto);
        return await this.userModel.deleteAll({loginname:deleteUser.loginname}).exec();
    }

    async findUserByLoginname(loginname: string): Promise<User> {
        return await this.userModel.findOne({loginname: loginname}).exec();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    getUpdateQueryFromUserModel(userModel: Model<User>): Object {
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