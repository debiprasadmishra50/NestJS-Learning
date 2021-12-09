import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "./dto/constant";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./entities/user.entity";
import { UserDocument } from "./entities/user.entity";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { Request } from "express";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectModel(User.name) private readonly authModel: Model<UserDocument>) {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken() ||
                ExtractJwt.fromExtractors([
                    (req: Request) => {
                        let data = req?.cookies["jwt"];

                        if (!data) {
                            return null;
                        }
                        return data;
                    },
                ]),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { id } = payload;
        const user: User = await this.authModel.findById(id);

        if (!user) {
            throw new UnauthorizedException(
                "The user belonging to this token does no longer exist.",
            );
        }

        return user;
    }
}
