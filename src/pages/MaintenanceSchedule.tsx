import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Wrench, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Filter
} from "lucide-react";

const MaintenanceSchedule = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  const maintenanceItems = [
    {
      id: "MNT-001",
      title: "Transformer Oil Change",
      location: "Substation A",
      scheduled: "2024-01-20",
      time: "09:00",
      priority: "high",
      status: "scheduled",
      team: "Team Alpha",
      duration: "4 hours"
    },
    {
      id: "MNT-002", 
      title: "Cable Inspection",
      location: "Sector 7-A",
      scheduled: "2024-01-22",
      time: "14:00",
      priority: "medium",
      status: "scheduled", 
      team: "Team Beta",
      duration: "6 hours"
    },
    {
      id: "MNT-003",
      title: "Sensor Calibration",
      location: "Grid Station 15",
      scheduled: "2024-01-18",
      time: "10:30",
      priority: "low",
      status: "completed",
      team: "Team Gamma",
      duration: "2 hours"
    },
    {
      id: "MNT-004",
      title: "Emergency Repair",
      location: "Tower 423",
      scheduled: "2024-01-16",
      time: "08:00",
      priority: "critical",
      status: "in-progress",
      team: "Emergency Team",
      duration: "8 hours"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success text-success-foreground";
      case "in-progress": return "bg-primary text-primary-foreground";
      case "scheduled": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="w-4 h-4" />;
      case "in-progress": return <Clock className="w-4 h-4" />;
      case "scheduled": return <Calendar className="w-4 h-4" />;
      default: return <Wrench className="w-4 h-4" />;
    }
  };

  const filterItems = (filter: string) => {
    switch (filter) {
      case "upcoming": return maintenanceItems.filter(item => item.status === "scheduled");
      case "active": return maintenanceItems.filter(item => item.status === "in-progress");
      case "completed": return maintenanceItems.filter(item => item.status === "completed");
      default: return maintenanceItems;
    }
  };

  const filteredItems = filterItems(activeTab);

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
                <h1 className="text-lg font-bold text-foreground">Maintenance</h1>
                <p className="text-sm text-muted-foreground">Scheduled maintenance tasks</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="electric" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Schedule
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-card border-0">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-warning">
                {maintenanceItems.filter(i => i.status === "scheduled").length}
              </div>
              <p className="text-xs text-muted-foreground">Upcoming</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-primary">
                {maintenanceItems.filter(i => i.status === "in-progress").length}
              </div>
              <p className="text-xs text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-success">
                {maintenanceItems.filter(i => i.status === "completed").length}
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Maintenance Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Done</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <Card key={item.id} className="shadow-card border-0 hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-foreground">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.location}</p>
                        <p className="text-xs text-muted-foreground">{item.id}</p>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <Badge className={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                        <Badge className={getStatusColor(item.status)}>
                          <span className="flex items-center space-x-1">
                            {getStatusIcon(item.status)}
                            <span>{item.status}</span>
                          </span>
                        </Badge>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Scheduled:</p>
                        <p className="font-medium">{item.scheduled} at {item.time}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration:</p>
                        <p className="font-medium">{item.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Assigned Team:</p>
                        <p className="font-medium">{item.team}</p>
                      </div>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Emergency Repair
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Inspection
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MaintenanceSchedule;