import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Task } from '../utils/typeorm';

@Injectable()
export class TaskService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}

  async getTasksService() {
    const tasks = await this.taskRepository.find();

    return tasks;
  }

  async getTaskService(taskId) {
    const task = await this.taskRepository.find({
      where: { user_id: taskId },
    });

    return task;
  }

  async createTaskService(data) {
    const createTask = await this.taskRepository.create(data);

    return this.taskRepository.save(createTask);
  }

  async deleteTaskService(taskId) {
    const deletedTask = await this.taskRepository.delete({ id: taskId });

    return deletedTask;
  }

  async updateTaskService(taskId, data) {
    const existingTask = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    const updateTask = await this.taskRepository.update(taskId, { ...existingTask, ...data });

    return updateTask;
  }
}
