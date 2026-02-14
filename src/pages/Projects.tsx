import { useState, useEffect } from "react";
import { Project } from "@/types";
import { StorageService } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import AddProjectModal from "./AddProjectModal"; // We'll create this next
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    loadProjects();
    
    // Listen for project added event
    const handleProjectAdded = () => {
      loadProjects();
    };
    
    window.addEventListener('projectAdded', handleProjectAdded);
    return () => window.removeEventListener('projectAdded', handleProjectAdded);
  }, []);

  const loadProjects = () => {
    setProjects(StorageService.getProjects());
  };

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projets</h1>
          <p className="text-muted-foreground">Gérez et suivez vos projets de construction.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Nouveau Projet
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Rechercher des projets..." 
            className="pl-8 bg-white" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Future: Filter buttons */}
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-gray-50/50">
          <p className="text-muted-foreground">Aucun projet trouvé.</p>
          {searchTerm && <Button variant="link" onClick={() => setSearchTerm("")}>Effacer la recherche</Button>}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddProjectModal 
          open={isAddModalOpen}
          onOpenChange={setIsAddModalOpen}
        />
      )}
    </div>
  );
}

// Sub-component for Project Card to keep file somewhat clean but ideally separate
function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();

  const statusColors = {
    planning: "bg-blue-100 text-blue-700 border-blue-200",
    "in-progress": "bg-yellow-100 text-yellow-700 border-yellow-200",
    completed: "bg-green-100 text-green-700 border-green-200",
    "on-hold": "bg-gray-100 text-gray-700 border-gray-200",
  };
  
  const statusLabels = {
    planning: "Planification",
    "in-progress": "En cours",
    completed: "Terminé",
    "on-hold": "En pause"
  };

  return (
    <Card 
        className="hover:shadow-lg transition-all duration-300 border-opacity-60 overflow-hidden group cursor-pointer active:scale-[0.98]"
        onClick={() => navigate(`/projects/${project.id}`)}
    >
      <div className="h-2 w-full bg-primary/80" />
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl line-clamp-1 group-hover:text-primary transition-colors">{project.name}</CardTitle>
          <span className={cn("text-xs font-medium px-2.5 py-0.5 rounded-full border", statusColors[project.status])}>
            {statusLabels[project.status]}
          </span>
        </div>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="text-sm text-muted-foreground space-y-1">
          <p>📍 {project.location}</p>
          <p>📅 {new Date(project.startDate).toLocaleDateString("fr-FR")}</p>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50/50 p-4 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
         <span className="text-xs text-muted-foreground">{project.appreciations?.length || 0} messages</span>
         <Button variant="ghost" size="sm" className="pointer-events-none">Voir les détails</Button>
      </CardFooter>
    </Card>
  );
}
