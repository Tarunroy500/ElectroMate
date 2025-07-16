import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  CheckSquare, 
  Camera, 
  MapPin, 
  Clock,
  AlertTriangle,
  CheckCircle,
  Save
} from "lucide-react";

const FieldInspection = () => {
  const navigate = useNavigate();
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, item: "Visual inspection of power lines", completed: false, required: true },
    { id: 2, item: "Check for wire damage or tampering", completed: false, required: true },
    { id: 3, item: "Inspect pole/tower structural integrity", completed: false, required: true },
    { id: 4, item: "Verify meter readings", completed: false, required: true },
    { id: 5, item: "Check ground connections", completed: false, required: false },
    { id: 6, item: "Inspect transformer condition", completed: false, required: false },
    { id: 7, item: "Document surrounding area", completed: false, required: true },
    { id: 8, item: "Test emergency shutdown procedures", completed: false, required: false }
  ]);
  
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);

  const toggleItem = (id: number) => {
    setChecklistItems(items => 
      items.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedCount = checklistItems.filter(item => item.completed).length;
  const requiredCount = checklistItems.filter(item => item.required).length;
  const completedRequired = checklistItems.filter(item => item.required && item.completed).length;
  const progress = (completedCount / checklistItems.length) * 100;

  const addPhoto = () => {
    setPhotos(prev => [...prev, `photo_${Date.now()}.jpg`]);
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
                <h1 className="text-lg font-bold text-foreground">Field Inspection</h1>
                <p className="text-sm text-muted-foreground">Inspection checklist</p>
              </div>
            </div>
            <Button variant="electric" disabled={completedRequired < requiredCount}>
              <Save className="w-4 h-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Progress Overview */}
        <Card className="shadow-elevated border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Inspection Progress</h3>
              <Badge className={completedRequired === requiredCount ? "bg-success" : "bg-warning"}>
                {completedCount}/{checklistItems.length} completed
              </Badge>
            </div>
            <div className="w-full bg-muted rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-electric h-3 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Required: {completedRequired}/{requiredCount}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
          </CardContent>
        </Card>

        {/* Location Info */}
        <Card className="shadow-card border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-primary" />
                <div>
                  <p className="font-medium">Tower 423 - Sector 7-A</p>
                  <p className="text-sm text-muted-foreground">Started: {new Date().toLocaleTimeString()}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                QR Scan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <CheckSquare className="w-5 h-5 mr-2 text-primary" />
              Inspection Checklist
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => toggleItem(item.id)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <p className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {item.item}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.required && (
                      <Badge variant="outline" className="text-xs">Required</Badge>
                    )}
                    {item.completed && (
                      <CheckCircle className="w-3 h-3 text-success" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Photos */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Camera className="w-5 h-5 mr-2 text-primary" />
              Documentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={addPhoto}>
              <Camera className="w-4 h-4 mr-2" />
              Take Photo ({photos.length})
            </Button>
            
            {photos.length > 0 && (
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">Photo {index + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notes */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Additional Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Add any additional observations or concerns..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Issues Found */}
        {checklistItems.some(item => !item.completed && item.required) && (
          <Card className="shadow-card border-0 border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <h3 className="font-medium text-destructive">Issues Detected</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Complete all required items before submitting the inspection report.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FieldInspection;