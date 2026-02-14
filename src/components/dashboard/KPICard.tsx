import { ArrowUpRight, ArrowDownRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon?: React.ReactNode;
}

export default function KPICard({ title, value, change, trend }: KPICardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-[140px] hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <div>
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
        <div className="flex items-center gap-2">
           <span className={cn(
               "text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1",
               trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
           )}>
               {trend === "up" ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
               {change}
           </span>
           <span className="text-xs text-muted-foreground">Par rapport à la semaine dernière</span>
        </div>
      </div>
    </div>
  );
}
