import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  task: string;
  status: 'Terminé' | 'En cours' | 'En attente';
  avatar?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alexandra Deff',
    task: 'Télécharger la Documentation du Projet GitHub',
    status: 'Terminé',
  },
  {
    id: '2',
    name: 'Edwin Adenike',
    task: 'Archiver les Docs du Système d\'Authentification',
    status: 'En cours',
  },
  {
    id: '3',
    name: 'Isaac Oluwafemi Orun',
    task: 'Organiser les Documents de la Fonctionnalité de Recherche',
    status: 'En attente',
  },
  {
    id: '4',
    name: 'David Oshodi',
    task: 'Archiver les Fichiers de Design de la Page d\'Accueil',
    status: 'En cours',
  },
];

export default function TeamCollaborationWidget() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Terminé':
        return 'bg-green-100 text-green-700';
      case 'En cours':
        return 'bg-yellow-100 text-yellow-700';
      case 'En attente':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold">Collaboration d'Équipe</CardTitle>
        <Button variant="outline" size="sm" className="text-sm">
          <UserPlus className="h-4 w-4 mr-1" />
          Ajouter un Membre
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={member.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] text-white text-xs">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{member.name}</p>
              <p className="text-xs text-gray-600 mb-1">Travaille sur {member.task}</p>
              <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(member.status)}`}>
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
