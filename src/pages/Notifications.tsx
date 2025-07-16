import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Filter,
  MoreVertical,
  Trash2,
  Eye,
  Clock
} from "lucide-react";

const Notifications = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");

  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Theft Alert - High Priority",
      message: "Unauthorized access detected at Sector 7-A power line. Immediate attention required.",
      time: "2 minutes ago",
      read: false,
      priority: "high"
    },
    {
      id: 2,
      type: "info",
      title: "Drone Mission Completed",
      message: "Eagle Eye 1 has completed patrol mission in Grid Station 15. No anomalies detected.",
      time: "15 minutes ago",
      read: false,
      priority: "medium"
    },
    {
      id: 3,
      type: "success",
      title: "Maintenance Completed",
      message: "Scheduled maintenance for Tower 423 has been successfully completed by Field Team Alpha.",
      time: "1 hour ago",
      read: true,
      priority: "low"
    },
    {
      id: 4,
      type: "alert",
      title: "Sensor Offline",
      message: "Power monitoring sensor at Substation B has gone offline. Technical team dispatched.",
      time: "2 hours ago",
      read: true,
      priority: "medium"
    },
    {
      id: 5,
      type: "info",
      title: "Weekly Report Available",
      message: "Your weekly grid surveillance report is ready for review in the analytics section.",
      time: "3 hours ago",
      read: true,
      priority: "low"
    },
    {
      id: 6,
      type: "alert",
      title: "Power Anomaly Detected",
      message: "Unusual power consumption pattern detected in residential area Zone C-12.",
      time: "5 hours ago",
      read: true,
      priority: "medium"
    }
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="w-5 h-5 text-destructive" />;
      case "info": return <Info className="w-5 h-5 text-primary" />;
      case "success": return <CheckCircle className="w-5 h-5 text-success" />;
      default: return <Bell className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const filterNotifications = (filter: string) => {
    switch (filter) {
      case "unread": return notifications.filter(n => !n.read);
      case "alerts": return notifications.filter(n => n.type === "alert");
      case "info": return notifications.filter(n => n.type === "info");
      default: return notifications;
    }
  };

  const filteredNotifications = filterNotifications(activeTab);
  const unreadCount = notifications.filter(n => !n.read).length;

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
                <h1 className="text-lg font-bold text-foreground">Notifications</h1>
                <p className="text-sm text-muted-foreground">
                  {unreadCount} unread messages
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Filter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Filter Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({notifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread">
              Unread ({unreadCount})
            </TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts ({notifications.filter(n => n.type === "alert").length})
            </TabsTrigger>
            <TabsTrigger value="info">
              Info ({notifications.filter(n => n.type === "info").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <div className="space-y-3">
              {filteredNotifications.length === 0 ? (
                <Card className="shadow-card border-0">
                  <CardContent className="p-8 text-center">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No notifications found</p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`shadow-card border-0 transition-all duration-200 hover:shadow-elevated ${
                      !notification.read ? 'border-l-4 border-l-primary bg-accent/30' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <h3 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h3>
                            <div className="flex items-center space-x-2 ml-2">
                              <Badge className={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full" />
                              )}
                            </div>
                          </div>
                          
                          <p className={`text-xs mb-2 ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.message}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{notification.time}</span>
                            </div>
                            
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="xs">
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="xs">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        {filteredNotifications.length > 0 && (
          <div className="flex space-x-3 pt-4">
            <Button variant="outline" className="flex-1">
              Mark All as Read
            </Button>
            <Button variant="ghost" className="flex-1">
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;