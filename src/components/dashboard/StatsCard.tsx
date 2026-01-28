import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  variant?: 'default' | 'primary';
  subtitle?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'default',
  subtitle 
}: StatsCardProps) {
  const isPrimary = variant === 'primary';
  
  return (
    <Card className={`${isPrimary ? 'bg-[#2563eb] text-white border-[#2563eb]' : 'bg-white border-gray-200'} transition-all hover:shadow-lg`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${isPrimary ? 'text-white' : 'text-gray-600'}`}>
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${isPrimary ? 'bg-white/20' : 'bg-blue-100'}`}>
          <Icon className={`h-4 w-4 ${isPrimary ? 'text-white' : 'text-[#2563eb]'}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        {change && (
          <div className={`flex items-center gap-1 text-xs mt-2 ${isPrimary ? 'text-white/80' : 'text-gray-500'}`}>
            <TrendingUp className="h-3 w-3" />
            <span>{change}</span>
          </div>
        )}
        {subtitle && (
          <p className={`text-xs mt-1 ${isPrimary ? 'text-white/70' : 'text-gray-500'}`}>
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
