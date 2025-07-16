import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  User, 
  Shield, 
  Bell, 
  Moon, 
  Sun,
  Smartphone,
  LogOut,
  Settings,
  Edit,
  Camera
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const userInfo = {
    name: "John Martinez",
    email: "john.martinez@gridguardian.com",
    role: "Field Officer",
    id: "FO-2024-0157",
    department: "Grid Surveillance",
    joinDate: "March 2024",
    avatar: "JM"
  };

  const permissions = [
    { name: "View Live Feeds", granted: true },
    { name: "File Reports", granted: true },
    { name: "Access Map View", granted: true },
    { name: "Admin Panel", granted: false },
    { name: "Drone Control", granted: false },
    { name: "System Config", granted: false },
  ];

  const recentActivity = [
    { action: "Completed inspection", location: "Tower 423", time: "2 hours ago" },
    { action: "Filed theft report", location: "Sector 7-A", time: "5 hours ago" },
    { action: "Scanned QR code", location: "Pole GS-8847", time: "1 day ago" },
  ];

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
                <h1 className="text-lg font-bold text-foreground">Profile</h1>
                <p className="text-sm text-muted-foreground">Account settings and preferences</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsEditing(!isEditing)}>
              <Edit className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* User Info */}
        <Card className="shadow-elevated border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-electric rounded-2xl flex items-center justify-center shadow-electric">
                  <span className="text-2xl font-bold text-primary-foreground">
                    {userInfo.avatar}
                  </span>
                </div>
                {isEditing && (
                  <Button variant="glass" size="icon" className="absolute -bottom-2 -right-2 shadow-lg">
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 space-y-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <Input defaultValue={userInfo.name} className="font-semibold" />
                    <Input defaultValue={userInfo.email} className="text-sm" />
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-foreground">{userInfo.name}</h2>
                    <p className="text-sm text-muted-foreground">{userInfo.email}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{userInfo.role}</Badge>
                      <Badge variant="secondary">{userInfo.id}</Badge>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {!isEditing && (
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium">{userInfo.department}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Joined</p>
                  <p className="font-medium">{userInfo.joinDate}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Shield className="w-5 h-5 mr-2 text-primary" />
              Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {permissions.map((permission, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                <span className="text-sm">{permission.name}</span>
                <Badge 
                  variant={permission.granted ? "default" : "secondary"}
                  className={permission.granted ? "bg-success text-success-foreground" : ""}
                >
                  {permission.granted ? "Granted" : "Denied"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Settings className="w-5 h-5 mr-2 text-primary" />
              Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                <div>
                  <p className="text-sm font-medium">Dark Mode</p>
                  <p className="text-xs text-muted-foreground">Switch between light and dark themes</p>
                </div>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive alerts on your device</p>
                </div>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium">Offline Mode</p>
                  <p className="text-xs text-muted-foreground">Enable for field work without internet</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="shadow-card border-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-muted/30">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.location}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isEditing && (
            <div className="grid grid-cols-2 gap-3">
              <Button variant="electric" onClick={() => setIsEditing(false)}>
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
          
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => navigate("/login")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;