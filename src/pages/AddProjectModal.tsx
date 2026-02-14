import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Project } from "@/types";
import { StorageService } from "@/lib/storage";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface AddProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddProjectModal({ open, onOpenChange }: AddProjectModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    budget: 0,
    status: "planning" as Project['status'],
    startDate: new Date().toISOString().split('T')[0]
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 500));

    const newProject: Project = {
      id: crypto.randomUUID(),
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      managerId: StorageService.getCurrentUser()?.id || "unknown",
      appreciations: []
    };

    StorageService.saveProject(newProject);
    setIsLoading(false);
    
    // Show success toast
    toast({ 
      title: "Projet créé", 
      description: `Le projet "${newProject.name}" a été créé avec succès.` 
    });
    
    onOpenChange(false);
    // Trigger a custom event to notify the Projects page to reload
    window.dispatchEvent(new CustomEvent('projectAdded'));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Nouveau Projet</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm">Nom du Projet</Label>
            <Input 
              id="name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="ex: Tour Horizon"
              className="h-9"
            />
          </div>
          
          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-sm">Emplacement</Label>
            <Input 
              id="location" 
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="ex: Centre-ville"
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="budget" className="text-sm">Budget ($)</Label>
            <Input 
              id="budget" 
              type="number"
              min="0"
              required
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
              placeholder="ex: 120000"
              className="h-9"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="status" className="text-sm">Statut</Label>
            <select 
              id="status"
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as Project['status']})}
            >
              <option value="planning">Planification</option>
              <option value="in-progress">En cours</option>
              <option value="completed">Terminé</option>
              <option value="on-hold">En pause</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm">Description</Label>
            <textarea 
              id="description"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[60px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brève description du projet..."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="startDate" className="text-sm">Date de Début</Label>
            <Input 
              id="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              className="h-9"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} size="sm">
              Annuler
            </Button>
            <Button type="submit" disabled={isLoading} size="sm">
              {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : null}
              Créer le Projet
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
