import {
  Controller,
  Post as HttpPost,
  Body,
  Req,
  Get,
  Param,
  Query,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { PostsService } from '../posts/posts.service';
import { CreateCommentDto, UpdateCommentDto } from './comments.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { PaginationDto } from '../common/dto/pagination.dto';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService: PostsService,
  ) {}

  @HttpPost()
  @ApiBody({ type: CreateCommentDto })
  async create(@Body() dto: CreateCommentDto, @Req() req: any) {
    const post = await this.postsService.findOne(dto.postId);
    return this.commentsService.create(dto, req.user, post);
  }

  @Get('post/:postId')
  async findAllByPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Query() pagination: PaginationDto,
  ) {
    const page = pagination.page ? Number(pagination.page) : 1;
    const limit = pagination.limit ? Number(pagination.limit) : 10;
    return this.commentsService.findAllByPost(postId, page, limit);
  }

  @Put(':id')
  @ApiBody({ type: UpdateCommentDto })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCommentDto,
    @Req() req: any,
  ) {
    return this.commentsService.update(id, dto, req.user);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.commentsService.remove(id, req.user);
  }
}
