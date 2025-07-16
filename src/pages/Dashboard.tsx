import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  Shield, 
  Activity, 
  MapPin, 
  Bell, 
  Settings,
  Camera,
  Zap,
  Users,
  TrendingUp,
  ChevronRight
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [alerts] = useState([
    { id: 1, type: "theft", location: "Sector 7-A", time: "2 min ago", severity: "high" },
    { id: 2, type: "anomaly", location: "Grid Station 15", time: "5 min ago", severity: "medium" },
    { id: 3, type: "maintenance", location: "Tower 423", time: "15 min ago", severity: "low" },
  ]);

  const stats = [
    { label: "Active Alerts", value: "3", icon: AlertTriangle, color: "text-destructive" },
    { label: "Grid Health", value: "94%", icon: Shield, color: "text-success" },
    { label: "Sensors Online", value: "847", icon: Activity, color: "text-primary" },
    { label: "Drone Missions", value: "12", icon: Camera, color: "text-warning" },
  ];

  const quickActions = [
    { label: "Map View", icon: MapPin, route: "/map", color: "bg-primary" },
    { label: "Live Feed", icon: Camera, route: "/drone-feed", color: "bg-warning" },
    { label: "Notifications", icon: Bell, route: "/notifications", color: "bg-destructive" },
    { label: "Profile", icon: Settings, route: "/profile", color: "bg-muted-foreground" },
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "theft": return <AlertTriangle className="w-4 h-4" />;
      case "anomaly": return <Zap className="w-4 h-4" />;
      case "maintenance": return <Settings className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Header */}
      <header className="bg-card shadow-card border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">ElectroMate</h1>
              <p className="text-sm text-muted-foreground">Power Grid Monitoring</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={() => navigate("/notifications")}>
                <Bell className="w-5 h-5" />
                {alerts.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">
                    {alerts.length}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="shadow-card border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <IconComponent className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Button
                    key={index}
                    variant="glass"
                    className="h-16 flex-col"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`w-8 h-8 ${action.color} rounded-lg flex items-center justify-center mb-2`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-xs">{action.label}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Alerts</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate("/notifications")}>
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className={`w-8 h-8 ${getSeverityColor(alert.severity)} rounded-lg flex items-center justify-center`}>
                  {getAlertIcon(alert.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground capitalize">
                    {alert.type} Alert
                  </p>
                  <p className="text-xs text-muted-foreground">{alert.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                  <Badge variant="outline" className="text-xs">
                    {alert.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-success" />
                  <span className="text-sm">Grid Connection</span>
                </div>
                <Badge className="bg-success text-success-foreground">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-primary" />
                  <span className="text-sm">Drone Fleet</span>
                </div>
                <Badge variant="outline">12 Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-warning" />
                  <span className="text-sm">Field Teams</span>
                </div>
                <Badge variant="outline">8 Deployed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;