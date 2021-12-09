import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException,
} from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { LoginAuthDto } from "./dto/login-auth.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./dto/jwt-payload.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) {}

    async signup(createAuthDto: CreateAuthDto) {
        const user = await this.userRepository.createUser(createAuthDto);

        const payload: JwtPayload = { id: user.id };
        const token: string = this.jwtService.sign(payload);

        user.password = undefined;
        return { user, token };
    }

    /*
        For Passport local auth
    */
    async loginPassport(loginAuthDto: LoginAuthDto) {
        const { email, password } = loginAuthDto;

        const user = await this.userRepository.findOne({ email });

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

        const user = await this.userRepository.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            user.password = undefined;

            const payload: JwtPayload = { id: user.id };
            const token: string = this.jwtService.sign(payload);

            return { user, token };
        }

        throw new UnauthorizedException("Invalid Credentials!!!");
    }
}
