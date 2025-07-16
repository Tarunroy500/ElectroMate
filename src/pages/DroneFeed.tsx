import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Camera, 
  Play, 
  Pause, 
  Square, 
  RotateCcw,
  Maximize,
  Volume2,
  VolumeX,
  Circle,
  MapPin,
  Battery,
  Signal
} from "lucide-react";

const DroneFeed = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState("DRONE-001");

  const drones = [
    { 
      id: "DRONE-001", 
      name: "Eagle Eye 1", 
      status: "active", 
      battery: 87, 
      signal: 95, 
      location: "Sector 7-A",
      altitude: "150m"
    },
    { 
      id: "DRONE-002", 
      name: "Hawk Vision", 
      status: "patrol", 
      battery: 65, 
      signal: 88, 
      location: "Grid Station 15",
      altitude: "120m"
    },
    { 
      id: "DRONE-003", 
      name: "Sky Guardian", 
      status: "charging", 
      battery: 15, 
      signal: 0, 
      location: "Base Station",
      altitude: "0m"
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success text-success-foreground";
      case "patrol": return "bg-primary text-primary-foreground";
      case "charging": return "bg-warning text-warning-foreground";
      case "offline": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-success";
    if (level > 20) return "text-warning";
    return "text-destructive";
  };

  const activeDrone = drones.find(d => d.id === selectedDrone);

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Live Feed</h1>
                <p className="text-sm text-muted-foreground">Real-time drone surveillance</p>
              </div>
            </div>
            <Badge className="bg-destructive text-destructive-foreground animate-pulse">
              LIVE
            </Badge>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Video Feed */}
        <Card className="shadow-elevated border-0">
          <CardContent className="p-0">
            <div className="relative h-64 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg overflow-hidden">
              {/* Mock video feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto" />
                  <p className="text-sm text-muted-foreground">Live Feed - {activeDrone?.name}</p>
                  <p className="text-xs text-muted-foreground">{activeDrone?.location}</p>
                </div>
              </div>
              
              {/* Recording indicator */}
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <div className="w-3 h-3 bg-destructive rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white bg-black/50 px-2 py-1 rounded">REC</span>
                </div>
              )}
              
              {/* Feed info overlay */}
              <div className="absolute top-4 right-4 bg-black/70 text-white p-2 rounded text-xs space-y-1">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{activeDrone?.location}</span>
                </div>
                <div>Alt: {activeDrone?.altitude}</div>
                <div>Time: {new Date().toLocaleTimeString()}</div>
              </div>
              
              {/* Controls overlay */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                <Button variant="glass" size="icon" className="shadow-lg">
                  <Play className="w-4 h-4" />
                </Button>
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="shadow-lg"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Circle className={`w-4 h-4 ${isRecording ? 'text-destructive' : ''}`} />
                </Button>
                <Button variant="glass" size="icon" className="shadow-lg">
                  <Square className="w-4 h-4" />
                </Button>
                <Button 
                  variant="glass" 
                  size="icon" 
                  className="shadow-lg"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
                <Button variant="glass" size="icon" className="shadow-lg">
                  <Maximize className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drone Selection */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Available Drones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {drones.map((drone) => (
              <div
                key={drone.id}
                className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedDrone === drone.id 
                    ? 'border-primary bg-accent' 
                    : 'border-transparent bg-muted/30 hover:border-muted'
                }`}
                onClick={() => setSelectedDrone(drone.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <div>
                      <h4 className="font-medium text-foreground">{drone.name}</h4>
                      <p className="text-xs text-muted-foreground">{drone.id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(drone.status)}>
                    {drone.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Battery className={`w-3 h-3 ${getBatteryColor(drone.battery)}`} />
                    <span>{drone.battery}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Signal className="w-3 h-3 text-primary" />
                    <span>{drone.signal}%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3 text-muted-foreground" />
                    <span className="truncate">{drone.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button variant="electric" className="h-12">
            <Camera className="w-4 h-4 mr-2" />
            Take Screenshot
          </Button>
          <Button variant="outline" className="h-12">
            <RotateCcw className="w-4 h-4 mr-2" />
            Return to Base
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DroneFeed;