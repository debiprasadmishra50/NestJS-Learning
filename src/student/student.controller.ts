import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    ClassSerializerInterceptor,
    UseInterceptors,
    HttpCode,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { Student } from "./entities/student.entity";
import { StudentFilterDto } from "./dto/student-filter.dto";
import { JwtAuthGuard } from "../auth-sql-pg/guards/jwt-auth.guard";
import { User } from "../auth-sql-pg/entities/user.entity";
import { GetUser } from "../auth-sql-pg/get-user.decorator";
import { TransformInterceptor } from "./transform.interceptor";

@Controller("students")
@UseGuards(JwtAuthGuard)
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @Post()
    // @UseInterceptors(ClassSerializerInterceptor) // OR
    @UseInterceptors(TransformInterceptor) // to not display the user property after creation
    async create(
        @Body() createStudentDto: CreateStudentDto,
        @GetUser() user: User,
    ): Promise<Student> {
        return this.studentService.createStudent(createStudentDto, user);
    }

    @Get()
    async findAll(@Query() query: StudentFilterDto, @GetUser() user: User): Promise<Student[]> {
        return this.studentService.findAllStudents(query, user);
    }

    @Get(":id")
    async findOne(@Param("id") id: string, @GetUser() user: User): Promise<Student> {
        return this.studentService.findOneStudent(+id, user);
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() updateStudentDto: UpdateStudentDto,
        @GetUser() user: User,
    ): Promise<Student> {
        return this.studentService.updateStudent(+id, updateStudentDto, user);
    }

    @Delete(":id")
    @HttpCode(204)
    async remove(@Param("id") id: string, @GetUser() user: User): Promise<void> {
        return this.studentService.removeStudent(+id, user);
    }
}
