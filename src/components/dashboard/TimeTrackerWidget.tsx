import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Square } from "lucide-react";
import { useState, useEffect } from "react";

export default function TimeTrackerWidget() {
  const [time, setTime] = useState(5048); // seconds (01:24:08)
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <Card className="bg-[#2563eb] border-[#2563eb] text-white overflow-hidden relative">
      {/* Wave pattern background */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path 
            fill="#ffffff" 
            d="M45.7,-78.4C59.9,-70.8,72.8,-60.1,80.9,-46.2C89,-32.3,92.3,-15.1,91.1,1.5C89.9,18.1,84.2,34.1,75.3,47.8C66.4,61.5,54.3,72.9,40.2,79.8C26.1,86.7,10,89.1,-5.3,87.4C-20.6,85.7,-35.1,80,-48.3,71.8C-61.5,63.6,-73.4,52.9,-81.2,39.4C-89,25.9,-92.7,9.6,-91.5,-6.3C-90.3,-22.2,-84.2,-37.7,-74.8,-50.4C-65.4,-63.1,-52.7,-73,-38.5,-79.8C-24.3,-86.6,-8.6,-90.3,5.3,-88.2C19.2,-86.1,31.5,-86,45.7,-78.4Z" 
            transform="translate(100 100)" 
          />
        </svg>
      </div>
      
      <CardHeader className="relative z-10 pb-2">
        <CardTitle className="text-sm font-semibold text-white">Minuteur de Travail d'Archivage</CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 pb-3">
        <div className="text-3xl font-bold text-center mb-3 tracking-wider">
          {formatTime(time)}
        </div>
        <div className="flex items-center justify-center gap-3">
          <Button 
            size="icon"
            variant="secondary"
            className="rounded-full bg-white/20 hover:bg-white/30 text-white border-0"
            onClick={() => setIsRunning(!isRunning)}
          >
            <Pause className="h-5 w-5" fill="white" />
          </Button>
          <Button 
            size="icon"
            variant="destructive"
            className="rounded-full bg-red-500 hover:bg-red-600 text-white border-0"
            onClick={() => {
              setIsRunning(false);
              setTime(0);
            }}
          >
            <Square className="h-4 w-4" fill="white" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
