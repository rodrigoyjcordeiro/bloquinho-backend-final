import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema({
  timestamps: true
})
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    avatar: string

    createdAt: Date
    updateAt: Date
    
}

export const userSchema = SchemaFactory.createForClass(User)