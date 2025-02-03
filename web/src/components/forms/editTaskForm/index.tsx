import { Spinner } from "@/assets/icons/spinner";
import { showAlertError } from "@/components/alertError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Task,
  UpdateTaskForm,
  updateTaskFormSchema,
} from "@/interface/taskSchema";
import { TaskService } from "@/service/task.service";
import { refreshTasks } from "@/utils/refreshTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditTaskFormProps {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  taskId: string;
}

export function EditTaskForm({ taskId, setCloseModal }: EditTaskFormProps) {
  const taskService = new TaskService();

  const fetchTask = async () => {
    const response = await taskService.getTask(taskId);
    return response.data;
  };

  const { data: task, isLoading } = useQuery<Task>({
    queryFn: fetchTask,
    queryKey: ["task", taskId],
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateTaskForm>({
    resolver: zodResolver(updateTaskFormSchema),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
      });
    }
  }, [task, reset]);

  const onSubmit = async (data: UpdateTaskForm) => {
    if (!task) return;

    try {
      await taskService.updateTask({
        id: taskId,
        title: data.title,
        description: data.description,
        stage: task?.stage,
        position: task?.position,
      });
      await refreshTasks({ queryClient, taskId });
      setCloseModal(false);
      reset();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage = (error.response.data as { message: string })
          .message;
        showAlertError(errorMessage);
      } else {
        showAlertError("Ocorreu um erro inesperado.");
      }
    }
  };

  if (isLoading) {
    return <Spinner width={15} height={15} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mt-4"
    >
      <Input
        type="text"
        {...register("title")}
        placeholder="Digite o Titulo da tarefa"
      />
      {errors.title && <span>{errors.title.message}</span>}
      <Input
        type="text"
        {...register("description")}
        placeholder="Digite a descrição da tarefa"
      />
      {errors.description && <span>{errors.description.message}</span>}
      <Button type="submit">Enviar</Button>
    </form>
  );
}
