import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ArrowLeft, Eye, EyeOff, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginStaff } = useDemoData();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setLoading(true);

    setTimeout(() => {
      const user = loginStaff(email, password, role);
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        switch (role) {
          case "teacher":
            navigate("/teacher-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "super_admin":
            navigate("/super-admin-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error("Invalid credentials. Please check your email, password, and role.");
      }
      setLoading(false);
    }, 1000);
  };

  const demoCredentials = {
    teacher: { email: "ahmed@daruulum.edu", password: "teacher123" },
    admin: { email: "admin@daruulum.edu", password: "admin123" },
    super_admin: { email: "superadmin@daruulum.edu", password: "super123" },
  };

  const selectedCredentials = role ? demoCredentials[role as keyof typeof demoCredentials] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/10 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-success/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-none">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-success/30">
              <Users className="w-8 h-8 text-success-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Staff Portal</CardTitle>
            <CardDescription>
              Login with your staff credentials
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Demo Credentials Info */}
            {selectedCredentials && (
              <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground mb-1">Demo {role.replace("_", " ")} Login:</p>
                    <p className="text-muted-foreground">Email: <span className="font-mono text-success">{selectedCredentials.email}</span></p>
                    <p className="text-muted-foreground">Password: <span className="font-mono text-success">{selectedCredentials.password}</span></p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="role">Select Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Subject Teacher</SelectItem>
                    <SelectItem value="admin">Admin Staff</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="success" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login to Portal"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Having trouble logging in?{" "}
                <Link to="/contact" className="text-primary hover:underline font-medium">
                  Contact IT Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} Daru Ulum School
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;
