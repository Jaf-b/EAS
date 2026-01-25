import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { MoreHorizontal, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { name: "Jan", revenue: 4000, expenses: 2400 },
  { name: "Feb", revenue: 3000, expenses: 1398 },
  { name: "Mar", revenue: 2000, expenses: 9800 },
  { name: "Apr", revenue: 2780, expenses: 3908 },
  { name: "May", revenue: 1890, expenses: 4800 },
  { name: "Jun", revenue: 2390, expenses: 3800 },
  { name: "Jul", revenue: 3490, expenses: 4300 },
  { name: "Aug", revenue: 4000, expenses: 2400 },
  { name: "Sep", revenue: 3000, expenses: 1398 },
  { name: "Oct", revenue: 7000, expenses: 6800 }, // Highlighting Oct like reference
  { name: "Nov", revenue: 2780, expenses: 3908 },
  { name: "Dec", revenue: 1890, expenses: 4800 },
];

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
         <div className="flex justify-between items-start mb-6">
            <div>
                 <h3 className="font-semibold text-gray-900 mb-1">Revenue and Expenses</h3>
                 <div className="flex gap-4 text-sm">
                     <div className="flex items-center gap-1.5">
                         <div className="h-2 w-2 rounded-full bg-pink-500" />
                         <span className="text-muted-foreground">Revenue <span className="text-gray-900 font-semibold">$3,342</span></span>
                     </div>
                      <div className="flex items-center gap-1.5">
                         <div className="h-2 w-2 rounded-full bg-blue-500" />
                         <span className="text-muted-foreground">Expenses <span className="text-gray-900 font-semibold">$3,029</span></span>
                     </div>
                 </div>
            </div>
            <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
                     <Calendar className="h-3 w-3" /> This Month
                 </Button>
                 <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-4 w-4" />
                 </button>
            </div>
         </div>

         <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={data} barGap={8}>
                     {/* <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" /> */}
                     <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#9ca3af' }} 
                        dy={10}
                     />
                     <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#9ca3af' }} 
                        tickFormatter={(value) => `$${value/1000}K`}
                     />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        cursor={{ fill: 'rgba(0,0,0,0.02)' }}
                     />
                     <Bar dataKey="revenue" fill="#ec4899" radius={[4, 4, 0, 0]} maxBarSize={12} />
                     <Bar dataKey="expenses" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={12} />
                 </BarChart>
             </ResponsiveContainer>
         </div>
    </div>
  );
}
