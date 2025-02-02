import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { TaskCard } from "../taskCard";
import { useState } from "react";

const columns = [
  { id: "TO_DO", title: "A fazer" },
  { id: "IN_PROGRESS", title: "Em andamento" },
  { id: "DONE", title: "Feito" },
];

const initialTasks = [
  {
    id: "1",
    title: "Tarefa 1",
    description: "Descrição da tarefa 1",
    stage: "TO_DO",
    position: 0,
  },
  {
    id: "2",
    title: "Tarefa 2",
    description: "Descrição da tarefa 2",
    stage: "IN_PROGRESS",
    position: 0,
  },
  {
    id: "3",
    title: "Tarefa 3",
    description: "Descrição da tarefa 3",
    stage: "DONE",
    position: 0,
  },
];

export function TableTasks() {
  const [tasks, setTasks] = useState(initialTasks);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { destination, draggableId } = result;

    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === draggableId) {
          return { ...task, stage: destination.droppableId };
        }
        return task;
      });
    });
  };

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
                    .filter((task) => task.stage === column.id) // Filtrando as tasks pela coluna correta
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
                              taksTitle={task.title}
                              taskDescription={task.description}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
                {column.id === "TO_DO" && (
                  <button
                    type="button"
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
    </div>
  );
}
