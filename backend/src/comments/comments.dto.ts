import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: 'This is a comment' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 1, description: 'ID of the post to comment on' })
  @IsInt()
  postId: number;
}

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty({ example: 'Updated comment', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}
