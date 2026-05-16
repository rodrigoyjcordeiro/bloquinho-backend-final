import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>
  ){}

  async create(createUserDto: CreateUserDto) {
    const { email, password, ...rest } = createUserDto
    const normalizedEmail = email.toLowerCase()

    const existingUser = await this.userModel.findOne({email: normalizedEmail }).exec()

    if(existingUser){
      throw new ConflictException('Email já existe')
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const user = await this.userModel.create({
      ...rest, 
      email: normalizedEmail,
      password: hashPassword
    })

    return this.cleanUser(user);
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({email: email }).exec()
  }

  async findAll() {
    const users = await this.userModel.find().exec();
    return users.map(user => this.cleanUser(user))
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  cleanUser(user: UserDocument){
    const obj = user.toObject();

    return {
      id: obj._id.toString(),
      name: obj.name,
      email: obj.email,
      avatar: obj.avatar,
      createdAt: obj.createdAt,
      updatedAt: obj.updateAt
    }
  }
}
