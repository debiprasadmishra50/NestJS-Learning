import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { User, UserDocument } from "./entities/user.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.dto";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly authModel: Model<UserDocument>,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createAuthDto: CreateAuthDto) {
        let { password } = createAuthDto;

        password = await bcrypt.hash(password, 10);
        createAuthDto.password = password;

        try {
            const user = await this.authModel.create(createAuthDto);

            const payload: JwtPayload = { id: user.id };
            const token: string = this.jwtService.sign(payload);

            user.password = undefined;
            return { user, token };
        } catch (err) {
            if (err.code === 11000) throw new ConflictException("Email already exists");
            else throw new InternalServerErrorException();
        }
    }

    /*
        For Passport local auth
    */
    async loginPassport(loginAuthDto: LoginAuthDto) {
        const { email, password } = loginAuthDto;

        const user = await this.authModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            user.password = undefined;

            return user;
        }

        return null;
    }

    async signToken(user: any) {
        return this.jwtService.sign({ id: user.id });
    }

    /* 
        For Jwt auth
    */
    async loginJwt(loginAuthDto: LoginAuthDto) {
        const { email, password } = loginAuthDto;

        const user = await this.authModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            user.password = undefined;

            const payload: JwtPayload = { id: user.id };
            const token: string = this.jwtService.sign(payload);

            return { user, token };
        }

        throw new UnauthorizedException("Invalid Credentials!!!");
    }
}
