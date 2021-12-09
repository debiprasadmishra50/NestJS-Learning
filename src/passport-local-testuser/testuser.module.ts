import { Module } from "@nestjs/common";
import { TestuserService } from "./testuser.service";

@Module({
    providers: [TestuserService],
    exports: [TestuserService],
})
export class TestuserModule {}
