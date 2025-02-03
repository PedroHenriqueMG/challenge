import { Edit } from "@/assets/icons/edit";
import { Trash } from "@/assets/icons/trash";
import { TaskService } from "@/service/task.service";
import { refreshTasks } from "@/utils/refreshTasks";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { EditTaskForm } from "../forms/editTaskForm";

type TaskCardProps = {
  taskId: string;
  taksTitle: string;
  taskDescription: string;
};

export const TaskCard = ({
  taksTitle,
  taskDescription,
  taskId,
}: TaskCardProps) => {
  const taskService = new TaskService();
  const queryClient = useQueryClient();
  const [editTask, setEditTask] = useState(false);

  const handleDeleteTask = async () => {
    await taskService.deleteTask(taskId);
    await refreshTasks({ queryClient });
  };

  return (
    <div className="bg-zinc-400 p-2 flex flex-col gap-3 rounded-[10px]">
      <div className="w-full">
        <p>{taksTitle}</p>
      </div>
      <div className="w-full flex justify-between">
        <div>
          <p className="text-[10px]">{taskDescription}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setEditTask(true)}>
            <Edit width={14} height={14} />
          </button>
          <button type="button" onClick={handleDeleteTask}>
            <Trash width={14} height={14} />
          </button>
        </div>
      </div>
      <Dialog open={editTask} onOpenChange={setEditTask}>
        <DialogContent>
          <EditTaskForm setCloseModal={setEditTask} taskId={taskId} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
