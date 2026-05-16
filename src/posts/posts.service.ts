import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import { Model } from 'mongoose';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>){}

  async create(createPostDto: CreatePostDto, user: any) {
   return await this.postModel.create(
      {
        ...createPostDto,
        author: user._id
      }
    )
    
  }


  async findAll(page: number, limit: number) {
    const skip = (page - 1 ) * limit
    const [posts, total] = await Promise.all([
      this.postModel.find()
            .skip(skip)
            .limit(limit)
            .populate('author', 'name avatar'),
      this.postModel.countDocuments()
    ])
    
    const totalPages = Math.ceil(total/limit)

    return {
      data: posts,
      meta: {
        total,
        totalPages,
        page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page -1 : null
      }
    }
     
  }

  async findAllMyPosts(page: number, limit: number, user: any) {
    const skip = (page - 1 ) * limit
    const [posts, total] = await Promise.all([
      this.postModel.find({ author: user._id })
            .skip(skip)
            .limit(limit)
            .populate('author', 'name avatar'),
      this.postModel.countDocuments()
    ])
    
    const totalPages = Math.ceil(total/limit)

    return {
      data: posts,
      meta: {
        total,
        totalPages,
        page,
        nextPage: page < totalPages ? page + 1 : null,
        prevPage: page > 1 ? page -1 : null
      }
    }
     
  }


  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
