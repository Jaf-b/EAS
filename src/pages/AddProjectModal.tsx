import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Project } from "@/types";
import { StorageService } from "@/lib/storage";
import { X, Loader2 } from "lucide-react";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export default function AddProjectModal({ isOpen, onClose, onSave }: AddProjectModalProps) {
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

    // Simulate delay or check
    await new Promise(resolve => setTimeout(resolve, 500));

    const newProject: Project = {
      id: crypto.randomUUID(),
      ...formData,
      startDate: new Date(formData.startDate).toISOString(),
      managerId: StorageService.getCurrentUser()?.id || "unknown",
      appreciations: []
    };

    StorageService.saveProject(newProject);
    onSave(newProject);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-xl shadow-2xl p-6 animate-slide-up z-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Nouveau Projet</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du projet</Label>
            <Input 
              id="name" 
              required 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="ex: Tour Horizon"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Lieu</Label>
            <Input 
              id="location" 
              required
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="ex: Centre-ville"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Budget ($)</Label>
            <Input 
              id="budget" 
              type="number"
              min="0"
              required
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: Number(e.target.value)})}
              placeholder="ex: 120000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Statut</Label>
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

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea 
              id="description"
              className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm min-h-[80px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Brève description du projet..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Date de début</Label>
            <Input 
              id="startDate"
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>Annuler</Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Créer le projet
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
