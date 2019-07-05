import { Controller, Get, Post, Body, Delete, Put, UseGuards} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { User } from './interfaces/user.interface';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post()
  async update(@Body() updateUserDto: UpdateUserDto){
    return this.userService.update(updateUserDto);
  }

  @Delete()
  async delete(@Body() deleteUserDto: DeleteUserDto){
    return this.userService.delete(deleteUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}