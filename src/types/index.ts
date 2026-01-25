export type UserRole = 'pdg' | 'engineer' | 'employee';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  createdAt: string;
  avatarUrl?: string;
}

export interface Appreciation {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: TaskStatus;
  startTime: string; // ISO date string
  endTime: string;   // ISO date string
  assignees: User[];
  videoUrl?: string; // URL to the video (blob or remote)
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  location: string;
  budget: number;
  startDate: string;
  managerId: string;
  appreciations: Appreciation[];
  tasks?: Task[];
  tags?: string[];
  members?: User[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
