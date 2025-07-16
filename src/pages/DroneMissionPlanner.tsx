import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Plane, 
  MapPin, 
  Clock, 
  Calendar,
  Plus,
  Play,
  Pause,
  Route,
  Target
} from "lucide-react";

const DroneMissionPlanner = () => {
  const navigate = useNavigate();
  const [missionType, setMissionType] = useState("");
  const [selectedDrone, setSelectedDrone] = useState("");

  const missions = [
    { id: 1, name: "Sector 7-A Patrol", drone: "Eagle Eye 1", status: "active", progress: 75, eta: "15 min" },
    { id: 2, name: "Grid Station Inspection", drone: "Hawk Vision", status: "planned", progress: 0, eta: "45 min" },
    { id: 3, name: "Emergency Response", drone: "Sky Guardian", status: "paused", progress: 30, eta: "Unknown" }
  ];

  const drones = [
    { id: "DRONE-001", name: "Eagle Eye 1", status: "available", battery: 87 },
    { id: "DRONE-002", name: "Hawk Vision", status: "charging", battery: 65 },
    { id: "DRONE-003", name: "Sky Guardian", status: "maintenance", battery: 15 }
  ];

  return (
    <div className="min-h-screen bg-gradient-surface">
      <header className="bg-card shadow-card border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">Mission Planner</h1>
                <p className="text-sm text-muted-foreground">Create & assign drone routes</p>
              </div>
            </div>
            <Button variant="electric">
              <Plus className="w-4 h-4 mr-2" />
              New Mission
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Active Missions */}
        <Card className="shadow-elevated border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Active Missions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {missions.map((mission) => (
              <div key={mission.id} className="p-3 rounded-lg bg-muted/30">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{mission.name}</h3>
                  <Badge className={mission.status === "active" ? "bg-success" : mission.status === "planned" ? "bg-primary" : "bg-warning"}>
                    {mission.status}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground mb-2">
                  <p>Drone: {mission.drone}</p>
                  <p>ETA: {mission.eta}</p>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: `${mission.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Create Mission */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Create New Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Mission Type</Label>
              <Select value={missionType} onValueChange={setMissionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mission type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patrol">Routine Patrol</SelectItem>
                  <SelectItem value="inspection">Detailed Inspection</SelectItem>
                  <SelectItem value="emergency">Emergency Response</SelectItem>
                  <SelectItem value="surveillance">Theft Surveillance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Assign Drone</Label>
              <Select value={selectedDrone} onValueChange={setSelectedDrone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select drone" />
                </SelectTrigger>
                <SelectContent>
                  {drones.map((drone) => (
                    <SelectItem key={drone.id} value={drone.id} disabled={drone.status !== "available"}>
                      {drone.name} - {drone.status} ({drone.battery}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Start Time</Label>
                <Input type="time" />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button variant="electric" className="w-full">
              <Route className="w-4 h-4 mr-2" />
              Plan Route
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DroneMissionPlanner;