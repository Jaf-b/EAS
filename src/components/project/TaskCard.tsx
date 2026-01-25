import { Task } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, PlayCircle, MoreVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
}

export default function TaskCard({ task, onEdit }: TaskCardProps) {
// ... existing colors ...
  const priorityColors = {
    low: "bg-green-100 text-green-700 hover:bg-green-200",
    medium: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    high: "bg-red-100 text-red-700 hover:bg-red-200"
  };

  const startTime = new Date(task.startTime);
  const timeString = startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const dateString = startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* ... existing trigger div ... */}
        <div className="bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition-all cursor-pointer group relative active:scale-95 duration-200">
             {/* ... content ... */}
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-sm text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                    {task.title}
                </h4>
                <MoreVertical className="h-4 w-4 text-gray-400" />
            </div>

            <div className="text-xs text-muted-foreground mb-3 flex items-center">
                 <Clock className="h-3 w-3 mr-1" />
                 {dateString} at {timeString}
            </div>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className={cn("text-[10px] px-2 py-0.5 h-6", priorityColors[task.priority])}>
                        {task.priority}
                    </Badge>
                     {/* Video Indicator */}
                    {task.videoUrl && <PlayCircle className="h-4 w-4 text-blue-500" />}
                </div>

                <div className="flex -space-x-2">
                    {task.assignees.map((user, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-white">
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback className="text-[8px]">{user.username.substring(0,2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                    ))}
                    {task.assignees.length > 0 && (
                        <div className="h-6 w-6 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[8px] text-gray-600 font-medium">
                            +{task.assignees.length}
                        </div>
                    )}
                </div>
            </div>
        </div>
      </DialogTrigger>

      {/* Task Details Modal */}
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-xl">
        <DialogHeader>
          <div className="flex justify-between items-start pr-8">
              <div className="space-y-1">
                 <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                    {task.title}
                    <Badge className={cn("text-xs", priorityColors[task.priority])}>{task.priority}</Badge>
                 </DialogTitle>
                 <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" /> {dateString} • {timeString}
                 </div>
              </div>
              {onEdit && (
                  <Button variant="outline" size="sm" onClick={() => onEdit(task)} className="gap-2">
                      <Edit2 className="h-3 w-3" /> Edit
                  </Button>
              )}
          </div>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
            <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-900">Description</h4>
                <p className="text-sm text-gray-500 leading-relaxed">
                    {task.description}
                </p>
            </div>

            <div className="space-y-2">
                <h4 className="font-medium text-sm text-gray-900">Task Video</h4>
                {task.videoUrl ? (
                    <div className="rounded-lg overflow-hidden border bg-black aspect-video">
                        <video controls className="w-full h-full">
                            <source src={task.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <div className="p-4 bg-gray-100 rounded-lg text-sm text-gray-500 text-center">
                        No video attached.
                    </div>
                )}
            </div>

            <div className="space-y-2">
                 <h4 className="font-medium text-sm text-gray-900">Assignees</h4>
                 <div className="flex items-center gap-3">
                    {task.assignees.map((user) => (
                        <div key={user.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg pr-4">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatarUrl} />
                                <AvatarFallback>{user.username[0]}</AvatarFallback>
                            </Avatar>
                            <div className="text-xs">
                                <p className="font-medium text-gray-900">{user.username}</p>
                                <p className="text-gray-500 capitalize">{user.role}</p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
