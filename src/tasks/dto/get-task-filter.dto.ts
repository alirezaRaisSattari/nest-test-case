import { TaskStatus } from "../task.model";

export class getTaskFilterDto {
    status: TaskStatus;
    search: string;
}