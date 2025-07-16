import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  Bot,
  User,
  Lightbulb,
  MapPin,
  AlertTriangle
} from "lucide-react";

const ChatbotAssistant = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content: "Hello! I'm ElectroMate AI Assistant. How can I help you with grid monitoring today?",
      time: "10:30 AM",
      suggestions: ["Check theft alerts", "Sensor status", "Recent incidents"]
    },
    {
      id: 2,
      type: "user", 
      content: "What's the current status of Sector 7-A?",
      time: "10:31 AM"
    },
    {
      id: 3,
      type: "bot",
      content: "Sector 7-A currently has 1 active theft alert and 3 sensors online. Last incident was 2 hours ago. Would you like detailed analysis?",
      time: "10:31 AM",
      suggestions: ["View detailed report", "Check nearby areas", "Schedule inspection"]
    }
  ]);

  const quickActions = [
    { label: "System Status", icon: "🔋", action: "system-status" },
    { label: "Alert Summary", icon: "🚨", action: "alerts" },
    { label: "Recommendations", icon: "💡", action: "recommendations" },
    { label: "Help", icon: "❓", action: "help" }
  ];

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "bot" as const,
        content: "I understand your query. Let me analyze the grid data and provide recommendations.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["View analysis", "Take action", "Get more info"]
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    const actionMessage = {
      id: messages.length + 1,
      type: "user" as const,
      content: `Show me ${action.replace('-', ' ')}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, actionMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex flex-col">
      <header className="bg-card shadow-card border-b">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-foreground">AI Assistant</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <p className="text-sm text-muted-foreground">Online</p>
                </div>
              </div>
            </div>
            <Badge className="bg-gradient-electric text-primary-foreground">
              <Bot className="w-3 h-3 mr-1" />
              AI
            </Badge>
          </div>
        </div>
      </header>

      {/* Quick Actions */}
      <div className="p-4 border-b bg-card">
        <div className="grid grid-cols-4 gap-2">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              className="flex-col h-16 text-xs"
              onClick={() => handleQuickAction(action.action)}
            >
              <span className="text-lg mb-1">{action.icon}</span>
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] ${msg.type === "user" ? "order-2" : "order-1"}`}>
                <div className={`flex items-start space-x-2 ${msg.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    msg.type === "user" 
                      ? "bg-gradient-electric text-primary-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {msg.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  
                  <div className={`rounded-2xl p-3 ${
                    msg.type === "user"
                      ? "bg-gradient-electric text-primary-foreground"
                      : "bg-card border shadow-card"
                  }`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${
                      msg.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>

                {/* Suggestions for bot messages */}
                {msg.type === "bot" && "suggestions" in msg && msg.suggestions && (
                  <div className="mt-2 ml-10 space-y-1">
                    {msg.suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="mr-2 mb-1 text-xs h-7"
                        onClick={() => {
                          setMessage(suggestion);
                          handleSend();
                        }}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t bg-card">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about grid status, alerts, or recommendations..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1"
          />
          <Button 
            variant="electric" 
            size="icon"
            onClick={handleSend}
            disabled={!message.trim()}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-center mt-2 text-xs text-muted-foreground">
          <Lightbulb className="w-3 h-3 mr-1" />
          AI-powered insights for grid monitoring
        </div>
      </div>
    </div>
  );
};

export default ChatbotAssistant;