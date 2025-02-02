type TaskCardProps = {
    taksTitle: string
  taskDescription: string
}

export const TaskCard = ({ taksTitle, taskDescription }: TaskCardProps) => {
  return (
    <div className="bg-zinc-400 p-2 flex flex-col gap-3 rounded-[10px]">
      <div className="w-full">
        <p>{taksTitle}</p>
      </div>
      <div className="w-full flex justify-between">
        <div>
            <p className="text-[10px]">{taskDescription}</p>
        </div>
      </div>
    </div>
  )
}