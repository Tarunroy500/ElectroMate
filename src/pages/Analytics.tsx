import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  RefreshCw,
  AlertTriangle,
  Zap,
  Activity,
  Target
} from "lucide-react";

const Analytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedMetric, setSelectedMetric] = useState("theft");

  const timeRanges = [
    { value: "24h", label: "Last 24 Hours" },
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 3 Months" }
  ];

  const metrics = {
    theft: {
      title: "Theft Detection",
      icon: AlertTriangle,
      color: "text-destructive",
      total: 23,
      change: "+12%",
      trend: "up"
    },
    anomaly: {
      title: "Power Anomalies", 
      icon: Zap,
      color: "text-warning",
      total: 156,
      change: "-8%",
      trend: "down"
    },
    efficiency: {
      title: "Grid Efficiency",
      icon: Activity,
      color: "text-success",
      total: "94.2%",
      change: "+2.1%",
      trend: "up"
    },
    uptime: {
      title: "System Uptime",
      icon: Target,
      color: "text-primary",
      total: "99.7%",
      change: "+0.3%",
      trend: "up"
    }
  };

  const recentAlerts = [
    { type: "theft", location: "Sector 7-A", severity: "high", time: "2h ago" },
    { type: "anomaly", location: "Grid Station 15", severity: "medium", time: "4h ago" },
    { type: "maintenance", location: "Tower 423", severity: "low", time: "6h ago" },
    { type: "theft", location: "Zone C-12", severity: "high", time: "8h ago" }
  ];

  const topLocations = [
    { location: "Sector 7-A", incidents: 12, trend: "up" },
    { location: "Zone C-12", incidents: 8, trend: "down" },
    { location: "Grid Station 15", incidents: 6, trend: "stable" },
    { location: "Substation B", incidents: 4, trend: "up" }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "📈";
      case "down": return "📉";
      case "stable": return "➡️";
      default: return "📊";
    }
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
                <h1 className="text-lg font-bold text-foreground">Analytics</h1>
                <p className="text-sm text-muted-foreground">Grid performance insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Download className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Time Range Selector */}
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Time Range:</span>
              </div>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(metrics).map(([key, metric]) => {
            const IconComponent = metric.icon;
            return (
              <Card key={key} className="shadow-card border-0">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                    <Badge variant={metric.trend === "up" ? "default" : "secondary"}>
                      {metric.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{metric.total}</p>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Chart Placeholder */}
        <Card className="shadow-elevated border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" />
              Trend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-gradient-to-br from-muted/20 to-muted/40 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <PieChart className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Chart</p>
                <p className="text-xs text-muted-foreground">Showing {timeRange} data</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Analytics */}
        <Tabs defaultValue="alerts" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="alerts">Recent Alerts</TabsTrigger>
            <TabsTrigger value="locations">Top Locations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="alerts" className="mt-4">
            <Card className="shadow-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Alert Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 ${getSeverityColor(alert.severity)} rounded-lg flex items-center justify-center`}>
                        {alert.type === "theft" && <AlertTriangle className="w-4 h-4" />}
                        {alert.type === "anomaly" && <Zap className="w-4 h-4" />}
                        {alert.type === "maintenance" && <Activity className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium capitalize">{alert.type}</p>
                        <p className="text-xs text-muted-foreground">{alert.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getSeverityColor(alert.severity)}>
                        {alert.severity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations" className="mt-4">
            <Card className="shadow-card border-0">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Incident Hotspots</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topLocations.map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">{location.location}</p>
                        <p className="text-xs text-muted-foreground">{location.incidents} incidents</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg">{getTrendIcon(location.trend)}</span>
                      <p className="text-xs text-muted-foreground capitalize">{location.trend}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Export Options */}
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">Export Report</h3>
                <p className="text-sm text-muted-foreground">Download analytics data</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  PDF
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;