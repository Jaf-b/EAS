import { Project } from "@/types";
import KPICard from "./KPICard";
import RevenueChart from "./RevenueChart";
import PerformanceWidget from "./PerformanceWidget";
import DashboardTable from "./DashboardTable";


interface PDGDashboardProps {
  projects: Project[];
}

export default function PDGDashboard({ projects }: PDGDashboardProps) {
  // Use real data from projects if possible, or mock for the financial parts not yet in data model.
  // Mapped to Cemdash structure: 
  // 1. Total Revenue -> Total Budget of active projects
  // 2. Total Product Sold -> Active Projects Count
  // 3. Total Sales -> Total Expenses (Mocked)
  // 4. Total Customers -> Total Employees (Mocked or count unique members)

  // 4. Total Customers -> Total Employees (Mocked or count unique members)

  const totalBudget = projects.reduce((acc, p) => acc + (p.budget || 0), 0);
  const activeProjects = projects.filter(p => p.status === 'in-progress').length;
  
  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard 
            title="Total Revenue" 
            value={`$${totalBudget.toLocaleString()}`} 
            change="2.8%" 
            trend="up" 
        />
        <KPICard 
            title="Active Projects" 
            value={activeProjects.toString()} 
            change="2.4%" 
            trend="up"
        />
        <KPICard 
            title="Total Sales" 
            value="$217,027" 
            change="2.9%" 
            trend="down"
        />
        <KPICard 
            title="Total Employees" 
            value="7,273" 
            change="2.1%" 
            trend="up"
        />
      </div>

      {/* Chart Row */}
      <div className="grid gap-6 md:grid-cols-3 h-[400px]">
          <div className="md:col-span-2 h-full">
              <RevenueChart />
          </div>
          <div className="md:col-span-1 h-full">
              <PerformanceWidget />
          </div>
      </div>

      {/* Bottom Table */}
      <div>
          <DashboardTable projects={projects} />
      </div>
    </div>
  );
}
