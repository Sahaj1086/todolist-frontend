import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Sparkles } from "lucide-react";
import GlassButton from "../components/ui/GlassButton";
import GlassInput from "../components/ui/GlassInput";
import GlassCard from "../components/ui/GlassCard";
import { useToast } from "../hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulated login
    setTimeout(() => {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userName", "User");

      toast({
        title: "Welcome back!",
        description: "Redirecting to your dashboard...",
      });

      navigate("/dashboard");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-3s" }}
        />
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            ProjectHub
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Sign in to continue.
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <GlassInput
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <GlassInput
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <GlassButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full group"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </GlassButton>
          </form>

          {/* Switch */}
          <div className="mt-6 text-center">
            <span className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
            </span>
            <button
              onClick={() => navigate("/signup")}
              className="text-sm font-medium text-primary hover:underline"
            >
              Sign up
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Login;
