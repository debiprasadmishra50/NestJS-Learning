import { Module } from "@nestjs/common";
import { AuthService } from "./auth-sql.service";
import { AuthController } from "./auth-sql.controller";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./dto/constant";
import { JwtStrategy } from "./jwt.strategy";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "1h" },
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService, PassportModule, JwtStrategy],
})
export class AuthSQLModule {}
