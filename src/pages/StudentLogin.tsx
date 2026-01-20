import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft, Info, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentLogin = () => {
  const [surname, setSurname] = useState("");
  const [dob, setDob] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { loginStudent, students } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const student = loginStudent(surname, dob);
      if (student) {
        toast.success(`${t("welcome_back")}, ${student.firstName}!`);
        navigate("/student-dashboard");
      } else {
        const foundStudent = students.find(
          s => s.surname.toLowerCase() === surname.toLowerCase() && s.dob === dob
        );
        if (foundStudent) {
          if (foundStudent.status === "pending") {
            toast.error(language === "ar" 
              ? "تسجيلك قيد الانتظار. يرجى انتظار موافقة الإدارة."
              : "Your registration is pending approval. Please wait for admin approval.");
          } else if (foundStudent.status === "suspended") {
            toast.error(language === "ar"
              ? "تم تعليق حسابك. يرجى الاتصال بإدارة المدرسة."
              : "Your account has been suspended. Please contact the school administration.");
          } else if (foundStudent.status === "inactive") {
            toast.error(language === "ar"
              ? "حسابك غير نشط. يرجى الاتصال بإدارة المدرسة."
              : "Your account is inactive. Please contact the school administration.");
          }
        } else {
          toast.error(t("invalid_credentials"));
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4" dir={direction}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
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
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">{t("student_portal")}</CardTitle>
            <CardDescription>
              {t("student_credentials")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Demo Credentials Info */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-foreground mb-1">{t("demo_login")}:</p>
                  <p className="text-muted-foreground">{t("surname")}: <span className="font-mono text-primary">Ibrahim</span></p>
                  <p className="text-muted-foreground">{t("date_of_birth")}: <span className="font-mono text-primary">2010-05-15</span></p>
                </div>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="surname">{t("surname")}</Label>
                <Input
                  id="surname"
                  placeholder={t("enter_surname")}
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dob">{t("date_of_birth")}</Label>
                <div className="relative">
                  <Input
                    id="dob"
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? t("logging_in") : t("login_to_portal")}
              </Button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("new_student")}{" "}
                  <Link to="/student-registration" className="text-primary hover:underline font-medium">
                    {t("register_here")}
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  {t("having_trouble")}{" "}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    {t("contact_support")}
                  </Link>
                </p>
              </div>
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

export default StudentLogin;
