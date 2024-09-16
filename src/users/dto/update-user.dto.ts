import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'O nome do usuário', required: false })
  nome?: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'O email do usuário', required: false })
  email?: string;
}
