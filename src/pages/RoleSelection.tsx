import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, MapPin, Plane } from "lucide-react";

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: "admin",
      title: "Admin",
      description: "Full system access and management",
      icon: Settings,
      features: ["System Configuration", "User Management", "Analytics Dashboard", "Report Generation"],
      color: "bg-gradient-electric",
      route: "/dashboard"
    },
    {
      id: "field-officer",
      title: "Field Officer",
      description: "Ground-based inspection and reporting",
      icon: MapPin,
      features: ["Manual Inspections", "Incident Reporting", "QR Code Scanning", "Offline Mode"],
      color: "bg-gradient-to-br from-success to-emerald-600",
      route: "/dashboard"
    },
    {
      id: "drone-operator",
      title: "Drone Operator",
      description: "Aerial surveillance and monitoring",
      icon: Plane,
      features: ["Drone Control", "Live Feed Monitoring", "Mission Planning", "Flight Logs"],
      color: "bg-gradient-to-br from-warning to-orange-600",
      route: "/dashboard"
    }
  ];

  const handleRoleSelect = (route: string) => {
    // Store selected role in localStorage or context
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-surface p-4">
      <div className="max-w-md mx-auto space-y-6 pt-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Select Your Role</h1>
          <p className="text-muted-foreground">Choose your access level and responsibilities</p>
        </div>

        {/* Role Cards */}
        <div className="space-y-4">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <Card 
                key={role.id} 
                className="shadow-elevated border-0 hover:shadow-elevated hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
                onClick={() => handleRoleSelect(role.route)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 ${role.color} rounded-xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {role.title}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {role.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Key Features:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {role.features.map((feature, index) => (
                        <div key={index} className="text-xs text-muted-foreground flex items-center">
                          <div className="w-1 h-1 bg-primary rounded-full mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Continue Button */}
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;