import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  FileText, 
  Camera, 
  MapPin, 
  AlertTriangle,
  Save,
  Tag
} from "lucide-react";

const FaultLogging = () => {
  const navigate = useNavigate();
  const [faultType, setFaultType] = useState("");
  const [severity, setSeverity] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const recentFaults = [
    { id: "FLT-001", type: "Power Outage", location: "Sector 7-A", severity: "critical", time: "1h ago" },
    { id: "FLT-002", type: "Voltage Drop", location: "Grid Station 15", severity: "medium", time: "3h ago" },
    { id: "FLT-003", type: "Equipment Failure", location: "Substation B", severity: "high", time: "5h ago" }
  ];

  const faultTypes = [
    "Power Outage",
    "Voltage Drop", 
    "Equipment Failure",
    "Overload",
    "Short Circuit",
    "Ground Fault",
    "Arc Fault",
    "Insulation Failure"
  ];

  const severityLevels = [
    { value: "low", label: "Low", color: "bg-muted text-muted-foreground" },
    { value: "medium", label: "Medium", color: "bg-warning text-warning-foreground" },
    { value: "high", label: "High", color: "bg-destructive text-destructive-foreground" },
    { value: "critical", label: "Critical", color: "bg-red-600 text-white" }
  ];

  const handleImageUpload = () => {
    setImages(prev => [...prev, `fault_image_${Date.now()}.jpg`]);
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
                <h1 className="text-lg font-bold text-foreground">Fault Logging</h1>
                <p className="text-sm text-muted-foreground">Log and annotate faults</p>
              </div>
            </div>
            <Button variant="electric">
              <Save className="w-4 h-4 mr-2" />
              Save Log
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Recent Faults */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Faults</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentFaults.map((fault) => (
              <div key={fault.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <div>
                  <p className="text-sm font-medium">{fault.type}</p>
                  <p className="text-xs text-muted-foreground">{fault.location}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={severityLevels.find(s => s.value === fault.severity)?.color}>
                    {fault.severity}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{fault.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* New Fault Log */}
        <Card className="shadow-elevated border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2 text-primary" />
              Log New Fault
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fault Type</label>
                <Select value={faultType} onValueChange={setFaultType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select fault type" />
                  </SelectTrigger>
                  <SelectContent>
                    {faultTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Severity</label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <div className="flex space-x-2">
                <Input placeholder="Enter location or coordinates" className="flex-1" />
                <Button variant="outline" size="icon">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                placeholder="Describe the fault in detail..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Root Cause Analysis</label>
              <Textarea
                placeholder="What caused this fault? Include analysis and findings..."
                className="min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Corrective Actions</label>
              <Textarea
                placeholder="What actions were taken or need to be taken..."
                className="min-h-[80px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Evidence & Documentation */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Camera className="w-5 h-5 mr-2 text-primary" />
              Evidence & Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleImageUpload}>
              <Camera className="w-4 h-4 mr-2" />
              Add Photo Evidence ({images.length})
            </Button>

            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {images.map((image, index) => (
                  <div key={index} className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Evidence {index + 1}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Tags</label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">electrical</Badge>
                <Badge variant="outline">equipment</Badge>
                <Badge variant="outline">urgent</Badge>
                <Button variant="ghost" size="sm">
                  <Tag className="w-3 h-3 mr-1" />
                  Add Tag
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Actions */}
        <div className="space-y-3">
          <Button variant="electric" className="w-full h-12">
            <Save className="w-4 h-4 mr-2" />
            Save Fault Log
          </Button>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline">
              Save as Draft
            </Button>
            <Button variant="warning">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Mark Critical
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaultLogging;