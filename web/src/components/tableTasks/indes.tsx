import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { TaskCard } from "../taskCard";
import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { CreateTaskForm } from "../forms/createTaskForm";
import { useQuery } from "@tanstack/react-query";
import { TaskService } from "@/service/task.service";
import { Task } from "@/interface/taskSchema";
import { Spinner } from "@/assets/icons/spinner";
import { socket } from "@/service/socket";

const columns = [
  { id: "To_Do", title: "A fazer" },
  { id: "In_Progress", title: "Em andamento" },
  { id: "Done", title: "Feito" },
];

export function TableTasks() {
  const taskService = new TaskService();
  const fetchTasks = async () => {
    const response = await taskService.getTasks();
    return response.data;
  };

  const { data, isLoading } = useQuery<Task[]>({
    queryFn: fetchTasks,
    queryKey: ["tasks"],
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [createTask, setCreateTask] = useState(false);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;

    socket.emit("update task stage", {
      stage: destination.droppableId,
      position: destination.index,
      taskId: draggableId,
    });

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === draggableId) {
          return { ...task, stage: destination.droppableId };
        }
        return task;
      });
    });
  };

  if (isLoading) {
    return <Spinner width={15} height={15} />;
  }

  return (
    <div className="flex gap-3">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {columns.map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-[294px] bg-zinc-100 px-5 flex flex-col gap-4 rounded-[10px] h-[calc(100vh-210px)] relative"
              >
                <p>{column.title}</p>
                <div className="overflow-y-auto flex flex-col gap-3">
                  {tasks
                    .filter((task) => task.stage === column.id)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <TaskCard
                              taskId={task.id}
                              taksTitle={task.title}
                              taskDescription={task.description}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
                {column.id === "To_Do" && (
                  <button
                    type="button"
                    onClick={() => setCreateTask(true)}
                    className="bg-zinc-400 absolute bottom-4 ml-3 rounded-[10px] px-4 py-2"
                  >
                    + Adicionar um cartão
                  </button>
                )}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
      <Dialog open={createTask} onOpenChange={setCreateTask}>
        <DialogContent>
          <CreateTaskForm currentTasks={tasks} setCloseModal={setCreateTask} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
