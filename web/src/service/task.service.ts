import { api } from "@/api/api";
import { CreateTask, Task } from "@/interface/taskSchema";

export class TaskService {
  async createTask(data: CreateTask) {
    const response = await api.post("api/tasks", data);

    return response;
  }

  async getTasks() {
    const response = await api.get("api/tasks");

    return response;
  }

  async getTask(taskId: string) {
    const response = await api.get(`api/tasks/${taskId}`);

    return response;
  }

  async updateTask(data: Task) {
    const response = await api.patch(`api/tasks/${data.id}`, {
      title: data.title,
      description: data.description,
      stage: data.stage,
      position: data.position,
    });

    return response;
  }

  async deleteTask(id: string) {
    const response = await api.delete(`api/tasks/${id}`);

    return response;
  }
}
