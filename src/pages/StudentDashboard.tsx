import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  TrendingUp,
  Clock,
  Award,
  Download,
  Settings,
  CreditCard,
  Save,
  Shield,
  Palette,
  Lock,
  MessageSquare,
  Users,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Home,
  ClipboardList,
  LayoutDashboard
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { StudentChat } from "@/components/StudentChat";
import { StudentForum } from "@/components/StudentForum";
import { FeePaymentModal } from "@/components/modals/FeePaymentModal";
import logo from "@/assets/logo.png";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsSection, setSettingsSection] = useState("profile");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const navigate = useNavigate();
  const { timetable, feeStructures, feePayments, addFeePayment, currentUser, logout, getActiveAnnouncements } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  // Get current student data
  const student = currentUser as any || { firstName: "أحمد", surname: "إبراهيم", class: "إعدادي ١أ", id: "s1" };
  const studentClass = student?.class || "إعدادي ١أ";
  const studentId = student?.id || "s1";

  // Filter timetable for student's class
  const myTimetable = timetable.filter(t => t.class === studentClass);
  const days = language === "ar" 
    ? ["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"]
    : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Get student fees
  const classLevel = studentClass.includes("توجيهي") ? "SSS" : "JSS";
  const myFees = feeStructures
    .filter(f => f.classLevel === classLevel || f.classLevel === "All")
    .map(structure => ({
      structure,
      payment: feePayments.find(p => p.studentId === studentId && p.feeId === structure.id)
    }));

  const totalFees = myFees.reduce((sum, f) => sum + f.structure.amount, 0);
  const totalPaid = myFees.reduce((sum, f) => sum + (f.payment?.amount || 0), 0);

  const [profileData, setProfileData] = useState({
    name: `${student.firstName} ${student.surname}`,
    email: "",
    phone: "+234 801 234 5678",
  });
  const [notifications, setNotifications] = useState({
    email: true, sms: false, announcements: true, results: true, fees: true,
  });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const handleLogout = () => {
    logout();
    toast.success(language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logged out successfully");
    navigate("/");
  };

  const handlePayFee = (fee: any) => {
    setSelectedFee(fee);
    setPaymentModalOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    addFeePayment({
      studentId,
      feeId: selectedFee.structure.id,
      amount: paymentData.amount,
      paidDate: new Date().toISOString().split("T")[0],
      paymentMethod: paymentData.paymentMethod,
      reference: paymentData.reference,
      status: paymentData.amount >= selectedFee.structure.amount ? "paid" : "partial"
    });
  };

  // Arabic subjects data
  const subjects = language === "ar" ? [
    { name: "الرياضيات", score: 85, grade: "أ", teacher: "الأستاذ أحمد إبراهيم", progress: 85 },
    { name: "اللغة الإنجليزية", score: 78, grade: "ب+", teacher: "الأستاذة فاطمة يوسف", progress: 78 },
    { name: "الدراسات الإسلامية", score: 92, grade: "أ+", teacher: "الأستاذ إبراهيم موسى", progress: 92 },
    { name: "العلوم", score: 80, grade: "أ-", teacher: "الدكتور موسى عليو", progress: 80 },
    { name: "اللغة العربية", score: 88, grade: "أ", teacher: "الأستاذ يوسف", progress: 88 },
    { name: "الدراسات الاجتماعية", score: 75, grade: "ب+", teacher: "الأستاذة زينب أبوبكر", progress: 75 },
  ] : [
    { name: "Mathematics", score: 85, grade: "A", teacher: "Mr. Ahmed Ibrahim", progress: 85 },
    { name: "English", score: 78, grade: "B+", teacher: "Mrs. Fatima Yusuf", progress: 78 },
    { name: "Islamic Studies", score: 92, grade: "A+", teacher: "Ustaz Ibrahim Musa", progress: 92 },
    { name: "Science", score: 80, grade: "A-", teacher: "Dr. Musa Aliyu", progress: 80 },
    { name: "Arabic", score: 88, grade: "A", teacher: "Ustaz Yusuf", progress: 88 },
    { name: "Social Studies", score: 75, grade: "B+", teacher: "Mrs. Zainab Abubakar", progress: 75 },
  ];

  // Get announcements from context
  const announcements = getActiveAnnouncements("students").slice(0, 3);

  // Homework/Assignments
  const homework = language === "ar" ? [
    { subject: "الرياضيات", title: "حل تمارين الباب الثالث", dueDate: "٢٠٢٥-٠٢-٠٦", status: "pending" },
    { subject: "اللغة العربية", title: "كتابة موضوع إنشائي", dueDate: "٢٠٢٥-٠٢-٠٧", status: "pending" },
    { subject: "الدراسات الإسلامية", title: "حفظ سورة الملك", dueDate: "٢٠٢٥-٠٢-٠٨", status: "completed" },
  ] : [
    { subject: "Mathematics", title: "Complete Chapter 3 Exercises", dueDate: "2025-02-06", status: "pending" },
    { subject: "Arabic", title: "Write an Essay", dueDate: "2025-02-07", status: "pending" },
    { subject: "Islamic Studies", title: "Memorize Surah Al-Mulk", dueDate: "2025-02-08", status: "completed" },
  ];

  const menuItems = [
    { icon: LayoutDashboard, label: language === "ar" ? "الرئيسية" : "Dashboard", id: "dashboard" },
    { icon: BookOpen, label: language === "ar" ? "موادي" : "My Courses", id: "courses" },
    { icon: FileText, label: t("results"), id: "results" },
    { icon: Calendar, label: t("timetable"), id: "timetable" },
    { icon: ClipboardList, label: language === "ar" ? "الواجبات" : "Homework", id: "homework" },
    { icon: CreditCard, label: t("fees"), id: "fees" },
    { icon: MessageSquare, label: t("chat"), id: "chat" },
    { icon: Users, label: t("forum"), id: "forum" },
    { icon: Bell, label: t("announcements"), id: "announcements" },
    { icon: Settings, label: t("settings"), id: "settings" },
  ];

  const sidebarWidth = sidebarCollapsed ? "w-20" : "w-72";

  return (
    <div className="min-h-screen bg-muted/30 flex" dir={direction}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} h-full ${sidebarWidth} bg-card border-${direction === "rtl" ? "l" : "r"} border-border z-50 transform transition-all duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : '-translate-x-full'} flex flex-col`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Daru Ulum" className="w-12 h-12 object-contain" />
            {!sidebarCollapsed && (
              <div>
                <span className="font-bold text-lg text-foreground block">
                  {language === "ar" ? "دار العلوم" : "Daru Ulum"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {language === "ar" ? "بوابة الطالب" : "Student Portal"}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Student Info Card */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b border-border">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg">
                  {student.firstName?.charAt(0) || "أ"}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{student.firstName} {student.surname}</p>
                  <p className="text-xs text-muted-foreground">{studentClass}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-background/50 rounded-lg p-2">
                  <p className="text-lg font-bold text-primary">{language === "ar" ? "٨٣٪" : "83%"}</p>
                  <p className="text-xs text-muted-foreground">{t("average")}</p>
                </div>
                <div className="bg-background/50 rounded-lg p-2">
                  <p className="text-lg font-bold text-success">{language === "ar" ? "٥" : "5th"}</p>
                  <p className="text-xs text-muted-foreground">{t("position")}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.id 
                    ? 'bg-primary text-primary-foreground shadow-md' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-border space-y-2">
          {/* Language Switcher */}
          <div className={`flex ${sidebarCollapsed ? 'justify-center' : 'justify-between'} items-center px-2`}>
            {!sidebarCollapsed && <span className="text-sm text-muted-foreground">{t("language")}</span>}
            <div className="flex gap-1">
              <Button 
                variant={language === "ar" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-3"
                onClick={() => setLanguage("ar")}
              >
                AR
              </Button>
              <Button 
                variant={language === "en" ? "default" : "ghost"} 
                size="sm" 
                className="h-8 px-3"
                onClick={() => setLanguage("en")}
              >
                EN
              </Button>
            </div>
          </div>
          
          {/* Collapse Button */}
          <Button 
            variant="ghost" 
            className={`w-full ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {direction === "rtl" 
              ? (sidebarCollapsed ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />)
              : (sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />)
            }
            {!sidebarCollapsed && <span className={direction === "rtl" ? "mr-3" : "ml-3"}>{language === "ar" ? "طي القائمة" : "Collapse"}</span>}
          </Button>

          {/* Logout */}
          <Button 
            variant="ghost" 
            className={`w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10 ${sidebarCollapsed ? 'justify-center' : ''}`}
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className={direction === "rtl" ? "mr-3" : "ml-3"}>{t("logout")}</span>}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${direction === "rtl" ? `lg:mr-${sidebarCollapsed ? '20' : '72'}` : `lg:ml-${sidebarCollapsed ? '20' : '72'}`} transition-all duration-300`} style={{ marginInlineStart: sidebarCollapsed ? '5rem' : '18rem' }}>
        {/* Top Header */}
        <header className="sticky top-0 bg-card/95 backdrop-blur-lg border-b border-border z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 text-foreground rounded-lg hover:bg-muted" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-bold text-lg text-foreground">
                  {menuItems.find(m => m.id === activeTab)?.label || t("dashboard")}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" ? "العام الدراسي ٢٠٢٤/٢٠٢٥" : "Academic Year 2024/2025"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                {student.firstName?.charAt(0) || "أ"}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-primary-foreground">
                <h2 className="text-2xl font-bold mb-2">
                  {t("welcome_back")}، {student.firstName}! 👋
                </h2>
                <p className="text-primary-foreground/80">
                  {language === "ar" 
                    ? "لديك ٣ واجبات مستحقة هذا الأسبوع. استمر في العمل الجيد!"
                    : "You have 3 assignments due this week. Keep up the great work!"}
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-card">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("average")}</p>
                        <p className="text-3xl font-bold text-foreground">{language === "ar" ? "٨٣٪" : "83%"}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("attendance")}</p>
                        <p className="text-3xl font-bold text-foreground">{language === "ar" ? "٩٦٪" : "96%"}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("position")}</p>
                        <p className="text-3xl font-bold text-foreground">{language === "ar" ? "٥" : "5th"}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("balance")}</p>
                        <p className="text-2xl font-bold text-foreground">₦{(totalFees - totalPaid).toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Courses Progress */}
                <Card className="lg:col-span-2 border-none shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      {language === "ar" ? "تقدم المواد الدراسية" : "Course Progress"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subjects.slice(0, 4).map((subject, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{subject.name}</p>
                                <p className="text-xs text-muted-foreground">{subject.teacher}</p>
                              </div>
                            </div>
                            <Badge variant="secondary" className="font-bold">{subject.grade}</Badge>
                          </div>
                          <Progress value={subject.progress} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <Button variant="ghost" className="w-full mt-4" onClick={() => setActiveTab("courses")}>
                      {t("view_all")}
                    </Button>
                  </CardContent>
                </Card>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Upcoming Homework */}
                  <Card className="border-none shadow-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <ClipboardList className="w-5 h-5 text-primary" />
                        {language === "ar" ? "الواجبات القادمة" : "Upcoming Homework"}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {homework.map((item, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.status === "completed" ? "bg-success/10" : "bg-warning/10"}`}>
                            {item.status === "completed" ? (
                              <CheckCircle className="w-4 h-4 text-success" />
                            ) : (
                              <Clock className="w-4 h-4 text-warning" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm text-foreground truncate">{item.title}</p>
                            <p className="text-xs text-muted-foreground">{item.subject}</p>
                            <p className="text-xs text-primary mt-1">{item.dueDate}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Announcements */}
                  <Card className="border-none shadow-card">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bell className="w-5 h-5 text-primary" />
                        {t("announcements")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {announcements.map((item, index) => (
                        <div key={index} className={`p-3 rounded-lg ${item.category === "urgent" ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted/50'}`}>
                          <p className="font-medium text-sm text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Today's Schedule */}
              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-primary" />
                    {language === "ar" ? "جدول اليوم" : "Today's Schedule"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {myTimetable.slice(0, 4).map((entry, index) => (
                      <div key={index} className="p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/10">
                        <Badge variant="secondary" className="mb-2">{entry.time}</Badge>
                        <h4 className="font-semibold text-foreground">{entry.subject}</h4>
                        <p className="text-sm text-muted-foreground">{entry.teacher}</p>
                        <p className="text-xs text-muted-foreground mt-1">{entry.room}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "courses" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "جميع المواد الدراسية والتقدم" : "All courses and progress"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {subjects.map((subject, index) => (
                  <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-xl font-bold">
                          {subject.name.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground">{subject.teacher}</p>
                        </div>
                        <Badge variant="default" className="text-lg">{subject.grade}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{language === "ar" ? "التقدم" : "Progress"}</span>
                          <span className="font-medium text-foreground">{subject.score}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "results" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "عرض الأداء الأكاديمي" : "View your academic performance"}
                </p>
              </div>
              <Card className="border-none shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{language === "ar" ? "الفصل الأول ٢٠٢٤/٢٠٢٥" : "First Term 2024/2025"}</CardTitle>
                    <CardDescription>{language === "ar" ? "تفصيل النتائج" : "Detailed results breakdown"}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    {t("download")}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("subject")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("ca1")} (20)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("ca2")} (20)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("exam")} (60)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("total")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("grade")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {subjects.map((subject, index) => (
                          <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-foreground">{subject.name}</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">17</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">18</td>
                            <td className="py-3 px-4 text-center text-muted-foreground">50</td>
                            <td className="py-3 px-4 text-center font-semibold text-foreground">{subject.score}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant="default">{subject.grade}</Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "timetable" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">{t("class")} {studentClass}</p>
              </div>
              <div className="space-y-6">
                {days.map((day) => {
                  const dayEntries = myTimetable.filter(t => t.day === day).sort((a, b) => a.time.localeCompare(b.time));
                  return (
                    <Card key={day} className="border-none shadow-card">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          {day}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {dayEntries.length === 0 ? (
                          <p className="text-muted-foreground text-sm">
                            {language === "ar" ? "لا توجد حصص مجدولة" : "No classes scheduled"}
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dayEntries.map((entry) => (
                              <div key={entry.id} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                                <Badge variant="secondary" className="mb-2">{entry.time}</Badge>
                                <h4 className="font-semibold text-foreground">{entry.subject}</h4>
                                <p className="text-sm text-muted-foreground">{entry.teacher}</p>
                                <p className="text-xs text-muted-foreground mt-1">{entry.room}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </>
          )}

          {activeTab === "homework" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "متابعة الواجبات والتكليفات" : "Track your assignments and homework"}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {homework.map((item, index) => (
                  <Card key={index} className={`border-none shadow-card ${item.status === "completed" ? "border-l-4 border-l-success" : "border-l-4 border-l-warning"}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <Badge variant={item.status === "completed" ? "default" : "secondary"}>
                          {item.subject}
                        </Badge>
                        {item.status === "completed" ? (
                          <CheckCircle className="w-5 h-5 text-success" />
                        ) : (
                          <Clock className="w-5 h-5 text-warning" />
                        )}
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {language === "ar" ? "تاريخ التسليم:" : "Due date:"} {item.dueDate}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "fees" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">{t("fee_structure")} & {t("payment_history")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("total_fees")}</p>
                    <p className="text-2xl font-bold text-foreground">₦{totalFees.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("amount_paid")}</p>
                    <p className="text-2xl font-bold text-success">₦{totalPaid.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("balance")}</p>
                    <p className="text-2xl font-bold text-destructive">₦{(totalFees - totalPaid).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>{t("fee_structure")}</CardTitle>
                  <CardDescription>{language === "ar" ? "الفصل الأول ٢٠٢٤/٢٠٢٥" : "First Term 2024/2025"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("fee_type")}</th>
                          <th className={`${direction === "rtl" ? "text-left" : "text-right"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("amount")}</th>
                          <th className={`${direction === "rtl" ? "text-left" : "text-right"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("amount_paid")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("status")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myFees.map((fee, index) => {
                          const amountPaid = fee.payment?.amount || 0;
                          const status = !fee.payment ? "pending" : fee.payment.status;
                          const balance = fee.structure.amount - amountPaid;
                          return (
                            <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium text-foreground">{fee.structure.name}</td>
                              <td className={`py-3 px-4 ${direction === "rtl" ? "text-left" : "text-right"} text-foreground`}>₦{fee.structure.amount.toLocaleString()}</td>
                              <td className={`py-3 px-4 ${direction === "rtl" ? "text-left" : "text-right"} text-muted-foreground`}>₦{amountPaid.toLocaleString()}</td>
                              <td className="py-3 px-4 text-center">
                                <Badge variant={status === "paid" ? "default" : status === "partial" ? "secondary" : "destructive"}>
                                  {status === "paid" ? (
                                    <><CheckCircle className="w-3 h-3 mr-1" /> {t("paid")}</>
                                  ) : status === "partial" ? (
                                    t("partial")
                                  ) : (
                                    <><XCircle className="w-3 h-3 mr-1" /> {t("unpaid")}</>
                                  )}
                                </Badge>
                              </td>
                              <td className="py-3 px-4 text-center">
                                {balance > 0 && (
                                  <Button size="sm" onClick={() => handlePayFee(fee)}>
                                    {t("make_payment")}
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "chat" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "تواصل مع زملائك" : "Connect with your classmates"}
                </p>
              </div>
              <StudentChat />
            </>
          )}

          {activeTab === "forum" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "المناقشات الأكاديمية ومجموعات الدراسة" : "Academic discussions and study groups"}
                </p>
              </div>
              <StudentForum />
            </>
          )}

          {activeTab === "announcements" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "أخبار المدرسة والتحديثات" : "School news and updates"}
                </p>
              </div>
              <div className="space-y-4">
                {announcements.map((item, index) => (
                  <Card key={index} className={`border-none shadow-card ${item.category === "urgent" ? 'border-l-4 border-l-destructive' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{item.content}</p>
                          <p className="text-xs text-muted-foreground">{item.date}</p>
                        </div>
                        {item.category === "urgent" && <Badge variant="destructive">{t("urgent")}</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  {language === "ar" ? "إدارة تفضيلات الحساب" : "Manage your account preferences"}
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-card lg:col-span-1">
                  <CardContent className="p-4">
                    <nav className="space-y-1">
                      {[
                        { id: "profile", icon: GraduationCap, label: t("profile") },
                        { id: "notifications", icon: Bell, label: t("notifications") },
                        { id: "security", icon: Shield, label: t("security") },
                        { id: "appearance", icon: Palette, label: t("appearance") },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSettingsSection(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            settingsSection === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                          }`}
                        >
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card lg:col-span-3">
                  <CardContent className="p-6">
                    {settingsSection === "profile" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("profile")}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t("full_name")}</Label>
                            <Input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("email")}</Label>
                            <Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} placeholder="student@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("phone")}</Label>
                            <Input value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                          </div>
                        </div>
                        <Button onClick={() => toast.success(t("profile_updated"))}>
                          <Save className="w-4 h-4 mr-2" />
                          {t("save_changes")}
                        </Button>
                      </div>
                    )}

                    {settingsSection === "notifications" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("notifications")}</h3>
                        <div className="space-y-4">
                          {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <Label className="capitalize">{key} {t("notifications")}</Label>
                              <Switch checked={value} onCheckedChange={(checked) => setNotifications({...notifications, [key]: checked})} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {settingsSection === "security" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("security")}</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>{t("current_password")}</Label>
                            <Input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("new_password")}</Label>
                            <Input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("confirm_password")}</Label>
                            <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} />
                          </div>
                        </div>
                        <Button onClick={() => toast.success(t("password_changed"))}>
                          <Lock className="w-4 h-4 mr-2" />
                          {t("change_password")}
                        </Button>
                      </div>
                    )}

                    {settingsSection === "appearance" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("appearance")}</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <Label>{t("language")}</Label>
                              <p className="text-sm text-muted-foreground">
                                {language === "ar" ? "اختر لغتك المفضلة" : "Choose your preferred language"}
                              </p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant={language === "ar" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ar")}>
                                العربية
                              </Button>
                              <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                                English
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </main>
      </div>

      {selectedFee && (
        <FeePaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          studentId={studentId}
          studentName={`${student.firstName} ${student.surname}`}
          amount={selectedFee.structure.amount - (selectedFee.payment?.amount || 0)}
          feeType={selectedFee.structure.name}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
