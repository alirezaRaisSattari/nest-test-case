import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    getTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        let found = this.tasks.find(task => task.id === id);

        if (!found)
            throw new NotFoundException();

        return found
    }

    deleteTaskById(id: string): void {
        let task = this.getTaskById(id);
        this.tasks = this.tasks.filter(task => task.id !== task.id);
    }

    updateTaskById(id: string, status: TaskStatus): Task {
        let task = this.getTaskById(id);
        task.status = status;
        return task
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }
        this.tasks.push(task);
        return task;
    }

}
