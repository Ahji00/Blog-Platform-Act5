import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'Unique username chosen by the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'User email address (must be valid)' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password must be at least 6 characters long', minLength: 6 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com', description: 'Registered email of the user' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123', description: 'The password corresponding to the given email' })
  @IsNotEmpty()
  password: string;
}
