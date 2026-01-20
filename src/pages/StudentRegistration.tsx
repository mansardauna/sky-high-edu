import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowLeft, CheckCircle, Globe } from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    dob: "",
    class: "",
    parentName: "",
    parentPhone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();
  const { addStudent, classes } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.surname || !formData.dob || !formData.class || !formData.parentName || !formData.parentPhone) {
      toast.error(t("please_fill_required"));
      return;
    }
    
    setLoading(true);
    
    setTimeout(() => {
      const newStudent = addStudent({
        firstName: formData.firstName,
        middleName: formData.middleName,
        surname: formData.surname,
        dob: formData.dob,
        class: formData.class,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        email: formData.email,
        status: "pending",
      });
      
      setRegNo(newStudent.regNo);
      setSuccess(true);
      toast.success(t("registration_successful"));
      setLoading(false);
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4" dir={direction}>
        <Card className="shadow-2xl border-none max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t("registration_successful")}</h2>
            <p className="text-muted-foreground mb-6">
              {t("registration_pending")}
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">{t("your_reg_number")}</p>
              <p className="text-2xl font-bold text-primary">{regNo}</p>
            </div>
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg mb-6">
              <p className="text-sm text-foreground">
                <strong>{language === "ar" ? "مهم:" : "Important:"}</strong> {t("important_notice")}
              </p>
            </div>
            <div className="space-y-3">
              <Button variant="hero" className="w-full" onClick={() => navigate("/student-login")}>
                {t("go_to_login")}
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                {t("back_to_home")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-8 px-4" dir={direction}>
      <div className="max-w-2xl mx-auto">
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
            <CardTitle className="text-2xl font-bold">{t("student_registration")}</CardTitle>
            <CardDescription>
              {t("register_admission")}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("personal_information")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t("first_name")} *</Label>
                    <Input
                      id="firstName"
                      placeholder={t("first_name")}
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">{t("middle_name")}</Label>
                    <Input
                      id="middleName"
                      placeholder={t("middle_name")}
                      value={formData.middleName}
                      onChange={(e) => updateField("middleName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">{t("surname")} *</Label>
                    <Input
                      id="surname"
                      placeholder={t("surname")}
                      value={formData.surname}
                      onChange={(e) => updateField("surname", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">{t("date_of_birth")} *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => updateField("dob", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("academic_information")}</h3>
                <div className="space-y-2">
                  <Label>{t("class_applying")} *</Label>
                  <Select value={formData.class} onValueChange={(value) => updateField("class", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t("select_class")} />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">{t("parent_information")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">{t("parent_name")} *</Label>
                    <Input
                      id="parentName"
                      placeholder={t("enter_parent_name")}
                      value={formData.parentName}
                      onChange={(e) => updateField("parentName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">{t("phone_number")} *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      placeholder="08012345678"
                      value={formData.parentPhone}
                      onChange={(e) => updateField("parentPhone", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">{t("email")} ({t("optional")})</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="parent@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {t("terms_agreement")}
                </p>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? t("submitting") : t("submit_registration")}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {t("already_registered")}{" "}
                <Link to="/student-login" className="text-primary hover:underline font-medium">
                  {t("login_here")}
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

export default StudentRegistration;
