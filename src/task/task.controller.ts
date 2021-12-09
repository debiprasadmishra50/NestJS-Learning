import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Res,
    UseFilters,
    ParseUUIDPipe,
    Query,
    ParseBoolPipe,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { Response } from "express";
import { FilterTaskDto } from "./dto/filter-task.dto";
import { HttpExceptionFilter } from "./filters/httpexception.filter";

@Controller("tasks")
@UseFilters(HttpExceptionFilter)
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Post()
    create(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto);
    }

    @Get()
    @UsePipes(new ValidationPipe({ whitelist: false, transform: true }))
    findAll(@Res() res: Response, @Query() filters?: FilterTaskDto): void {
        let data: Task[];

        if (Object.keys(filters).length) data = this.taskService.filterCompletedTasks(filters);
        else data = this.taskService.findAllTasks();

        res.status(200).json({
            status: "success",
            results: data.length,
            data,
        });
    }

    @Get(":id")
    findOne(@Param("id", ParseUUIDPipe) id: string): Task {
        return this.taskService.findOneTask(id);
    }

    @Patch(":id")
    update(@Param("id", ParseUUIDPipe) id: string, @Body() updateTaskDto: UpdateTaskDto): Task {
        return this.taskService.updateTask(id, updateTaskDto);
    }

    @Delete(":id")
    remove(@Param("id", ParseUUIDPipe) id: string): Task {
        return this.taskService.removeTask(id);
    }
}
