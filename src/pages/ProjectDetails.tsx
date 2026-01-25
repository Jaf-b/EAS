import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Project, Task, User } from "@/types";
import { StorageService } from "@/lib/storage";
import { TaskService } from "@/lib/mockData"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Settings, MoreHorizontal, Calendar, Plus } from "lucide-react";
import TimelineView from "@/components/project/TimelineView";
import KanbanBoard from "@/components/project/KanbanBoard";
import AddTaskModal from "@/components/project/AddTaskModal";
import { useAuth } from "@/context/AuthContext";

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);
  const [curView, setCurView] = useState<'timeline' | 'kanban'>('timeline');

  /* Restore useEffect */
  useEffect(() => {
    if (id) {
       const projects = StorageService.getProjects();
       const found = projects.find(p => p.id === id);
       if (found) {
         setProject(found);
         // Simulate fetching tasks for this project
         setTasks(TaskService.getMockTasks(found.id));
         setMembers(TaskService.getMockMembers());
         
         // Set default view based on role
         if (user?.role === 'pdg') setCurView('timeline');
         else setCurView('kanban');

       } else {
         toast({ variant: "destructive", title: "Not Found", description: "Project not found." });
         navigate('/projects');
       }
    }
  }, [id, navigate, toast, user]);

  const handleSaveTask = (task: Task) => {
      // Check if updating or creating
      const exists = tasks.some(t => t.id === task.id);
      if (exists) {
          setTasks(tasks.map(t => t.id === task.id ? task : t));
          toast({ title: "Task Updated", description: "Changes saved successfully." });
      } else {
          setTasks([...tasks, task]);
          toast({ title: "Task Created", description: "New task added to board." });
      }
      setIsAddTaskOpen(false);
      setTaskToEdit(undefined);
  };
  
  const handleEditTask = (task: Task) => {
      setTaskToEdit(task);
      setIsAddTaskOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
      setTasks(tasks.filter(t => t.id !== taskId));
      setIsAddTaskOpen(false);
      setTaskToEdit(undefined);
      toast({ title: "Task Deleted", description: "The task has been removed." });
  };

  const handleTaskUpdate = (updatedTask: Task) => {
      setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  if (!project) return <div className="p-8">Loading...</div>;

  return (
    <div className="h-[calc(100vh-2rem)] flex flex-col bg-white rounded-xl shadow-sm border overflow-hidden animate-fade-in">
       {/* New Header (Vektora Style) */}
       <div className="border-b px-6 py-4 bg-white z-10">
          <div className="flex items-start justify-between">
              {/* Left: Breadcrumbs & Title */}
              <div className="space-y-4">
                  <div className="flex items-center text-xs text-muted-foreground gap-2">
                       <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigate('/projects')}>
                           <ArrowLeft className="h-3 w-3" />
                       </Button>
                       <span>Main Menu</span> / <span>Project</span> / <span className="text-gray-900 font-medium">#{project.id.substring(0,4)} - {project.name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white shadow-lg shadow-orange-200">
                          <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                          <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm mt-4">
                      <div className="flex items-center gap-2">
                          <span className="text-muted-foreground flex items-center gap-1"><Settings className="h-3 w-3" /> Status</span>
                          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              In Progress
                          </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">Assignee</span>
                          <div className="flex items-center gap-2">
                               {members.slice(0,3).map((m: any) => (
                                   <div key={m.id} className="flex items-center gap-1">
                                       <Avatar className="h-5 w-5">
                                           <AvatarImage src={m.avatarUrl} />
                                           <AvatarFallback>{m.username[0]}</AvatarFallback>
                                       </Avatar>
                                   </div>
                               ))}
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                  {/* View Toggles */}
                  <div className="flex bg-gray-100 p-1 rounded-lg mr-4">
                       <Button 
                        variant={curView === 'timeline' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`h-7 text-xs ${curView === 'timeline' ? 'bg-white shadow-sm' : ''}`}
                        onClick={() => setCurView('timeline')}
                       >
                           Timeline
                       </Button>
                       <Button 
                        variant={curView === 'kanban' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className={`h-7 text-xs ${curView === 'kanban' ? 'bg-white shadow-sm' : ''}`}
                        onClick={() => setCurView('kanban')}
                       >
                           Kanban
                       </Button>
                  </div>

                  {user?.role !== 'pdg' && (
                      <Button size="sm" className="gap-2" onClick={() => setIsAddTaskOpen(true)}>
                         <Plus className="h-4 w-4" /> New Task
                      </Button>
                  )}
                  <Button size="icon" variant="ghost">
                      <MoreHorizontal className="h-5 w-5" />
                  </Button>
              </div>
          </div>
       </div>

       {/* Content Area */}
       <div className="flex-1 bg-gray-100/50 p-6 overflow-hidden">
           {curView === 'timeline' ? (
               <TimelineView tasks={tasks} onEditTask={handleEditTask} />
           ) : (
               <KanbanBoard tasks={tasks} onTaskUpdate={handleTaskUpdate} onEditTask={handleEditTask} />
           )}
       </div>

       {isAddTaskOpen && (
           <AddTaskModal 
             isOpen={isAddTaskOpen} 
             onClose={() => { setIsAddTaskOpen(false); setTaskToEdit(undefined); }} 
             onSave={handleSaveTask}
             onDelete={handleDeleteTask}
             members={members}
             taskToEdit={taskToEdit}
            />
       )}
    </div>
  );
}
