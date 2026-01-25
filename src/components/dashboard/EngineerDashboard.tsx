import { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from "recharts";
import { Server, Database, Activity, GitCommit } from "lucide-react";

interface EngineerDashboardProps {
  projects: Project[];
}

export default function EngineerDashboard({ projects }: EngineerDashboardProps) {
  // Mock Technical Data
  const systemHealth = [
    { time: '00:00', cpu: 20, memory: 40 },
    { time: '04:00', cpu: 15, memory: 35 },
    { time: '08:00', cpu: 45, memory: 55 },
    { time: '12:00', cpu: 80, memory: 70 },
    { time: '16:00', cpu: 65, memory: 60 },
    { time: '20:00', cpu: 30, memory: 45 },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600">
            Console Ingénieur
        </h2>

        {/* Tech KPI Cards */}
        <div className="grid gap-4 md:grid-cols-4">
            <Card className="glass-card bg-gray-900 border-gray-800 text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">System Status</CardTitle>
                    <Activity className="h-4 w-4 text-green-500 animate-pulse" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">OPERATIONAL</div>
                    <p className="text-xs text-gray-400">Uptime: 99.99%</p>
                </CardContent>
            </Card>

            <Card className="glass-card bg-gray-50 border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">DB Connection</CardTitle>
                    <Database className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{projects.length} Records</div>
                    <p className="text-xs text-muted-foreground">LocalStorage persistence</p>
                </CardContent>
            </Card>
            
            <Card className="glass-card bg-gray-50 border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                    <Server className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Mocked</div>
                    <p className="text-xs text-muted-foreground">Gemini Integration Active</p>
                </CardContent>
            </Card>

            <Card className="glass-card bg-gray-50 border-gray-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Last Deploy</CardTitle>
                    <GitCommit className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">v1.0.0</div>
                    <p className="text-xs text-muted-foreground">Production Build</p>
                </CardContent>
            </Card>
        </div>

        {/* Technical Charts */}
        <div className="grid gap-6 md:grid-cols-1">
            <Card className="glass-card">
                <CardHeader>
                    <CardTitle>System Load (24h)</CardTitle>
                    <CardDescription>CPU vs Memory Usage</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={systemHealth}>
                            <defs>
                                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorMem" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="cpu" stroke="#8884d8" fillOpacity={1} fill="url(#colorCpu)" />
                            <Area type="monotone" dataKey="memory" stroke="#82ca9d" fillOpacity={1} fill="url(#colorMem)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        {/* Project Technical Details Table */}
        <Card className="glass-card">
            <CardHeader>
                <CardTitle>Project Technical Metadata</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-100 text-gray-700 font-medium">
                            <tr>
                                <th className="p-3">UUID</th>
                                <th className="p-3">Key</th>
                                <th className="p-3">Manager Ref</th>
                                <th className="p-3">Status Code</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((p) => (
                                <tr key={p.id} className="border-t hover:bg-gray-50 font-mono text-xs">
                                    <td className="p-3 text-muted-foreground">{p.id}</td>
                                    <td className="p-3 font-semibold text-blue-600">{p.name}</td>
                                    <td className="p-3">{p.managerId.substring(0,8)}...</td>
                                    <td className="p-3">
                                        <span className="bg-gray-200 px-2 py-1 rounded">
                                            {p.status.toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
