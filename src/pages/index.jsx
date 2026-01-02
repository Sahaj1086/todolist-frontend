import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import GlassButton from "../components/ui/GlassButton";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-mesh flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-accent mb-8 animate-pulse-glow animate-fade-in">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* Heading */}
        <h1
          className="text-5xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          All Your Projects,{" "}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            One Dashboard
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          Organize and access all your mini-projects from a beautiful,
          glass-inspired dashboard. Built for productivity lovers.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <GlassButton
            variant="primary"
            size="xl"
            onClick={() => navigate("/auth")}
            className="group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </GlassButton>

          <GlassButton
            variant="default"
            size="xl"
            onClick={() => navigate("/auth")}
          >
            Sign In
          </GlassButton>
        </div>

        {/* Feature Pills */}
        <div
          className="flex flex-wrap gap-3 justify-center mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {["To Do List", "Calculator", "Notes", "Timer"].map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 rounded-full glass text-sm text-muted-foreground"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
