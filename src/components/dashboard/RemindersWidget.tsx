import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export default function RemindersWidget() {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Reminders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pb-3">
        <div>
          <h3 className="font-semibold text-sm mb-0.5">Archive Q1 Project Documents</h3>
          <p className="text-xs text-gray-500">Deadline: Today, 04:00 PM</p>
        </div>
        <Button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white h-8 text-xs">
          <Video className="h-3.5 w-3.5 mr-1.5" />
          Start Archiving
        </Button>
      </CardContent>
    </Card>
  );
}
