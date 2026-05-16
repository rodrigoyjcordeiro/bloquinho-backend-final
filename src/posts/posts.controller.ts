import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUser } from 'src/decorators/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: any) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Query('page') page = '1', 
          @Query('limit') limit = '10', 
          @Query('me') me = false, 
          @GetUser() user : any) {
    const pageNumber = Math.max(Number(page), 1)
    const limitNumber = Math.min(Math.max(Number(limit), 1), 50)

    if(Boolean(me)){
      return this.postsService.findAllMyPosts(pageNumber, limitNumber, user)
    }

    return this.postsService.findAll(pageNumber, limitNumber);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
