import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Role } from "./role.enum";

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
export class User {
    @Prop()
    name: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    @Prop()
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
