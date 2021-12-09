import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./entities/task.entity";
import { v4 as uuid } from "uuid";
import { FilterTaskDto } from "./dto/filter-task.dto";

@Injectable()
export class TaskService {
    private tasks: Task[] = [];

    createTask(createTaskDto: CreateTaskDto): Task {
        const { completed, duration } = createTaskDto;

        const task = {
            id: uuid(),
            completed: completed ? completed : false,
            duration: duration ? duration : 0,
            ...createTaskDto,
        };

        this.tasks.push(task);

        return task;
    }

    filterCompletedTasks(filters: FilterTaskDto): Task[] {
        return this.tasks.filter((task) => task.completed === filters.completed);
    }

    findAllTasks(): Task[] {
        return this.tasks;
    }

    findOneTask(id: string): Task {
        const task = this.tasks.find((task) => task.id === id);

        if (!task) throw new NotFoundException("Task Not Found");

        return task;
    }

    updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
        const task = this.findOneTask(id);

        const { name, completed, duration, owner, description } = updateTaskDto;

        if (name) task.name === name;
        if (completed) task.completed === completed;
        if (duration) task.duration === duration;
        if (owner) task.owner === owner;
        if (description) task.description === description;

        return task;
    }

    removeTask(id: string): Task {
        const task = this.findOneTask(id);

        this.tasks.splice(
            this.tasks.findIndex((task) => task.id === id),
            1,
        );

        return task;
    }
}
