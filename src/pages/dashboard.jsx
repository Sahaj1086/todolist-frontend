import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListTodo,
  Calculator,
  FileText,
  Clock,
  Plus,
  Sparkles,
} from "lucide-react";
import API from "../api/axios";

import GlassButton from "../components/ui/GlassButton";
import GlassCard from "../components/ui/GlassCard";

/* Projects UI (same as TSX, only UI data) */
const projects = [
  {
    id: 1,
    title: "To Do List",
    description:
      "Manage your daily tasks and stay organized with a beautiful task manager.",
    icon: ListTodo,
    href: "/todolist",
    color: "primary",
  },
  {
    id: 2,
    title: "Calculator",
    description:
      "A sleek calculator for quick calculations and mathematical operations.",
    icon: Calculator,
    href: "/calculator",
    color: "accent",
  },
  {
    id: 3,
    title: "Notes App",
    description:
      "Capture your thoughts and ideas with a minimal note-taking app.",
    icon: FileText,
    href: "/notes",
    color: "primary",
  },
  {
    id: 4,
    title: "Pomodoro Timer",
    description:
      "Boost your productivity with the famous Pomodoro technique timer.",
    icon: Clock,
    href: "/pomodoro",
    color: "accent",
  },
];

const Dashboard = () => {
  /* 🔒 BACKEND LOGIC — UNCHANGED */
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/dashboard");
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-mesh flex w-full">
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto relative">
        {/* Background Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "-3s" }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Header */}
          <header className="mb-10 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  {message}
                </p>
              </div>

              <GlassButton variant="primary" className="gap-2" onClick={() => {
                localStorage.removeItem("isAuthenticated");
                localStorage.removeItem("userName");
                localStorage.removeItem("token");
                navigate("/login");
              }} >
                Log Out
              </GlassButton>
            </div>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <GlassCard className="animate-fade-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {projects.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Projects
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              className="animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                  <ListTodo className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    Active
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Tasks & Projects
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard
              className="animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    8h 32m
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Time This Week
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Projects Grid (TSX-style) */}
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Your Projects
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {projects.map((project, index) => {
                const Icon = project.icon;
                return (
                  <div
                    key={project.id}
                    className="animate-fade-in-up cursor-pointer"
                    style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                    onClick={() => navigate(project.href)}
                  >
                    <GlassCard hover className="h-full">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            project.color === "primary"
                              ? "bg-primary/20"
                              : "bg-accent/20"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              project.color === "primary"
                                ? "text-primary"
                                : "text-accent"
                            }`}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
