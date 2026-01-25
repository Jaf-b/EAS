import { MoreHorizontal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function PerformanceWidget() {
  const metrics = [
    { label: "Product Sales", value: 75, target: "$367K", color: "bg-green-500" }, // In our context: Project Completion
    { label: "Team KPI", value: 64, target: "64%", color: "bg-pink-500" }, // Safety Score
    { label: "Customer Satisfaction", value: 89, target: "89%", color: "bg-blue-500" }, // Client Satisfaction
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full">
      <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-gray-900">Performance</h3>
          <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="h-4 w-4" />
          </button>
      </div>

      <div className="space-y-8">
          {metrics.map((m, i) => (
              <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                          {/* Icon placeholder if needed */}
                          <div className="p-1.5 bg-gray-50 rounded-md">
                              <div className={`h-2 w-2 rounded-full ${m.color}`} />
                          </div>
                          <span className="text-sm font-medium text-gray-700">{m.label}</span>
                      </div>
                  </div>
                  <div className="space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Target achieved!</span>
                          <span className="font-semibold text-gray-900">{m.target}</span>
                      </div>
                      <Progress value={m.value} className="h-2" indicatorColor={m.color} />
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}
