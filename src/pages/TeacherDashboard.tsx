import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  Users, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  Upload,
  GraduationCap,
  Save,
  Calendar,
  Settings,
  TrendingUp,
  Shield,
  Palette,
  Lock,
  Globe,
  Wallet,
  DollarSign,
  CreditCard,
  ArrowDownToLine
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsSection, setSettingsSection] = useState("profile");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [withdrawalModalOpen, setWithdrawalModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const navigate = useNavigate();
  const { timetable, currentUser, requestWithdrawal, logout } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  const teacher = currentUser as any || { name: "Mr. Ahmed Ibrahim", email: "ahmed@daruulum.edu", subjects: ["Mathematics"], classes: ["JSS 1A", "JSS 2A"], salary: { basic: 150000, allowances: 30000, deductions: 15000, withdrawableBalance: 165000, accountNumber: "1234567890", bankName: "First Bank" } };
  const teacherName = teacher?.name || "Mr. Ahmed Ibrahim";
  const teacherClasses = teacher?.classes || ["JSS 1A", "JSS 1B", "JSS 2A", "JSS 2B"];
  const teacherSubjects = teacher?.subjects || ["Mathematics"];
  const salary = teacher?.salary || { basic: 150000, allowances: 30000, deductions: 15000, withdrawableBalance: 165000 };

  // Filter timetable for this teacher
  const myTimetable = timetable.filter(t => t.teacher === teacherName);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const dayTranslations: Record<string, string> = {
    Monday: t("monday"),
    Tuesday: t("tuesday"),
    Wednesday: t("wednesday"),
    Thursday: t("thursday"),
    Friday: t("friday"),
  };

  const handleLogout = () => {
    logout();
    toast.success(t("logout") + " successful");
    navigate("/");
  };

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount);
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (amount > salary.withdrawableBalance) {
      toast.error("Amount exceeds available balance");
      return;
    }
    requestWithdrawal(teacher.id, amount, salary.accountNumber || "", salary.bankName || "");
    toast.success("Withdrawal request submitted!");
    setWithdrawalModalOpen(false);
    setWithdrawalAmount("");
  };

  const students = [
    { id: 1, name: "Ahmad Ibrahim", regNo: "DU/2024/001", ca1: 15, ca2: 18, exam: 55 },
    { id: 2, name: "Fatima Yusuf", regNo: "DU/2024/002", ca1: 18, ca2: 20, exam: 60 },
    { id: 3, name: "Muhammad Ali", regNo: "DU/2024/003", ca1: 12, ca2: 15, exam: 45 },
    { id: 4, name: "Aisha Bello", regNo: "DU/2024/004", ca1: 20, ca2: 19, exam: 58 },
    { id: 5, name: "Umar Suleiman", regNo: "DU/2024/005", ca1: 14, ca2: 16, exam: 50 },
  ];

  const [scores, setScores] = useState(students.map(s => ({ id: s.id, ca1: s.ca1, ca2: s.ca2, exam: s.exam })));
  const [profileData, setProfileData] = useState({ name: teacherName, email: teacher?.email || "", phone: "+234 801 234 5678" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, announcements: true, results: true });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const updateScore = (studentId: number, field: string, value: string) => {
    setScores(prev => prev.map(s => s.id === studentId ? { ...s, [field]: parseInt(value) || 0 } : s));
  };

  const handleSaveResults = () => {
    toast.success("Results saved successfully!");
  };

  const menuItems = [
    { icon: TrendingUp, label: t("dashboard"), id: "dashboard" },
    { icon: Users, label: "My Classes", id: "classes" },
    { icon: Calendar, label: t("timetable"), id: "timetable" },
    { icon: FileText, label: "Upload Results", id: "results" },
    { icon: Wallet, label: t("salary"), id: "salary" },
    { icon: Bell, label: t("announcements"), id: "announcements" },
    { icon: Settings, label: t("settings"), id: "settings" },
  ];

  const myClasses = teacherClasses.map((cls: string) => ({
    class: cls,
    subject: teacherSubjects[0] || "Mathematics",
    students: Math.floor(Math.random() * 10) + 30
  }));

  return (
    <div className="min-h-screen bg-muted/30" dir={direction}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} h-full w-64 bg-card border-${direction === "rtl" ? "l" : "r"} border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-success-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              {language === "ar" ? "بوابة المعلم" : "Teacher Portal"}
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-success text-success-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
                <h1 className="font-bold text-lg text-foreground">{teacherName}</h1>
                <p className="text-sm text-muted-foreground">{teacherSubjects.join(", ")} {t("teacher")}</p>
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
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center text-success-foreground font-semibold">
                {teacherName.charAt(0)}
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
                        <p className="text-sm text-muted-foreground mb-1">My Classes</p>
                        <p className="text-3xl font-bold text-foreground">{teacherClasses.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-success" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("total_students")}</p>
                        <p className="text-3xl font-bold text-foreground">{myClasses.reduce((sum: number, c: any) => sum + c.students, 0)}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <GraduationCap className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Subjects</p>
                        <p className="text-3xl font-bold text-foreground">{teacherSubjects.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-warning" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t("available_balance")}</p>
                        <p className="text-3xl font-bold text-foreground">₦{salary.withdrawableBalance?.toLocaleString()}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Wallet className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {myClasses.map((cls: any, index: number) => (
                  <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-success" />
                        </div>
                        <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full font-medium">
                          {cls.students} {t("students").toLowerCase()}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground">{cls.class}</h3>
                      <p className="text-sm text-muted-foreground">{cls.subject}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "classes" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">My Classes</h1>
                <p className="text-muted-foreground">View and manage your assigned classes</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myClasses.map((cls: any, index: number) => (
                  <Card key={index} className="border-none shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center">
                          <Users className="w-6 h-6 text-success" />
                        </div>
                        <Badge variant="secondary">{cls.students} {t("students").toLowerCase()}</Badge>
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-1">{cls.class}</h3>
                      <p className="text-muted-foreground mb-4">{cls.subject}</p>
                      <Button variant="outline" className="w-full" onClick={() => { setActiveTab("results"); setSelectedClass(cls.class.toLowerCase().replace(" ", "")); }}>
                        <FileText className="w-4 h-4 mr-2" />
                        Upload Results
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === "timetable" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("timetable")}</h1>
                <p className="text-muted-foreground">Your teaching schedule</p>
              </div>
              <div className="space-y-6">
                {days.map((day) => {
                  const dayEntries = myTimetable.filter(t => t.day === day).sort((a, b) => a.time.localeCompare(b.time));
                  return (
                    <Card key={day} className="border-none shadow-card">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-success" />
                          {dayTranslations[day]}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {dayEntries.length === 0 ? (
                          <p className="text-muted-foreground text-sm">No classes scheduled</p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {dayEntries.map((entry) => (
                              <div key={entry.id} className="p-4 rounded-lg bg-success/5 border border-success/20">
                                <Badge variant="secondary" className="mb-2">{entry.time}</Badge>
                                <h4 className="font-semibold text-foreground">{entry.subject}</h4>
                                <p className="text-sm text-muted-foreground">{entry.class}</p>
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

          {activeTab === "results" && (
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-success" />
                  Upload Student Results
                </CardTitle>
                <CardDescription>Enter or update student scores for the selected class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="space-y-2">
                    <Label>Select {t("class")}</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherClasses.map((cls: string) => (
                          <SelectItem key={cls} value={cls.toLowerCase().replace(" ", "")}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Select {t("subject")}</Label>
                    <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {teacherSubjects.map((sub: string) => (
                          <SelectItem key={sub} value={sub.toLowerCase()}>{sub}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{t("term")}</Label>
                    <Select defaultValue="first">
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="first">First Term</SelectItem>
                        <SelectItem value="second">Second Term</SelectItem>
                        <SelectItem value="third">Third Term</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Reg. No</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Student Name</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">CA1 (20)</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">CA2 (20)</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Exam (60)</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => {
                        const scoreData = scores.find(s => s.id === student.id) || { ca1: 0, ca2: 0, exam: 0 };
                        const total = scoreData.ca1 + scoreData.ca2 + scoreData.exam;
                        return (
                          <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-4 text-muted-foreground font-mono">{student.regNo}</td>
                            <td className="py-3 px-4 font-medium text-foreground">{student.name}</td>
                            <td className="py-3 px-4 text-center">
                              <Input type="number" value={scoreData.ca1} onChange={(e) => updateScore(student.id, "ca1", e.target.value)} className="w-16 h-8 text-center mx-auto" min="0" max="20" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Input type="number" value={scoreData.ca2} onChange={(e) => updateScore(student.id, "ca2", e.target.value)} className="w-16 h-8 text-center mx-auto" min="0" max="20" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Input type="number" value={scoreData.exam} onChange={(e) => updateScore(student.id, "exam", e.target.value)} className="w-16 h-8 text-center mx-auto" min="0" max="60" />
                            </td>
                            <td className="py-3 px-4 text-center font-bold text-foreground">{total}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveResults}>
                    <Save className="w-4 h-4 mr-2" />
                    {t("save")} Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "salary" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("salary")}</h1>
                <p className="text-muted-foreground">{t("salary_structure")} & {t("withdraw")}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("basic_salary")}</p>
                    <p className="text-2xl font-bold text-foreground">₦{salary.basic?.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("allowances")}</p>
                    <p className="text-2xl font-bold text-success">₦{salary.allowances?.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("deductions")}</p>
                    <p className="text-2xl font-bold text-destructive">₦{salary.deductions?.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card bg-gradient-to-br from-primary/10 to-primary/5">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{t("net_salary")}</p>
                    <p className="text-2xl font-bold text-primary">₦{(salary.basic + salary.allowances - salary.deductions)?.toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-success" />
                    {t("available_balance")}
                  </CardTitle>
                  <CardDescription>Request withdrawal to your registered bank account</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <p className="text-4xl font-bold text-foreground mb-2">₦{salary.withdrawableBalance?.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">
                        Bank: {salary.bankName || "Not set"} • Account: {salary.accountNumber || "Not set"}
                      </p>
                    </div>
                    <Button size="lg" onClick={() => setWithdrawalModalOpen(true)} disabled={!salary.withdrawableBalance || salary.withdrawableBalance <= 0}>
                      <ArrowDownToLine className="w-5 h-5 mr-2" />
                      {t("withdraw")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "announcements" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("announcements")}</h1>
                <p className="text-muted-foreground">School news and updates</p>
              </div>
              <Card className="border-none shadow-card">
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No announcements</h3>
                  <p className="text-muted-foreground">Check back later for updates</p>
                </CardContent>
              </Card>
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
                        { id: "profile", icon: BookOpen, label: t("profile") },
                        { id: "notifications", icon: Bell, label: t("notifications") },
                        { id: "security", icon: Shield, label: t("security") },
                        { id: "appearance", icon: Palette, label: t("appearance") },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSettingsSection(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            settingsSection === item.id ? 'bg-success text-success-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
                            <Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
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

      {/* Withdrawal Modal */}
      <Dialog open={withdrawalModalOpen} onOpenChange={setWithdrawalModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("withdraw")} Funds</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Amount (₦)</Label>
              <Input
                type="number"
                value={withdrawalAmount}
                onChange={(e) => setWithdrawalAmount(e.target.value)}
                placeholder="Enter amount"
                max={salary.withdrawableBalance}
              />
              <p className="text-xs text-muted-foreground">
                {t("available_balance")}: ₦{salary.withdrawableBalance?.toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Bank Account</Label>
              <p className="text-sm text-foreground">{salary.bankName} - {salary.accountNumber}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setWithdrawalModalOpen(false)}>{t("cancel")}</Button>
            <Button onClick={handleWithdrawal}>{t("confirm")} {t("withdraw")}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
