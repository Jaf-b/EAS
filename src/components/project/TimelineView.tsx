import { useState } from "react";
import { Task } from "@/types";
import TaskCard from "./TaskCard";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimelineViewProps {
  tasks: Task[];
  onEditTask?: (task: Task) => void;
}

export default function TimelineView({ tasks, onEditTask }: TimelineViewProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = -1; i < 6; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d);
    }
    return dates;
  };
  const dates = generateDates();

  const getTasksForDate = (date: Date) => {
    return tasks.filter(t => {
        const tDate = new Date(t.startTime);
        return tDate.getDate() === date.getDate() && 
               tDate.getMonth() === date.getMonth() &&
               tDate.getFullYear() === date.getFullYear();
    });
  };

  const filteredTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  return (
    <div className="h-full flex flex-col">
        {/* Timeline Controls */}
        <div className="flex items-center justify-between mb-6 px-1">
             <div className="flex items-center gap-2">
                 <span className="text-sm font-medium">
                     {dates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {dates[dates.length-1].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                 </span>
                 {selectedDate && (
                    <Button variant="secondary" size="sm" onClick={() => setSelectedDate(null)} className="ml-4 h-7 text-xs">
                        Effacer le Filtre de Date
                    </Button>
                 )}
             </div>
        </div>

        {/* If Date Selected -> Show List for that Day (PDG requirement: display just tasks of current date) */}
        {selectedDate ? (
            <div className="flex-1 overflow-y-auto p-4 bg-white rounded-xl border">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    Tâches pour {selectedDate.toLocaleDateString('fr-FR')}
                    <span className="text-sm font-normal text-muted-foreground">({filteredTasks.length})</span>
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {filteredTasks.map(task => (
                        <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                    ))}
                    {filteredTasks.length === 0 && <p className="text-muted-foreground">Aucune tâche prévue pour ce jour.</p>}
                </div>
            </div>
        ) : (
            /* Full Timeline Grid */
            <div className="flex-1 overflow-x-auto custom-scrollbar pb-4">
                 <div className="min-w-[1000px] grid grid-cols-7 border-t border-gray-200">
                    {dates.map((date, i) => (
                        <div 
                            key={i} 
                            className={cn(
                                "border-r border-gray-100 border-dashed p-3 space-y-4 bg-gray-50/30 last:border-r-0 hover:bg-gray-100/50 transition-colors cursor-pointer min-h-[400px]",
                                ((selectedDate as any)?.getDate() === date.getDate()) ? "bg-blue-50/50" : ""
                            )}
                            onClick={() => setSelectedDate(date)}
                        >
                            <div className="text-center py-4 border-b border-gray-100 mb-2">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                                </p>
                                <p className="text-lg font-bold text-gray-900 mt-1">
                                    {date.getDate()}
                                </p>
                            </div>

                             {getTasksForDate(date).map(task => (
                                 <TaskCard key={task.id} task={task} onEdit={onEditTask} />
                             ))}
                        </div>
                    ))}
                 </div>
            </div>
        )}
    </div>
  );
}
