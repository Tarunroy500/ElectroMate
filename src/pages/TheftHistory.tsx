import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  History, 
  MapPin, 
  Calendar, 
  Filter,
  Search,
  AlertTriangle,
  Clock,
  TrendingUp
} from "lucide-react";

const TheftHistory = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState("30d");
  const [locationFilter, setLocationFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const theftIncidents = [
    { 
      id: "TH-001", 
      location: "Sector 7-A", 
      date: "2024-01-15", 
      time: "14:30", 
      severity: "high", 
      status: "resolved", 
      description: "Unauthorized wire tampering detected",
      estimatedLoss: "$2,400"
    },
    { 
      id: "TH-002", 
      location: "Zone C-12", 
      date: "2024-01-12", 
      time: "22:15", 
      severity: "critical", 
      status: "investigating", 
      description: "Power cable theft attempt",
      estimatedLoss: "$5,600"
    },
    { 
      id: "TH-003", 
      location: "Grid Station 15", 
      date: "2024-01-10", 
      time: "03:45", 
      severity: "medium", 
      status: "resolved", 
      description: "Meter bypass detected",
      estimatedLoss: "$800"
    },
    { 
      id: "TH-004", 
      location: "Substation B", 
      date: "2024-01-08", 
      time: "19:20", 
      severity: "high", 
      status: "pending", 
      description: "Transformer oil theft",
      estimatedLoss: "$3,200"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "bg-red-600 text-white";
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "bg-success text-success-foreground";
      case "investigating": return "bg-warning text-warning-foreground";
      case "pending": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const stats = {
    total: theftIncidents.length,
    resolved: theftIncidents.filter(i => i.status === "resolved").length,
    investigating: theftIncidents.filter(i => i.status === "investigating").length,
    totalLoss: theftIncidents.reduce((sum, i) => sum + parseFloat(i.estimatedLoss.replace("$", "").replace(",", "")), 0)
  };

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
                <h1 className="text-lg font-bold text-foreground">Theft History</h1>
                <p className="text-sm text-muted-foreground">Historical incident data</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-2xl font-bold text-destructive">{stats.total}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Incidents</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-0">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center space-x-2 mb-1">
                <TrendingUp className="w-5 h-5 text-warning" />
                <span className="text-2xl font-bold text-warning">${stats.totalLoss.toLocaleString()}</span>
              </div>
              <p className="text-sm text-muted-foreground">Estimated Loss</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="shadow-card border-0">
          <CardContent className="p-4 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search incidents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Select value={timeFilter} onValueChange={setTimeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 3 months</SelectItem>
                  <SelectItem value="1y">Last year</SelectItem>
                </SelectContent>
              </Select>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="sector-7a">Sector 7-A</SelectItem>
                  <SelectItem value="zone-c12">Zone C-12</SelectItem>
                  <SelectItem value="grid-15">Grid Station 15</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Incident List */}
        <div className="space-y-3">
          {theftIncidents.map((incident) => (
            <Card key={incident.id} className="shadow-card border-0 hover:shadow-elevated transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-foreground">{incident.id}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {incident.location}
                    </p>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {incident.severity}
                    </Badge>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status}
                    </Badge>
                  </div>
                </div>
                
                <p className="text-sm mb-3">{incident.description}</p>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {incident.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    {incident.time}
                  </div>
                  <div className="text-right font-medium text-destructive">
                    {incident.estimatedLoss}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TheftHistory;