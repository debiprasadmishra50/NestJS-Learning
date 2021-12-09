import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createAuthDto: CreateAuthDto): Promise<User> {
        let { password } = createAuthDto;

        password = await bcrypt.hash(password, 10);
        createAuthDto.password = password;

        try {
            let user = this.create(createAuthDto);
            user = await this.save(user);

            return user;
        } catch (err) {
            console.log(err);

            if (err.code === "23505") throw new ConflictException("Email already exists");
            else throw new InternalServerErrorException();
        }
    }
}
