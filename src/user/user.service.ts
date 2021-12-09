import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class UserService {
    private users: User[] = [];

    create(createUserDto: CreateUserDto): User {
        const newUser = { ...createUserDto, id: uuid() };
        this.users.push(newUser);
        return newUser;
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id: string): User {
        const user = this.users.find((user) => user.id === id);

        if (!user) throw new NotFoundException("User Not Found!");

        return user;
    }

    update(id: string, updateUserDto: UpdateUserDto) {
        const user = this.findOne(id);
        const { name, email } = updateUserDto;

        if (name) user.name = name;
        if (email) user.email = email;

        return user;
    }

    remove(id: string) {
        const user = this.findOne(id);

        this.users.splice(
            this.users.findIndex((user) => user.id === id),
            1,
        );

        return user;
    }
}
