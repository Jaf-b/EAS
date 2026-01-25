import { Task, User } from "@/types";

// Mock Users
const MOCK_USERS: User[] = [
    { id: 'u1', username: 'Esther Howard', role: 'engineer', createdAt: '', avatarUrl: 'https://i.pravatar.cc/150?u=u1' },
    { id: 'u2', username: 'Ronald Richards', role: 'engineer', createdAt: '', avatarUrl: 'https://i.pravatar.cc/150?u=u2' },
    { id: 'u3', username: 'Devon Lane', role: 'pdg', createdAt: '', avatarUrl: 'https://i.pravatar.cc/150?u=u3' },
    { id: 'u4', username: 'Albert Flores', role: 'engineer', createdAt: '', avatarUrl: 'https://i.pravatar.cc/150?u=u4' },
];

export const TaskService = {
    getMockTasks: (_projectId: string): Task[] => {
        // Generate tasks distributed over the next few days
        const today = new Date();
        const tasks: Task[] = [];
        
        const priorities: ('low'|'medium'|'high')[] = ['low', 'medium', 'high'];
        const titles = [
            "Plan project launch", 
            "Develop marketing strategy", 
            "Design user interface", 
            "Outline content structure",
            "Review team progress"
        ];
        
        for (let i = 0; i < 5; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + (i % 3)); // Spread over 3 days
            date.setHours(9 + (i * 2), 0, 0, 0); // Diff hours

            tasks.push({
                id: `t${i}`,
                title: titles[i],
                description: `Detailed requirements for ${titles[i]}. Ensure all acceptance criteria are met.`,
                priority: priorities[i % 3],
                status: 'in-progress',
                startTime: date.toISOString(),
                endTime: new Date(date.getTime() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours later
                assignees: [MOCK_USERS[i % MOCK_USERS.length], MOCK_USERS[(i+1) % MOCK_USERS.length]],
                videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" // Sample video
            });
        }
        return tasks;
    },
    
    getMockMembers: (): User[] => MOCK_USERS
};
