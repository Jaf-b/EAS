import { Project } from "@/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardTableProps {
    projects: Project[];
}

export default function DashboardTable({ projects }: DashboardTableProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
         <div className="flex justify-between items-center mb-6">
             <h3 className="font-semibold text-gray-900">Projets Actifs</h3>
             <div className="flex items-center gap-3">
                 <div className="relative">
                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                     <Input placeholder="Rechercher un projet..." className="pl-8 h-9 w-[200px] bg-gray-50 border-transparent focus:bg-white transition-colors" />
                 </div>
                 <Button variant="outline" size="sm" className="h-9 gap-2">
                     <Filter className="h-4 w-4" /> Filtrer
                 </Button>
                 <Button size="sm" className="h-9">
                     Exporter
                 </Button>
             </div>
         </div>

         <div className="overflow-x-auto">
             <table className="w-full">
                 <thead>
                     <tr className="border-b border-gray-100">
                         <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">ID</th>
                         <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Nom du Projet</th>
                         <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Gestionnaire</th>
                         <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Statut</th>
                         <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Budget</th>
                         <th className="text-right py-3 px-4 text-xs font-medium text-gray-400 uppercase tracking-wider">Date d'Échéance</th>
                     </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-50">
                     {projects.slice(0, 5).map(project => (
                         <tr key={project.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                             <td className="py-4 px-4 text-sm font-medium text-gray-900">#{project.id.substring(0, 6).toUpperCase()}</td>
                             <td className="py-4 px-4 text-sm text-gray-600">{project.name}</td>
                             <td className="py-4 px-4">
                                 <div className="flex items-center gap-2">
                                     <Avatar className="h-6 w-6">
                                         <AvatarFallback className="text-[9px] bg-orange-100 text-orange-600">MG</AvatarFallback>
                                     </Avatar>
                                     <span className="text-sm text-gray-600">Nom du Gestionnaire</span>
                                 </div>
                             </td>
                             <td className="py-4 px-4">
                                 <Badge variant="secondary" className="font-normal capitalize bg-blue-50 text-blue-600 hover:bg-blue-100">
                                     {project.status}
                                 </Badge>
                             </td>
                             <td className="py-4 px-4 text-sm text-gray-900 text-right font-medium">${(project.budget || 0).toLocaleString()}</td>
                             <td className="py-4 px-4 text-sm text-gray-500 text-right">
                                 {new Date(project.startDate).toLocaleDateString()}
                             </td>
                         </tr>
                     ))}
                 </tbody>
             </table>
         </div>
    </div>
  );
}
