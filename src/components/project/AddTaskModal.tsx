import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Task, User, Priority } from "@/types";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  members: User[];
  taskToEdit?: Task;
}

export default function AddTaskModal({ isOpen, onClose, onSave, onDelete, members, taskToEdit }: AddTaskModalProps) {
  const [title, setTitle] = useState(taskToEdit?.title || "");
  const [description, setDescription] = useState(taskToEdit?.description || "");
  const [priority, setPriority] = useState<Priority>(taskToEdit?.priority || "medium");
  const [startTime, setStartTime] = useState(taskToEdit?.startTime ? new Date(taskToEdit.startTime).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16));
  const [assigneeId, setAssigneeId] = useState(taskToEdit?.assignees[0]?.id || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const assignee = members.find(m => m.id === assigneeId);
    
    // Preserve existing ID if editing, otherwise new UUID
    const newTask: Task = {
        id: taskToEdit?.id || crypto.randomUUID(),
        title,
        description,
        priority,
        status: taskToEdit?.status || 'todo',
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(new Date(startTime).getTime() + 2 * 60 * 60 * 1000).toISOString(),
        assignees: assignee ? [assignee] : [],
        videoUrl: taskToEdit?.videoUrl
    };

    onSave(newTask);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{taskToEdit ? "Edit Task" : "Add New Task"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <select 
                    id="priority" 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as Priority)}
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="assignee">Assignee</Label>
                <select 
                    id="assignee" 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    value={assigneeId}
                    onChange={(e) => setAssigneeId(e.target.value)}
                >
                    <option value="">Select...</option>
                    {members.map(m => (
                        <option key={m.id} value={m.id}>{m.username}</option>
                    ))}
                </select>
              </div>
          </div>
           <div className="grid gap-2">
            <Label htmlFor="start">Start Time</Label>
            <Input id="start" type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
          </div>
          <div className="flex justify-between mt-4">
             {taskToEdit && onDelete ? (
                 <Button type="button" variant="destructive" onClick={() => onDelete(taskToEdit.id)}>
                     Delete Task
                 </Button>
             ) : (
                 <div /> 
             )}
             <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit">{taskToEdit ? "Save Changes" : "Create Task"}</Button>
             </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
