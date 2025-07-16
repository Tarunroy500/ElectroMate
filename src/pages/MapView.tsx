import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MapPin, 
  AlertTriangle, 
  Camera, 
  Filter,
  Plus,
  Search,
  Zap,
  Settings
} from "lucide-react";

const MapView = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  
  const incidents = [
    { id: 1, type: "theft", lat: "12.5", lng: "77.6", severity: "high", status: "active", location: "Sector 7-A" },
    { id: 2, type: "anomaly", lat: "12.6", lng: "77.7", severity: "medium", status: "investigating", location: "Grid Station 15" },
    { id: 3, type: "maintenance", lat: "12.4", lng: "77.5", severity: "low", status: "scheduled", location: "Tower 423" },
    { id: 4, type: "theft", lat: "12.7", lng: "77.8", severity: "high", status: "resolved", location: "Substation B" },
  ];

  const filters = [
    { id: "all", label: "All", count: incidents.length },
    { id: "theft", label: "Theft", count: incidents.filter(i => i.type === "theft").length },
    { id: "anomaly", label: "Anomaly", count: incidents.filter(i => i.type === "anomaly").length },
    { id: "maintenance", label: "Maintenance", count: incidents.filter(i => i.type === "maintenance").length },
  ];

  const getIncidentColor = (type: string, severity: string) => {
    if (type === "theft") return severity === "high" ? "bg-destructive" : "bg-red-400";
    if (type === "anomaly") return severity === "high" ? "bg-warning" : "bg-yellow-400";
    if (type === "maintenance") return "bg-primary";
    return "bg-muted-foreground";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-destructive text-destructive-foreground";
      case "investigating": return "bg-warning text-warning-foreground";
      case "resolved": return "bg-success text-success-foreground";
      case "scheduled": return "bg-primary text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filteredIncidents = selectedFilter === "all" 
    ? incidents 
    : incidents.filter(incident => incident.type === selectedFilter);

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
                <h1 className="text-lg font-bold text-foreground">Grid Map</h1>
                <p className="text-sm text-muted-foreground">Real-time incident tracking</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "electric" : "outline"}
              size="sm"
              className="flex-shrink-0"
              onClick={() => setSelectedFilter(filter.id)}
            >
              {filter.label}
              <Badge 
                variant="secondary" 
                className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
              >
                {filter.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Map Placeholder */}
        <Card className="shadow-elevated border-0">
          <CardContent className="p-0">
            <div className="h-80 bg-gradient-to-br from-muted/30 to-muted/60 relative rounded-lg overflow-hidden">
              {/* Mock map grid */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Incident pins */}
              {filteredIncidents.map((incident, index) => (
                <div
                  key={incident.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${30 + index * 15}%`,
                  }}
                >
                  <div className={`w-6 h-6 ${getIncidentColor(incident.type, incident.severity)} rounded-full shadow-lg flex items-center justify-center animate-pulse-electric`}>
                    {incident.type === "theft" && <AlertTriangle className="w-3 h-3 text-white" />}
                    {incident.type === "anomaly" && <Zap className="w-3 h-3 text-white" />}
                    {incident.type === "maintenance" && <Settings className="w-3 h-3 text-white" />}
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-card border shadow-elevated rounded-lg p-2 text-xs whitespace-nowrap z-10">
                    <p className="font-medium">{incident.location}</p>
                    <p className="text-muted-foreground capitalize">{incident.type} - {incident.severity}</p>
                  </div>
                </div>
              ))}
              
              {/* Map controls */}
              <div className="absolute top-4 right-4 space-y-2">
                <Button variant="glass" size="icon" className="shadow-lg">
                  <Plus className="w-4 h-4" />
                </Button>
                <Button variant="glass" size="icon" className="shadow-lg">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Incident List */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">
            {selectedFilter === "all" ? "All Incidents" : `${selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)} Incidents`}
          </h3>
          
          {filteredIncidents.map((incident) => (
            <Card key={incident.id} className="shadow-card border-0 hover:shadow-elevated transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getIncidentColor(incident.type, incident.severity)} rounded-xl flex items-center justify-center`}>
                    {incident.type === "theft" && <AlertTriangle className="w-5 h-5 text-white" />}
                    {incident.type === "anomaly" && <Zap className="w-5 h-5 text-white" />}
                    {incident.type === "maintenance" && <Settings className="w-5 h-5 text-white" />}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-foreground capitalize">
                        {incident.type} Alert
                      </h4>
                      <Badge className={getStatusColor(incident.status)}>
                        {incident.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {incident.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Coordinates: {incident.lat}, {incident.lng}
                    </p>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;