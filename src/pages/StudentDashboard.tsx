import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
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
  Globe,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { StudentChat } from "@/components/StudentChat";
import { StudentForum } from "@/components/StudentForum";
import { FeePaymentModal } from "@/components/modals/FeePaymentModal";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsSection, setSettingsSection] = useState("profile");
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState<any>(null);
  const navigate = useNavigate();
  const { timetable, feeStructures, feePayments, addFeePayment, currentUser, logout } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  // Get current student data
  const student = currentUser as any || { firstName: "Ahmad", surname: "Ibrahim", class: "JSS 1A", id: "s1" };
  const studentClass = student?.class || "JSS 1A";
  const studentId = student?.id || "s1";

  // Filter timetable for student's class
  const myTimetable = timetable.filter(t => t.class === studentClass);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const dayTranslations: Record<string, string> = {
    Monday: t("monday"),
    Tuesday: t("tuesday"),
    Wednesday: t("wednesday"),
    Thursday: t("thursday"),
    Friday: t("friday"),
  };

  // Get student fees
  const classLevel = studentClass.startsWith("SSS") ? "SSS" : "JSS";
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
    toast.success(t("logout") + " successful");
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

  const subjects = [
    { name: "Mathematics", score: 85, grade: "A", teacher: "Mr. Ahmed" },
    { name: "English", score: 78, grade: "B+", teacher: "Mrs. Fatima" },
    { name: "Islamic Studies", score: 92, grade: "A+", teacher: "Ustaz Ibrahim" },
    { name: "Science", score: 80, grade: "A-", teacher: "Dr. Musa" },
    { name: "Arabic", score: 88, grade: "A", teacher: "Ustaz Yusuf" },
    { name: "Social Studies", score: 75, grade: "B+", teacher: "Mrs. Zainab" },
  ];

  const announcements = [
    { title: "Mid-term exams start next week", date: "Dec 28, 2024", urgent: true },
    { title: "Sports day registration open", date: "Dec 25, 2024", urgent: false },
    { title: "Parent-teacher meeting scheduled", date: "Dec 22, 2024", urgent: false },
  ];

  const menuItems = [
    { icon: TrendingUp, label: t("dashboard"), id: "dashboard" },
    { icon: FileText, label: t("results"), id: "results" },
    { icon: Calendar, label: t("timetable"), id: "timetable" },
    { icon: CreditCard, label: t("fees"), id: "fees" },
    { icon: MessageSquare, label: t("chat"), id: "chat" },
    { icon: Users, label: t("forum"), id: "forum" },
    { icon: Bell, label: t("announcements"), id: "announcements" },
    { icon: Settings, label: t("settings"), id: "settings" },
  ];

  return (
    <div className="min-h-screen bg-muted/30" dir={direction}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} h-full w-64 bg-card border-${direction === "rtl" ? "l" : "r"} border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              {language === "ar" ? "بوابة الطالب" : "Student Portal"}
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            {t("logout")}
          </Button>
        </div>
      </aside>

      <div className={`${direction === "rtl" ? "lg:mr-64" : "lg:ml-64"}`}>
        <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 text-foreground" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-bold text-lg text-foreground">{t("welcome_back")}, {student.firstName}!</h1>
                <p className="text-sm text-muted-foreground">{studentClass} • 2024/2025 {t("session")}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLanguage(language === "en" ? "ar" : "en")}
                title={t("language")}
              >
                <Globe className="w-5 h-5" />
              </Button>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                {student.firstName?.charAt(0) || "A"}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("average")}</p>
                        <p className="text-3xl font-bold text-foreground">83%</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                        <p className="text-3xl font-bold text-foreground">96%</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("position")}</p>
                        <p className="text-3xl font-bold text-foreground">5th</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                        <Award className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("balance")}</p>
                        <p className="text-3xl font-bold text-foreground">₦{(totalFees - totalPaid).toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>{t("results")}</CardTitle>
                      <CardDescription>First Term 2024/2025</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t("subject")}</th>
                            <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t("teacher")}</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("score")}</th>
                            <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("grade")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {subjects.map((subject, index) => (
                            <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                              <td className="py-3 px-4 font-medium text-foreground">{subject.name}</td>
                              <td className="py-3 px-4 text-muted-foreground">{subject.teacher}</td>
                              <td className="py-3 px-4 text-center">
                                <span className={`font-semibold ${subject.score >= 80 ? 'text-success' : subject.score >= 60 ? 'text-warning' : 'text-destructive'}`}>
                                  {subject.score}%
                                </span>
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-primary/10 text-primary font-bold text-sm">
                                  {subject.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5 text-primary" />
                      {t("announcements")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {announcements.map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg ${item.urgent ? 'bg-destructive/10 border border-destructive/20' : 'bg-muted'}`}>
                        <p className="font-medium text-foreground text-sm mb-1">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeTab === "results" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("results")}</h1>
                <p className="text-muted-foreground">View your academic performance</p>
              </div>
              <Card className="border-none shadow-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>First Term 2024/2025</CardTitle>
                    <CardDescription>Detailed results breakdown</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t("subject")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">CA1 (20)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">CA2 (20)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Exam (60)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
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
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("timetable")}</h1>
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
                          {dayTranslations[day]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {dayEntries.length === 0 ? (
                          <p className="text-muted-foreground text-sm">No classes scheduled</p>
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

          {activeTab === "fees" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("fees")}</h1>
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
                  <CardDescription>First Term 2024/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fee Type</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">{t("amount_paid")}</th>
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
                              <td className="py-3 px-4 text-right text-foreground">₦{fee.structure.amount.toLocaleString()}</td>
                              <td className="py-3 px-4 text-right text-muted-foreground">₦{amountPaid.toLocaleString()}</td>
                              <td className="py-3 px-4 text-center">
                                <Badge variant={status === "paid" ? "default" : status === "partial" ? "secondary" : "destructive"}>
                                  {status === "paid" ? (
                                    <><CheckCircle className="w-3 h-3 mr-1" /> Paid</>
                                  ) : status === "partial" ? (
                                    "Partial"
                                  ) : (
                                    <><XCircle className="w-3 h-3 mr-1" /> Unpaid</>
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
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("chat")}</h1>
                <p className="text-muted-foreground">Connect with your classmates</p>
              </div>
              <StudentChat />
            </>
          )}

          {activeTab === "forum" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("forum")}</h1>
                <p className="text-muted-foreground">Academic discussions and study groups</p>
              </div>
              <StudentForum />
            </>
          )}

          {activeTab === "announcements" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("announcements")}</h1>
                <p className="text-muted-foreground">School news and updates</p>
              </div>
              <div className="space-y-4">
                {announcements.map((item, index) => (
                  <Card key={index} className={`border-none shadow-card ${item.urgent ? 'border-l-4 border-l-destructive' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.date}</p>
                        </div>
                        {item.urgent && <Badge variant="destructive">Urgent</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "settings" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("settings")}</h1>
                <p className="text-muted-foreground">Manage your account preferences</p>
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
                            <Label>Full Name</Label>
                            <Input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} placeholder="student@email.com" />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                          </div>
                        </div>
                        <Button onClick={() => toast.success("Profile updated!")}>
                          <Save className="w-4 h-4 mr-2" />
                          {t("save")} Changes
                        </Button>
                      </div>
                    )}

                    {settingsSection === "notifications" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("notifications")}</h3>
                        <div className="space-y-4">
                          {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <Label className="capitalize">{key} Notifications</Label>
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
                            <Label>Current Password</Label>
                            <Input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} />
                          </div>
                        </div>
                        <Button onClick={() => toast.success("Password updated!")}>
                          <Lock className="w-4 h-4 mr-2" />
                          Update Password
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
                              <p className="text-sm text-muted-foreground">Choose your preferred language</p>
                            </div>
                            <div className="flex gap-2">
                              <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>
                                🇬🇧 {t("english")}
                              </Button>
                              <Button variant={language === "ar" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ar")}>
                                🇸🇦 {t("arabic")}
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
