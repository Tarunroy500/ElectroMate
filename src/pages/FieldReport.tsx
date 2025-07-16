import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  FileText, 
  Camera, 
  MapPin, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Upload,
  Mic,
  QrCode
} from "lucide-react";

const FieldReport = () => {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState("");
  const [priority, setPriority] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const reportTypes = [
    { value: "theft", label: "Power Theft" },
    { value: "damage", label: "Equipment Damage" },
    { value: "maintenance", label: "Maintenance Required" },
    { value: "anomaly", label: "Anomaly Detection" },
    { value: "safety", label: "Safety Concern" },
    { value: "other", label: "Other" }
  ];

  const priorities = [
    { value: "low", label: "Low Priority", color: "bg-muted text-muted-foreground" },
    { value: "medium", label: "Medium Priority", color: "bg-warning text-warning-foreground" },
    { value: "high", label: "High Priority", color: "bg-destructive text-destructive-foreground" },
    { value: "critical", label: "Critical", color: "bg-red-600 text-white" }
  ];

  const handleImageUpload = () => {
    // Simulate image upload
    const newImage = `image_${Date.now()}.jpg`;
    setImages([...images, newImage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Report submitted");
    navigate("/dashboard");
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
                <h1 className="text-lg font-bold text-foreground">Field Report</h1>
                <p className="text-sm text-muted-foreground">Submit incident report</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <QrCode className="w-4 h-4 mr-2" />
              Scan ID
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Report Type */}
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Report Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="report-type">Report Type</Label>
                <Select value={reportType} onValueChange={setReportType} required>
                  <SelectTrigger id="report-type" className="h-11">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={priority} onValueChange={setPriority} required>
                  <SelectTrigger id="priority" className="h-11">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((p) => (
                      <SelectItem key={p.value} value={p.value}>
                        <div className="flex items-center space-x-2">
                          <span>{p.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the incident"
                  className="h-11"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-primary" />
                Location
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude</Label>
                  <Input
                    id="latitude"
                    placeholder="12.9716"
                    className="h-11"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude</Label>
                  <Input
                    id="longitude"
                    placeholder="77.5946"
                    className="h-11"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address/Landmark</Label>
                <Input
                  id="address"
                  placeholder="Nearest landmark or address"
                  className="h-11"
                />
              </div>

              <Button type="button" variant="outline" className="w-full">
                <MapPin className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed information about the incident..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsRecording(!isRecording)}
                >
                  <Mic className="w-4 h-4 mr-2" />
                  {isRecording ? "Stop Recording" : "Record Audio"}
                </Button>
                {isRecording && (
                  <Badge className="bg-destructive text-destructive-foreground animate-pulse">
                    Recording...
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="shadow-card border-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Camera className="w-5 h-5 mr-2 text-primary" />
                Evidence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                type="button"
                variant="outline"
                className="w-full h-12"
                onClick={handleImageUpload}
              >
                <Camera className="w-4 h-4 mr-2" />
                Take Photo / Upload Image
              </Button>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xs text-muted-foreground">Image {index + 1}</span>
                    </div>
                  ))}
                </div>
              )}

              <Button type="button" variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Documents
              </Button>
            </CardContent>
          </Card>

          {/* Summary */}
          {reportType && priority && (
            <Card className="shadow-elevated border-0 bg-accent/30">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground">Report Summary</h3>
                  <Badge className={priorities.find(p => p.value === priority)?.color}>
                    {priorities.find(p => p.value === priority)?.label}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Type:</span> {reportTypes.find(t => t.value === reportType)?.label}</p>
                  <p><span className="text-muted-foreground">Time:</span> {new Date().toLocaleString()}</p>
                  <p><span className="text-muted-foreground">Photos:</span> {images.length} attached</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit */}
          <div className="space-y-3">
            <Button type="submit" variant="electric" className="w-full h-12">
              <CheckCircle className="w-4 h-4 mr-2" />
              Submit Report
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate("/dashboard")}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldReport;