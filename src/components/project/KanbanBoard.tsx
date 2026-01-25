import { useState } from "react";
import { Task } from "@/types";
import { Badge } from "@/components/ui/badge";

import TaskCard from "./TaskCard"; 
import VideoVerificationModal from "./VideoVerificationModal";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { DndContext, DragEndEvent, DragOverlay, useDraggable, useDroppable, DragStartEvent, useSensor, useSensors, PointerSensor } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (task: Task) => void;
  onEditTask?: (task: Task) => void;
}

// Draggable Task Component
function DraggableTask({ task, onEdit }: { task: Task, onEdit?: (task: Task) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task.id,
    data: { task }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  if (isDragging) {
      return (
          <div ref={setNodeRef} style={style} className="opacity-50">
              <TaskCard task={task} />
          </div>
      );
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab active:cursor-grabbing">
       <TaskCard task={task} onEdit={onEdit} />
    </div>
  );
}

// Droppable Column Component
function KanbanColumn({ id, title, color, count, children }: { id: string, title: string, color: string, count: number, children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div ref={setNodeRef} className={cn("flex-1 min-w-[300px] rounded-xl flex flex-col transition-colors", color)}>
            <div className="p-4 font-semibold text-gray-700 flex justify-between items-center">
                {title}
                <Badge variant="outline" className="bg-white">{count}</Badge>
            </div>
            <div className="p-3 pt-0 space-y-3 flex-1 overflow-y-auto min-h-[100px]">
                {children}
            </div>
        </div>
    );
}

export default function KanbanBoard({ tasks, onTaskUpdate, onEditTask }: KanbanBoardProps) {
  // const { user } = useAuth(); // Unused now that verification is global
  const [verifyingTask, setVerifyingTask] = useState<Task | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const { toast } = useToast();

  // Configure sensors to distinguish clicks from drags (requires 8px movement)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns: { id: Task['status']; title: string; color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'Pending', color: 'bg-blue-50' }, // Renamed to Pending as requested
    { id: 'done', title: 'Done', color: 'bg-green-50' }
  ];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current?.task);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task['status'];
    const task = tasks.find(t => t.id === taskId);

    if (!task || task.status === newStatus) return;

    // Logic for Verification Interception (All roles must verify)
    if (newStatus === 'done') {
        setVerifyingTask(task);
        return; 
    }

    // Otherwise move immediately
    onTaskUpdate({ ...task, status: newStatus });
  };

  const handleVerificationSuccess = (videoUrl: string) => {
    if (verifyingTask) {
        onTaskUpdate({ ...verifyingTask, status: 'done', videoUrl: videoUrl });
        setVerifyingTask(null);
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex h-full gap-4 overflow-x-auto pb-4">
        {columns.map(col => (
            <KanbanColumn key={col.id} id={col.id} title={col.title} color={col.color} count={tasks.filter(t => t.status === col.id).length}>
                {tasks.filter(t => t.status === col.id).map(task => (
                    <DraggableTask key={task.id} task={task} onEdit={onEditTask} />
                ))}
            </KanbanColumn>
        ))}

        {verifyingTask && (
            <VideoVerificationModal 
                isOpen={!!verifyingTask} 
                onClose={() => {
                    setVerifyingTask(null);
                    toast({ description: "Move cancelled. Video verification required.", variant: "destructive" });
                }} 
                onSuccess={handleVerificationSuccess}
                task={verifyingTask}
            />
        )}
        </div>
        
        {/* Overlay for smooth dragging visual */}
        <DragOverlay>
            {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
    </DndContext>
  );
}
