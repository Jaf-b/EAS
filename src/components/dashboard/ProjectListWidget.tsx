import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Code, Palette, Zap, Globe } from "lucide-react";
import { Project } from "@/types";

interface ProjectListWidgetProps {
  projects: Project[];
}

const projectIcons = [Code, Palette, Zap, Globe];
const projectColors = ['bg-blue-500', 'bg-teal-500', 'bg-yellow-500', 'bg-purple-500'];

export default function ProjectListWidget({ projects }: ProjectListWidgetProps) {
  const displayProjects = projects.slice(0, 4);

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Project</CardTitle>
        <Button variant="outline" size="sm" className="text-sm">
          <Plus className="h-4 w-4 mr-1" />
          New
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayProjects.map((project, index) => {
          const Icon = projectIcons[index % projectIcons.length];
          const colorClass = projectColors[index % projectColors.length];
          const taskCount = project.tasks?.length || 0;
          const videoCount = project.tasks?.filter(t => t.videoUrl).length || 0;
          
          return (
            <div key={project.id} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors border-l-2 border-blue-500">
              <div className={`p-1.5 rounded-lg ${colorClass}`}>
                <Icon className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs truncate">{project.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <p className="text-[10px] text-gray-500">
                    📄 {taskCount} docs
                  </p>
                  <p className="text-[10px] text-[#2563eb] font-medium">
                    🎥 {videoCount} videos
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-[10px] px-1.5 py-0.5 rounded ${videoCount > 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {videoCount > 0 ? 'Archived' : 'Pending'}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
