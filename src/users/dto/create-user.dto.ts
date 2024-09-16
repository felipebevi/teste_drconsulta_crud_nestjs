import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'O nome do usuário' })
  nome: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'O email do usuário' })
  email: string;
}
