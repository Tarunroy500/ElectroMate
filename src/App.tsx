import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import MapView from "./pages/MapView";
import DroneFeed from "./pages/DroneFeed";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import SensorStatus from "./pages/SensorStatus";
import FieldReport from "./pages/FieldReport";
import Analytics from "./pages/Analytics";
import DroneMissionPlanner from "./pages/DroneMissionPlanner";
import TheftHistory from "./pages/TheftHistory";
import FieldInspection from "./pages/FieldInspection";
import MaintenanceSchedule from "./pages/MaintenanceSchedule";
import FaultLogging from "./pages/FaultLogging";
import ChatbotAssistant from "./pages/ChatbotAssistant";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/drone-feed" element={<DroneFeed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/sensors" element={<SensorStatus />} />
          <Route path="/field-report" element={<FieldReport />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/mission-planner" element={<DroneMissionPlanner />} />
          <Route path="/theft-history" element={<TheftHistory />} />
          <Route path="/field-inspection" element={<FieldInspection />} />
          <Route path="/maintenance" element={<MaintenanceSchedule />} />
          <Route path="/fault-logging" element={<FaultLogging />} />
          <Route path="/ai-assistant" element={<ChatbotAssistant />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
