import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, ArrowLeft, Eye, EyeOff, Info, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";

const StaffLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { loginStaff } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !role) {
      toast.error(t("please_fill_fields"));
      return;
    }
    
    setLoading(true);

    setTimeout(() => {
      const user = loginStaff(email, password, role);
      if (user) {
        toast.success(`${t("welcome_back")}, ${user.name}!`);
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
        toast.error(t("invalid_credentials"));
      }
      setLoading(false);
    }, 1000);
  };

  const demoCredentials = {
    teacher: { email: "ahmed@daruulum.edu", password: "teacher123" },
    admin: { email: "admin@daruulum.edu", password: "admin123" },
    super_admin: { email: "superadmin@daruulum.edu", password: "super123" },
  };

  const roleLabels: Record<string, string> = {
    teacher: t("subject_teacher"),
    admin: t("admin_staff"),
    super_admin: t("super_admin"),
  };

  const selectedCredentials = role ? demoCredentials[role as keyof typeof demoCredentials] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/5 via-background to-primary/10 flex items-center justify-center p-4" dir={direction}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-success/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Top bar with back and language */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("back_to_home")}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            title={t("language")}
          >
            <Globe className="w-5 h-5" />
          </Button>
        </div>

        <Card className="shadow-2xl border-none">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-success/30">
              <Users className="w-8 h-8 text-success-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">{t("staff_portal")}</CardTitle>
            <CardDescription>
              {t("login_credentials")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Demo Credentials Info */}
            {selectedCredentials && (
              <div className="bg-success/5 border border-success/20 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2">
                  <Info className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-semibold text-foreground mb-1">{t("demo_login")} ({roleLabels[role]}):</p>
                    <p className="text-muted-foreground">{t("email")}: <span className="font-mono text-success">{selectedCredentials.email}</span></p>
                    <p className="text-muted-foreground">{t("password")}: <span className="font-mono text-success">{selectedCredentials.password}</span></p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="role">{t("select_role")}</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder={t("select_role")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">{t("subject_teacher")}</SelectItem>
                    <SelectItem value="admin">{t("admin_staff")}</SelectItem>
                    <SelectItem value="super_admin">{t("super_admin")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t("email_address")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("enter_email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("password")}</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enter_password")}
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
                  {t("forgot_password")}
                </Link>
              </div>

              <Button 
                type="submit" 
                variant="success" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? t("logging_in") : t("login_to_portal")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("having_trouble")}{" "}
                <Link to="/contact" className="text-primary hover:underline font-medium">
                  {t("contact_support")}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} {t("school_name")}
        </p>
      </div>
    </div>
  );
};

export default StaffLogin;
