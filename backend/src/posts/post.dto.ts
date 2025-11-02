import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: 'My first blog post' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is the content of the post.' })
  @IsString()
  content: string;
}

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @ApiProperty({ example: 'Updated title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'Updated content', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
