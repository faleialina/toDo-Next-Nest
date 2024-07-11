import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasks() {
    return await this.taskService.getTasksService();
  }

  @Get(':id')
  async getTask(@Param('id', ParseIntPipe) taskId: number) {
    return await this.taskService.getTaskService(taskId);
  }

  @Post()
  async createTask(@Body() data) {
    return await this.taskService.createTaskService(data);
  }

  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) taskId: number) {
    return await this.taskService.deleteTaskService(taskId);
  }

  @Patch(':id')
  async updateTask(@Param('id', ParseIntPipe) taskId: number, @Body() data) {
    return await this.taskService.updateTaskService(taskId, data);
  }
}
