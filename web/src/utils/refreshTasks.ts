import { Task } from "@/interface/taskSchema";
import { TaskService } from "@/service/task.service";
import { QueryClient } from "@tanstack/react-query";

type RefreshTasksProps = {
  queryClient: QueryClient;
  taskId?: string;
};

export const refreshTasks = async ({
  queryClient,
  taskId,
}: RefreshTasksProps) => {
  const taskService = new TaskService();
  const response = await taskService.getTasks();
  const { data: newTasks } = response;

  if (taskId) {
    const task = newTasks.find((task: Task) => task.id === taskId);
    queryClient.setQueryData(["task", taskId], task);
  }

  queryClient.setQueryData(["tasks"], newTasks);
};
