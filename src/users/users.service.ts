import { Body, Delete, Injectable, NotFoundException, Param, Patch } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  usersService: unknown;
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
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return user;
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
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    return {
      message: 'Usuário deletado com sucesso',
    };
  }
  
  
}
