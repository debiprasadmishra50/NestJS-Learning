import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { jwtConstants } from "./dto/constant";
import { User } from "./entities/user.entity";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { Request } from "express";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(@InjectRepository(UserRepository) private readonly userRepository: UserRepository) {
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
        const user: User = await this.userRepository.findOne(id);

        if (!user) {
            throw new UnauthorizedException(
                "The user belonging to this token does no longer exist.",
            );
        }

        return user;
    }
}
