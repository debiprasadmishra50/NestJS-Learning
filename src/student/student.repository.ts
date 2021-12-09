import { BadRequestException } from "@nestjs/common";
import { User } from "../auth-sql-pg/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { StudentFilterDto } from "./dto/student-filter.dto";
import { Student } from "./entities/student.entity";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
    async createStudent(createStudentDto: CreateStudentDto, user: User): Promise<Student> {
        try {
            const student = this.create({ ...createStudentDto, user });

            await this.save(student);
            return student;
        } catch (err) {
            throw new BadRequestException(`Could not create student ${err.name}`);
        }
    }

    async getStudents(filter: StudentFilterDto, user: User): Promise<Student[]> {
        const { firstName, lastName, name } = filter;
        const query = this.createQueryBuilder("student");

        query.where({ user });

        if (firstName) {
            query.andWhere("LOWER(student.firstName) = LOWER(:firstName)", { firstName });
        }

        if (lastName) {
            query.andWhere("LOWER(student.lastName) = LOWER(:lastName)", { lastName });
        }

        if (name) {
            query.andWhere(
                "(LOWER(student.firstName) LIKE LOWER(:name) OR LOWER(student.lastName) LIKE LOWER(:name))",
                {
                    name: `%${name}%`,
                },
            );
        }

        const tasks = await query.getMany();
        return tasks;
    }
}
