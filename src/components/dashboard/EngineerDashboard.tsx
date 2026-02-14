import { Project } from "@/types";
import { FolderKanban, FolderCheck, FolderClock, FolderX, TrendingUp } from "lucide-react";
import { useState } from "react";
import StatsCard from "./StatsCard";
import ProjectAnalyticsChart from "./ProjectAnalyticsChart";
import RemindersWidget from "./RemindersWidget";
import TeamCollaborationWidget from "./TeamCollaborationWidget";
import ProjectProgressChart from "./ProjectProgressChart";
import TimeTrackerWidget from "./TimeTrackerWidget";
import ProjectListWidget from "./ProjectListWidget";
import AddProjectModal from "@/pages/AddProjectModal";

interface EngineerDashboardProps {
  projects: Project[];
}

export default function EngineerDashboard({ projects }: EngineerDashboardProps) {
  const [isAddProjectOpen, setIsAddProjectOpen] = useState(false);
  
  // Calculate document archival statistics
  // Calculate total documents (assuming each project has tasks with potential documents)
  const totalDocuments = projects.reduce((sum, p) => sum + (p.tasks?.length || 0) * 2, 0); // Estimate 2 docs per task
  const archivedDocuments = projects.filter(p => p.status === 'completed').reduce((sum, p) => sum + (p.tasks?.length || 0) * 2, 0);
  const pendingDocuments = totalDocuments - archivedDocuments;
  
  // Calculate documents archived this month (mock data)
  const documentsThisMonth = Math.floor(archivedDocuments * 0.3);

  return (
    <div className="space-y-4 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tableau de Bord des Archives</h1>
          <p className="text-sm text-gray-500 mt-0.5">Gérez et suivez toute la documentation et les tâches d'archivage des projets.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setIsAddProjectOpen(true)}
            className="px-3 py-1.5 text-sm bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors flex items-center gap-2"
          >
            <TrendingUp className="h-3.5 w-3.5" />
            Télécharger des Documents
          </button>
          <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Exporter l'Archive
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Documents Totaux"
          value={totalDocuments}
          change="Dans tous les projets"
          icon={FolderKanban}
        />
        <StatsCard
          title="Documents Archivés"
          value={archivedDocuments}
          change="Archivés avec succès"
          icon={FolderCheck}
        />
        <StatsCard
          title="Documents en Attente"
          value={pendingDocuments}
          change="En attente d'archivage"
          icon={FolderClock}
        />
        <StatsCard
          title="Ce Mois-ci"
          value={documentsThisMonth}
          subtitle="Documents archivés"
          icon={FolderX}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-4">
          {/* Project Analytics */}
          <ProjectAnalyticsChart />

          {/* Team Collaboration */}
          <TeamCollaborationWidget />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-4">
          {/* Reminders */}
          <RemindersWidget />

          {/* Project List */}
          <ProjectListWidget projects={projects} />
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Project Progress */}
        <ProjectProgressChart />

        {/* Time Tracker */}
        <TimeTrackerWidget />
      </div>

      {/* Add Project Modal */}
      <AddProjectModal 
        open={isAddProjectOpen} 
        onOpenChange={setIsAddProjectOpen}
      />
    </div>
  );
}
