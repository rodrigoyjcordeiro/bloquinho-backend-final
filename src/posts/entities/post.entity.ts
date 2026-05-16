import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "src/user/entities/user.entity";

@Schema()
export class Post {

    @Prop()
    content: string

    @Prop({ type: Types.ObjectId, ref: User.name })
    author: Types.ObjectId | undefined; 

    constructor(){
        this.content = ""
        this.author = undefined
    }
}

export type PostDocument =  HydratedDocument<Post>;
export const PostSchema = SchemaFactory.createForClass(Post)