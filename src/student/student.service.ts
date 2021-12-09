import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../auth-sql-pg/entities/user.entity";
import { Repository } from "typeorm";
import { CreateStudentDto } from "./dto/create-student.dto";
import { StudentFilterDto } from "./dto/student-filter.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { StudentRepository } from "./student.repository";

@Injectable()
export class StudentService {
    // constructor(
    //     @InjectRepository(Student)
    //     private studentsRepository: Repository<Student>,
    // ) {}

    constructor(
        @InjectRepository(StudentRepository) private readonly studentsRepository: StudentRepository,
    ) {}

    async createStudent(createStudentDto: CreateStudentDto, user: User): Promise<Student> {
        // try {
        //     const student = this.studentsRepository.create(createStudentDto);

        //     await this.studentsRepository.save(student);
        //     return student;
        // } catch (err) {
        //     throw new BadRequestException("Could not create student", err.name);
        // }
        // OR //
        return await this.studentsRepository.createStudent(createStudentDto, user);
    }

    async findAllStudents(query: StudentFilterDto, user: User): Promise<Student[]> {
        // return await this.studentsRepository.find({});

        return this.studentsRepository.getStudents(query, user);
    }

    async findOneStudent(id: number, user: User): Promise<Student> {
        // const student = await this.studentsRepository.findOne(id);
        const student = await this.studentsRepository.findOne({ where: { id, user } });

        if (!student) throw new NotFoundException(`Student with id:${id} not found!`);

        return student;
    }

    async updateStudent(
        id: number,
        updateStudentDto: UpdateStudentDto,
        user: User,
    ): Promise<Student> {
        const student = await this.findOneStudent(id, user);

        const { firstName, lastName, email } = updateStudentDto;
        student.firstName = firstName ? firstName : student.firstName;
        student.lastName = lastName ? lastName : student.lastName;
        student.email = email ? email : student.email;

        await this.studentsRepository.save(student);

        return student;
    }

    async removeStudent(id: number, user: User): Promise<void> {
        const result = await this.studentsRepository.delete({ id, user });

        if (result.affected === 0) throw new NotFoundException(`Student with id:${id} not found!`);
    }
}
