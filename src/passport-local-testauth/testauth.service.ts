import { Injectable } from "@nestjs/common";
import { TestuserService } from "../passport-local-testuser/testuser.service";

@Injectable()
export class TestauthService {
    constructor(private usersService: TestuserService) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}
