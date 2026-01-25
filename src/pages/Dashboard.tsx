import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { StorageService } from "@/lib/storage";
import { Project } from "@/types";
import PDGDashboard from "@/components/dashboard/PDGDashboard";
import EngineerDashboard from "@/components/dashboard/EngineerDashboard";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for effect
    const timer = setTimeout(() => {
        setProjects(StorageService.getProjects());
        setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
        <div className="flex h-[80vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  return (
    <div className="container mx-auto p-2">
        {user?.role === 'engineer' ? (
            <EngineerDashboard projects={projects} />
        ) : (
            // Default to PDG view if pdg or unknown (safe fallback)
            <PDGDashboard projects={projects} />
        )}
    </div>
  );
}
