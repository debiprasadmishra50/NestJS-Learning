import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TestuserModule } from "../passport-local-testuser/testuser.module";
import { LocalStrategy } from "./local.strategy";
import { TestauthService } from "./testauth.service";

@Module({
    imports: [TestuserModule, PassportModule],
    providers: [TestauthService, LocalStrategy],
})
export class TestauthModule {}
