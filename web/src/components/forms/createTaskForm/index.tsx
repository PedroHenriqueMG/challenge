import { showAlertError } from "@/components/alertError";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type CreateTaskForm,
  createTaskFormSchema,
  Task,
} from "@/interface/taskSchema";
import { TaskService } from "@/service/task.service";
import { refreshTasks } from "@/utils/refreshTasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import React from "react";
import { useForm } from "react-hook-form";

type CreateTaskFormProps = {
  currentTasks: Task[];
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export function CreateTaskForm({
  currentTasks,
  setCloseModal,
}: CreateTaskFormProps) {
  const taskService = new TaskService();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTaskForm>({
    resolver: zodResolver(createTaskFormSchema),
  });
  const queryClient = useQueryClient();

  const onSubmit = async (data: CreateTaskForm) => {
    const toDoTasks = currentTasks.filter((task) => task.stage === "To_Do");

    try {
      await taskService.createTask({
        title: data.title,
        description: data.description,
        position: toDoTasks.length,
      });
      await refreshTasks({ queryClient });
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
