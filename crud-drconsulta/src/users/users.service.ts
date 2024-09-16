import { Body, Delete, Get, HttpException, Injectable, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  usersService: any;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(
    createUserDto: CreateUserDto
  ) {
    return this.userRepository.save(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }
  
  // metodo padrao de busca
  findOne(id: number) {
    return this.userRepository.findOneBy({ id: id });
  }  

  // ex. metodo async para tratamento de erro e melhor fluxo de processamento
  async findOneAsync(id: number): Promise<User> {
    const userData =
      await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException(
        'User Not Found',
        404,
      );
    }
    return userData;
  }

  @Patch(':id')
  async update(
    @Param('id') 
    id: number, 

    @Body() 
    updateUserDto: UpdateUserDto
  ) {
    const existingUser = await this.findOneAsync(id);
    const userData = this.userRepository.merge(
      existingUser,
      updateUserDto,
    );
    return this.userRepository.save(
      userData,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.userRepository.remove(await this.findOneAsync(id));
  }
  
}
