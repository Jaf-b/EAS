import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts";

const data = [
  { day: 'M', value: 0, hasPattern: true },
  { day: 'T', value: 65, hasPattern: false },
  { day: 'W', value: 45, hasPattern: false },
  { day: 'T', value: 80, hasPattern: false },
  { day: 'F', value: 0, hasPattern: true },
  { day: 'S', value: 0, hasPattern: true },
  { day: 'S', value: 0, hasPattern: true },
];

export default function ProjectAnalyticsChart() {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Analytique d'Archivage de Documents</CardTitle>
        <CardDescription className="text-xs">Documents archivés par jour cette semaine</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data}>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis hide />
            <Bar 
              dataKey="value" 
              radius={[8, 8, 0, 0]}
              maxBarSize={50}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.hasPattern ? '#E5E7EB' : '#2563eb'}
                  opacity={entry.hasPattern ? 0.3 : 1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
