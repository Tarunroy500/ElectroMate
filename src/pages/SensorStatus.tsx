import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Activity, 
  AlertCircle, 
  CheckCircle, 
  Search,
  Filter,
  RefreshCw,
  TrendingUp,
  Battery,
  Signal,
  MapPin,
  Clock
} from "lucide-react";

const SensorStatus = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const sensors = [
    {
      id: "PWR-001",
      name: "Main Grid Sensor Alpha",
      location: "Sector 7-A",
      status: "online",
      battery: 92,
      signal: 95,
      lastUpdate: "2 min ago",
      type: "power",
      alerts: 0
    },
    {
      id: "PWR-002", 
      name: "Substation Monitor B",
      location: "Grid Station 15",
      status: "warning",
      battery: 78,
      signal: 88,
      lastUpdate: "5 min ago",
      type: "voltage",
      alerts: 1
    },
    {
      id: "PWR-003",
      name: "Line Sensor Gamma",
      location: "Tower 423",
      status: "offline",
      battery: 15,
      signal: 0,
      lastUpdate: "2 hours ago",
      type: "current",
      alerts: 3
    },
    {
      id: "PWR-004",
      name: "Distribution Point Delta",
      location: "Substation C",
      status: "online",
      battery: 85,
      signal: 92,
      lastUpdate: "1 min ago",
      type: "power",
      alerts: 0
    },
    {
      id: "PWR-005",
      name: "Transformer Monitor Echo",
      location: "Zone C-12",
      status: "maintenance",
      battery: 0,
      signal: 0,
      lastUpdate: "6 hours ago",
      type: "temperature",
      alerts: 0
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-success text-success-foreground";
      case "warning": return "bg-warning text-warning-foreground";
      case "offline": return "bg-destructive text-destructive-foreground";
      case "maintenance": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <AlertCircle className="w-4 h-4" />;
      case "offline": return <AlertCircle className="w-4 h-4" />;
      case "maintenance": return <RefreshCw className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-success";
    if (level > 20) return "text-warning";
    return "text-destructive";
  };

  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         sensor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "all" || sensor.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: sensors.length,
    online: sensors.filter(s => s.status === "online").length,
    warning: sensors.filter(s => s.status === "warning").length,
    offline: sensors.filter(s => s.status === "offline").length,
    maintenance: sensors.filter(s => s.status === "maintenance").length
  };

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
                <h1 className="text-lg font-bold text-foreground">Sensor Status</h1>
                <p className="text-sm text-muted-foreground">Monitor grid sensor health</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <RefreshCw className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sensors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-2xl font-bold text-success">{statusCounts.online}</span>
              </div>
              <p className="text-sm text-muted-foreground">Online</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <AlertCircle className="w-5 h-5 text-destructive" />
                <span className="text-2xl font-bold text-destructive">{statusCounts.offline}</span>
              </div>
              <p className="text-sm text-muted-foreground">Issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="online">Online</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="offline">Offline</TabsTrigger>
            <TabsTrigger value="maintenance">Maint</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedStatus} className="mt-4">
            <div className="space-y-3">
              {filteredSensors.map((sensor) => (
                <Card key={sensor.id} className="shadow-card border-0 hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 ${getStatusColor(sensor.status)} rounded-xl flex items-center justify-center`}>
                          {getStatusIcon(sensor.status)}
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">{sensor.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {sensor.location}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(sensor.status)}>
                        {sensor.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-xs">
                      <div className="text-center">
                        <Battery className={`w-4 h-4 mx-auto mb-1 ${getBatteryColor(sensor.battery)}`} />
                        <p className="font-medium">{sensor.battery}%</p>
                        <p className="text-muted-foreground">Battery</p>
                      </div>
                      <div className="text-center">
                        <Signal className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="font-medium">{sensor.signal}%</p>
                        <p className="text-muted-foreground">Signal</p>
                      </div>
                      <div className="text-center">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1 text-warning" />
                        <p className="font-medium">{sensor.type}</p>
                        <p className="text-muted-foreground">Type</p>
                      </div>
                      <div className="text-center">
                        <Clock className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="font-medium">{sensor.lastUpdate}</p>
                        <p className="text-muted-foreground">Updated</p>
                      </div>
                    </div>

                    {sensor.alerts > 0 && (
                      <div className="mt-3 p-2 bg-destructive/10 rounded-lg">
                        <p className="text-xs text-destructive font-medium">
                          {sensor.alerts} active alert{sensor.alerts > 1 ? 's' : ''}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SensorStatus;