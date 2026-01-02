import { useState } from "react";
import { ArrowRight, Sparkles, Zap, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GlassButton = ({ children, variant = "primary", size = "md", className = "", onClick, ...props }) => {
  const baseStyles = "relative overflow-hidden rounded-xl font-medium transition-all duration-300 backdrop-blur-xl border flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary/80 to-accent/80 border-primary/30 text-white hover:shadow-lg hover:shadow-primary/25 hover:scale-105",
    secondary: "bg-white/10 border-white/20 text-foreground hover:bg-white/20 hover:scale-105"
  };
  
  const sizes = {
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <GlassCard className="p-6 hover:scale-105 transition-transform duration-300">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/50 to-accent/50 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </GlassCard>
  );
};

const LandingPage = () => {
  const [currentPage, setCurrentPage] = useState("landing");
  const navigate = useNavigate();

  if (currentPage === "login") {
    return <LoginPage onNavigate={navigate('/login')} />;
  }

  if (currentPage === "signup") {
    return <SignupPage onNavigate={navigate('/signup')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "5s", animationDelay: "-2s" }} />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "6s", animationDelay: "-4s" }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">ProjectHub</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage("login")}
              className="text-white hover:text-white/80 transition-colors font-medium"
            >
              Login
            </button>
            <GlassButton onClick={() => setCurrentPage("signup")} size="md">
              Sign Up
            </GlassButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <div className="animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white font-medium">Your Creative Workspace</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build Amazing Projects
            <br />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              Together
            </span>
          </h1>
          
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            The ultimate platform for creators and teams to collaborate, innovate, and bring ideas to life with powerful tools and seamless workflows.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GlassButton 
              onClick={() => setCurrentPage("signup")}
              variant="primary" 
              size="lg"
              className="group"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
            <GlassButton 
              variant="secondary" 
              size="lg"
            >
              Watch Demo
            </GlassButton>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-white/80">
            Powerful features to supercharge your productivity
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Zap}
            title="Lightning Fast"
            description="Experience blazing-fast performance with our optimized infrastructure and real-time collaboration."
          />
          <FeatureCard
            icon={Shield}
            title="Secure & Private"
            description="Your data is encrypted and protected with enterprise-grade security measures."
          />
          <FeatureCard
            icon={Users}
            title="Team Collaboration"
            description="Work together seamlessly with built-in chat, comments, and project sharing."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        <GlassCard className="p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/80 mb-8">
            Join thousands of creators already using ProjectHub
          </p>
          <GlassButton 
            onClick={() => setCurrentPage("signup")}
            variant="primary" 
            size="lg"
            className="group"
          >
            Create Your Account
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </GlassButton>
        </GlassCard>
      </section>
    </div>
  );
};

const LoginPage = ({ onNavigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert("Login successful!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ProjectHub</h1>
          <p className="text-white/80">Welcome back! Sign in to continue.</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <GlassButton type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Loading..." : "Sign In"}
              <ArrowRight className="w-5 h-5" />
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-white/70">Don't have an account? </span>
            <button
              onClick={() => onNavigate("signup")}
              className="text-sm font-medium text-white hover:underline"
            >
              Sign up
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate("landing")}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              ← Back to home
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const SignupPage = ({ onNavigate }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      alert("Account created successfully!");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "-3s" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">ProjectHub</h1>
          <p className="text-white/80">Create your account to get started.</p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>

            <GlassButton type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Sign Up"}
              <ArrowRight className="w-5 h-5" />
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <span className="text-sm text-white/70">Already have an account? </span>
            <button
              onClick={() => onNavigate("login")}
              className="text-sm font-medium text-white hover:underline"
            >
              Sign in
            </button>
          </div>

          <div className="mt-4 text-center">
            <button
              onClick={() => onNavigate("landing")}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              ← Back to home
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default LandingPage;