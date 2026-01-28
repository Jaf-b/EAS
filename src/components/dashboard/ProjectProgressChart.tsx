import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: 'Completed', value: 41, color: '#2563eb' },
  { name: 'In Progress', value: 35, color: '#93c5fd' },
  { name: 'Pending', value: 24, color: '#dbeafe' },
];

export default function ProjectProgressChart() {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Document Archival Progress</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-3">
        <div className="relative w-full h-36">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">41%</div>
              <div className="text-xs text-gray-500">Docs Archived</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#2563eb]"></div>
            <span className="text-gray-600">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#93c5fd]"></div>
            <span className="text-gray-600">In Progress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#dbeafe]"></div>
            <span className="text-gray-600">Pending</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
