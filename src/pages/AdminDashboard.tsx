import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Users, GraduationCap, BookOpen, FileText, Bell, LogOut, Menu, UserPlus, Settings,
  TrendingUp, Calendar, CheckCircle, XCircle, Clock, CreditCard, DollarSign, Search,
  Plus, Edit, Shield, Palette, Lock, Save, Megaphone, Trash2, Eye, EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData, FeeStructure, TimetableEntry, Announcement } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AddStudentModal } from "@/components/modals/AddStudentModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { FeePaymentModal } from "@/components/modals/FeePaymentModal";
import { DataTable } from "@/components/DataTable";
import { TimetableModal } from "@/components/modals/TimetableModal";
import { AnnouncementModal } from "@/components/modals/AnnouncementModal";
import { FeeStructureModal } from "@/components/modals/FeeStructureModal";
import logo from "@/assets/logo.png";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsSection, setSettingsSection] = useState("profile");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; studentId: string; action: string }>({ open: false, studentId: "", action: "" });
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [timetableMode, setTimetableMode] = useState<"add" | "edit">("add");
  const [selectedTimetableEntry, setSelectedTimetableEntry] = useState<TimetableEntry | null>(null);
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementMode, setAnnouncementMode] = useState<"add" | "edit">("add");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [feeMode, setFeeMode] = useState<"add" | "edit">("add");
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);
  const navigate = useNavigate();
  const { 
    students, teachers, timetable, feeStructures, feePayments, announcements,
    approveStudent, suspendStudent, activateStudent, addFeePayment, updateFeeStructure,
    addFeeStructure, deleteTimetableEntry, deleteAnnouncement, updateAnnouncement, logout 
  } = useDemoData();
  const { t, language, setLanguage, direction, translateFeeType } = useLanguage();

  const handleLogout = () => {
    logout();
    toast.success(language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logout successful");
    navigate("/");
  };

  const pendingStudents = students.filter(s => s.status === "pending");
  const activeStudents = students.filter(s => s.status === "active");
  const activeTeachers = teachers.filter(t => t.status === "active");

  const stats = [
    { label: t("total_students"), value: students.length.toString(), icon: GraduationCap, color: "primary", change: "+12%" },
    { label: t("active_teachers"), value: activeTeachers.length.toString(), icon: Users, color: "success", change: "+3%" },
    { label: t("pending_approvals"), value: pendingStudents.length.toString(), icon: Clock, color: "warning", change: pendingStudents.length > 0 ? "!" : "✓" },
    { label: t("active_classes"), value: "10", icon: BookOpen, color: "accent", change: "0%" },
  ];

  const handleApprove = (studentId: string) => {
    approveStudent(studentId);
    toast.success(t("student_approved"));
    setConfirmModal({ open: false, studentId: "", action: "" });
  };

  const handleReject = (studentId: string) => {
    suspendStudent(studentId);
    toast.success(t("student_rejected"));
    setConfirmModal({ open: false, studentId: "", action: "" });
  };

  const handleRecordPayment = (student: any) => {
    setSelectedStudent(student);
    setPaymentModalOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    if (selectedStudent) {
      const classLevel = selectedStudent.class.includes("توجيهي") ? "توجيهي" : selectedStudent.class.includes("إعدادي") ? "إعدادي" : "تمهيدي";
      const tuitionFee = feeStructures.find(f => f.classLevel === classLevel || f.classLevel === "All");
      if (tuitionFee) {
        addFeePayment({
          studentId: selectedStudent.id,
          feeId: tuitionFee.id,
          amount: paymentData.amount,
          paidDate: new Date().toISOString().split("T")[0],
          paymentMethod: paymentData.paymentMethod,
          reference: paymentData.reference,
          status: paymentData.amount >= tuitionFee.amount ? "paid" : "partial"
        });
      }
    }
  };

  const openEditTimetable = (entry: TimetableEntry) => {
    setSelectedTimetableEntry(entry);
    setTimetableMode("edit");
    setTimetableModalOpen(true);
  };

  const openAddTimetable = () => {
    setSelectedTimetableEntry(null);
    setTimetableMode("add");
    setTimetableModalOpen(true);
  };

  const openEditAnnouncement = (ann: Announcement) => {
    setSelectedAnnouncement(ann);
    setAnnouncementMode("edit");
    setAnnouncementModalOpen(true);
  };

  const openAddAnnouncement = () => {
    setSelectedAnnouncement(null);
    setAnnouncementMode("add");
    setAnnouncementModalOpen(true);
  };

  const openEditFee = (fee: FeeStructure) => {
    setSelectedFee(fee);
    setFeeMode("edit");
    setFeeModalOpen(true);
  };

  const openAddFee = () => {
    setSelectedFee(null);
    setFeeMode("add");
    setFeeModalOpen(true);
  };

  const menuItems = [
    { icon: TrendingUp, label: t("dashboard"), id: "dashboard" },
    { icon: GraduationCap, label: t("students"), id: "students" },
    { icon: Clock, label: t("pending_approvals"), id: "pending", badge: pendingStudents.length },
    { icon: Users, label: t("teachers"), id: "teachers" },
    { icon: Calendar, label: t("timetable"), id: "timetable" },
    { icon: CreditCard, label: t("fees"), id: "fees" },
    { icon: Megaphone, label: t("announcements"), id: "announcements" },
    { icon: FileText, label: t("reports"), id: "reports" },
    { icon: Settings, label: t("settings"), id: "settings" },
  ];

  const filteredStudents = students.filter(s => 
    s.firstName.includes(searchQuery) || s.surname.includes(searchQuery) || s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [profileData, setProfileData] = useState({ name: language === "ar" ? "مدير النظام" : "Admin User", email: "admin@daruulum.edu", phone: "+234 801 234 5678" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, announcements: true, fees: true });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const timetableColumns = [
    { key: "day", header: t("day"), sortable: true, filterable: true },
    { key: "time", header: t("time"), sortable: true },
    { key: "subject", header: t("subject"), sortable: true, filterable: true },
    { key: "teacher", header: t("teacher"), sortable: true, filterable: true },
    { key: "class", header: t("class"), sortable: true, filterable: true },
    { key: "room", header: t("room"), sortable: true },
    {
      key: "actions",
      header: t("actions"),
      render: (item: TimetableEntry) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => openEditTimetable(item)}>
            <Edit className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-destructive" onClick={() => {
            deleteTimetableEntry(item.id);
            toast.success(t("entry_deleted"));
          }}>
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  const totalExpected = students.filter(s => s.status === "active").length * feeStructures.reduce((sum, f) => sum + f.amount, 0);
  const totalCollected = feePayments.reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-muted/30" dir={direction}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} h-full w-64 bg-card border-${direction === "rtl" ? "l" : "r"} border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Daru Ulum" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-bold text-foreground block">
                {language === "ar" ? "دار العلوم" : "Daru Ulum"}
              </span>
              <span className="text-xs text-muted-foreground">
                {language === "ar" ? "بوابة المدير" : "Admin Portal"}
              </span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-warning text-warning-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <Badge variant="destructive" className={`${direction === "rtl" ? "mr-auto" : "ml-auto"}`}>{item.badge}</Badge>
              )}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card">
          <div className="flex gap-1 mb-3 justify-center">
            <Button variant={language === "ar" ? "default" : "ghost"} size="sm" className="h-8 px-3" onClick={() => setLanguage("ar")}>AR</Button>
            <Button variant={language === "en" ? "default" : "ghost"} size="sm" className="h-8 px-3" onClick={() => setLanguage("en")}>EN</Button>
          </div>
          <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10" onClick={handleLogout}>
            <LogOut className="w-5 h-5" />
            <span className={direction === "rtl" ? "mr-3" : "ml-3"}>{t("logout")}</span>
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
              <div className="relative hidden md:block">
                <Search className={`absolute ${direction === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                <Input
                  placeholder={t("search") + "..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-80 ${direction === "rtl" ? "pr-10" : "pl-10"} h-10`}
                />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                {pendingStudents.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center text-warning-foreground font-semibold">
                {language === "ar" ? "م" : "A"}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("dashboard")}</h1>
                  <p className="text-muted-foreground">{t("welcome_back")}! {t("whats_happening")}</p>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <Button variant="default" onClick={() => setAddStudentOpen(true)}>
                    <UserPlus className="w-4 h-4" />
                    <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("add_student")}</span>
                  </Button>
                  <Button variant="outline" onClick={openAddAnnouncement}>
                    <Megaphone className="w-4 h-4" />
                    <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("push_announcement")}</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                        </div>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                          stat.change === '!' ? 'bg-warning/10 text-warning' :
                          stat.change.startsWith('+') ? 'bg-success/10 text-success' : 
                          'bg-muted text-muted-foreground'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {pendingStudents.length > 0 && (
                <Card className="border-none shadow-card mb-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-warning" />
                        {t("pending_approvals")}
                      </CardTitle>
                      <CardDescription>{t("students_waiting")}</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("pending")}>{t("view_all")}</Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingStudents.slice(0, 3).map((student) => (
                        <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning font-semibold">
                              {student.firstName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{student.firstName} {student.surname}</p>
                              <p className="text-sm text-muted-foreground">{student.class} • {student.dateRegistered}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-success hover:text-success hover:bg-success/10" onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "approve" })}>
                              <CheckCircle className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "reject" })}>
                              <XCircle className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Recent Announcements */}
              <Card className="border-none shadow-card mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-primary" />
                    {t("latest_announcements")}
                  </CardTitle>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab("announcements")}>{t("view_all")}</Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {announcements.slice(0, 3).map((ann) => (
                      <div key={ann.id} className={`p-4 rounded-lg ${ann.category === "urgent" ? "bg-destructive/5 border border-destructive/20" : "bg-muted/50"}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium text-foreground">{ann.title}</p>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{ann.content}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="secondary" className="text-xs">{ann.targetAudience === "all" ? t("all_users") : ann.targetAudience === "students" ? t("students_only") : t("teachers_only")}</Badge>
                              <span className="text-xs text-muted-foreground">{ann.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>{t("quick_actions")}</CardTitle>
                  <CardDescription>{t("common_tasks")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("students")}>
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <span>{t("students")}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("teachers")}>
                      <Users className="w-6 h-6 text-success" />
                      <span>{t("teachers")}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("fees")}>
                      <CreditCard className="w-6 h-6 text-warning" />
                      <span>{t("fees")}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("timetable")}>
                      <Calendar className="w-6 h-6 text-primary" />
                      <span>{t("timetable")}</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={openAddAnnouncement}>
                      <Megaphone className="w-6 h-6 text-destructive" />
                      <span>{t("push_announcement")}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Pending Approvals */}
          {activeTab === "pending" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("pending_approvals")}</h1>
                <p className="text-muted-foreground">{t("students_waiting")}</p>
              </div>
              {pendingStudents.length === 0 ? (
                <Card className="border-none shadow-card">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">{t("all_caught_up")}</h3>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-card">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("students")}</th>
                            <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("class")}</th>
                            <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("parent_name")}</th>
                            <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("date_registered")}</th>
                            <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingStudents.map((student) => (
                            <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center text-warning font-semibold">
                                    {student.firstName.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-medium text-foreground">{student.firstName} {student.surname}</p>
                                    <p className="text-sm text-muted-foreground">{student.dob}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-4 px-6 text-foreground">{student.class}</td>
                              <td className="py-4 px-6">
                                <p className="text-foreground">{student.parentName}</p>
                                <p className="text-sm text-muted-foreground">{student.parentPhone}</p>
                              </td>
                              <td className="py-4 px-6 text-muted-foreground">{student.dateRegistered}</td>
                              <td className="py-4 px-6">
                                <div className="flex items-center justify-center gap-2">
                                  <Button variant="default" size="sm" onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "approve" })}>
                                    <CheckCircle className="w-4 h-4" />
                                    <span className={direction === "rtl" ? "mr-1" : "ml-1"}>{t("approve")}</span>
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "reject" })}>
                                    <XCircle className="w-4 h-4" />
                                    <span className={direction === "rtl" ? "mr-1" : "ml-1"}>{t("reject")}</span>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          {/* Students */}
          {activeTab === "students" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("student_management")}</h1>
                  <p className="text-muted-foreground">{language === "ar" ? "إدارة جميع الطلاب المسجلين" : "Manage all registered students"}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddStudentOpen(true)}>
                  <UserPlus className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("add_student")}</span>
                </Button>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-6">
                  <DataTable
                    data={filteredStudents}
                    columns={[
                      { 
                        key: "name", header: t("students"), sortable: true,
                        render: (item) => (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {item.firstName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{item.firstName} {item.surname}</p>
                              <p className="text-sm text-muted-foreground">{item.parentPhone}</p>
                            </div>
                          </div>
                        )
                      },
                      { key: "regNo", header: t("reg_no"), sortable: true },
                      { key: "class", header: t("class"), sortable: true, filterable: true },
                      { 
                        key: "status", header: t("status"), sortable: true, filterable: true,
                        render: (item) => (
                          <Badge variant={item.status === 'active' ? 'default' : item.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize">
                            {item.status === "active" ? t("active") : item.status === "pending" ? t("pending") : t("suspended")}
                          </Badge>
                        )
                      },
                      {
                        key: "actions", header: t("actions"),
                        render: (item) => (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleRecordPayment(item)}>
                              <CreditCard className="w-4 h-4" />
                              <span className={direction === "rtl" ? "mr-1" : "ml-1"}>{t("record_payment")}</span>
                            </Button>
                            {item.status === "active" ? (
                              <Button variant="ghost" size="sm" className="text-warning" onClick={() => { suspendStudent(item.id); toast.success(t("suspended")); }}>
                                <EyeOff className="w-4 h-4" />
                              </Button>
                            ) : item.status !== "pending" ? (
                              <Button variant="ghost" size="sm" className="text-success" onClick={() => { activateStudent(item.id); toast.success(t("active")); }}>
                                <Eye className="w-4 h-4" />
                              </Button>
                            ) : null}
                          </div>
                        )
                      }
                    ]}
                    searchPlaceholder={t("search") + " " + t("students").toLowerCase() + "..."}
                    pageSize={10}
                  />
                </CardContent>
              </Card>
            </>
          )}

          {/* Teachers */}
          {activeTab === "teachers" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("teachers")}</h1>
                <p className="text-muted-foreground">{language === "ar" ? "عرض جميع المعلمين وتخصصاتهم" : "View all teachers and their assignments"}</p>
              </div>
              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("teacher")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("email")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("subjects")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("class")}</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("status")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((teacher) => (
                          <tr key={teacher.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success font-semibold">
                                  {teacher.name.charAt(0)}
                                </div>
                                <span className="font-medium text-foreground">{teacher.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground">{teacher.email}</td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.subjects.map((subject, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{subject}</Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.classes.map((cls, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{cls}</Badge>
                                ))}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Badge variant={teacher.status === 'active' ? 'default' : 'destructive'}>
                                {teacher.status === "active" ? t("active") : t("suspended")}
                              </Badge>
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

          {/* Timetable */}
          {activeTab === "timetable" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("timetable")}</h1>
                  <p className="text-muted-foreground">{t("organize_by_day")}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddTimetable}>
                  <Plus className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("add_entry")}</span>
                </Button>
              </div>
              <Card className="border-none shadow-card">
                <CardContent className="p-6">
                  <DataTable data={timetable} columns={timetableColumns} searchPlaceholder={t("search") + " " + t("timetable").toLowerCase() + "..."} pageSize={15} />
                </CardContent>
              </Card>
            </>
          )}

          {/* Fees */}
          {activeTab === "fees" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("fee_management")}</h1>
                  <p className="text-muted-foreground">{language === "ar" ? "إدارة هيكل الرسوم والمدفوعات" : "Manage fee structures and payments"}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddFee}>
                  <Plus className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{language === "ar" ? "إضافة رسوم" : "Add Fee"}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{language === "ar" ? "الإجمالي المتوقع" : "Total Expected"}</p>
                    <p className="text-2xl font-bold text-foreground">₦{totalExpected.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{language === "ar" ? "إجمالي المحصّل" : "Total Collected"}</p>
                    <p className="text-2xl font-bold text-success">₦{totalCollected.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">{language === "ar" ? "المستحقات" : "Outstanding"}</p>
                    <p className="text-2xl font-bold text-destructive">₦{(totalExpected - totalCollected).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-card mb-6">
                <CardHeader>
                  <CardTitle>{t("fee_structure")}</CardTitle>
                  <CardDescription>{language === "ar" ? "تكوين الرسوم لمراحل مختلفة" : "Configure fees for different levels"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("fee_type")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("class")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("term")}</th>
                          <th className={`${direction === "rtl" ? "text-left" : "text-right"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("amount")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructures.map((fee) => (
                          <tr key={fee.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-foreground">{translateFeeType(fee.name)}</td>
                            <td className="py-3 px-4"><Badge variant="outline">{fee.classLevel}</Badge></td>
                            <td className="py-3 px-4 text-muted-foreground">{fee.term}</td>
                            <td className={`py-3 px-4 ${direction === "rtl" ? "text-left" : "text-right"} font-semibold text-foreground`}>₦{fee.amount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-center">
                              <Button variant="ghost" size="sm" onClick={() => openEditFee(fee)}>
                                <Edit className="w-4 h-4" />
                              </Button>
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
                  <CardTitle>{language === "ar" ? "المدفوعات الأخيرة" : "Recent Payments"}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("students")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("fee_type")}</th>
                          <th className={`${direction === "rtl" ? "text-left" : "text-right"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("amount")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-3 px-4 text-sm font-semibold text-muted-foreground`}>{t("date_registered")}</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">{t("status")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feePayments.slice(-5).map((payment) => {
                          const student = students.find(s => s.id === payment.studentId);
                          const fee = feeStructures.find(f => f.id === payment.feeId);
                          return (
                            <tr key={payment.id} className="border-b border-border/50 hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium text-foreground">{student?.firstName} {student?.surname}</td>
                              <td className="py-3 px-4 text-muted-foreground">{fee ? translateFeeType(fee.name) : "-"}</td>
                              <td className={`py-3 px-4 ${direction === "rtl" ? "text-left" : "text-right"} font-semibold text-foreground`}>₦{payment.amount.toLocaleString()}</td>
                              <td className="py-3 px-4 text-muted-foreground">{payment.paidDate}</td>
                              <td className="py-3 px-4 text-center">
                                <Badge variant={payment.status === 'paid' ? 'default' : payment.status === 'partial' ? 'secondary' : 'destructive'}>
                                  {payment.status === "paid" ? t("paid") : payment.status === "partial" ? t("partial") : t("unpaid")}
                                </Badge>
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

          {/* Announcements */}
          {activeTab === "announcements" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("announcements")}</h1>
                  <p className="text-muted-foreground">{language === "ar" ? "إدارة ونشر الإعلانات للطلاب والمعلمين" : "Manage and push notifications to students and teachers"}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddAnnouncement}>
                  <Megaphone className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("push_announcement")}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-foreground">{announcements.length}</p>
                    <p className="text-sm text-muted-foreground">{language === "ar" ? "إجمالي الإعلانات" : "Total Announcements"}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-success">{announcements.filter(a => a.isActive).length}</p>
                    <p className="text-sm text-muted-foreground">{t("active")}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-warning">{announcements.filter(a => a.targetAudience === "all").length}</p>
                    <p className="text-sm text-muted-foreground">{language === "ar" ? "إعلانات عامة" : "General (Landing Page)"}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                {announcements.map((ann) => (
                  <Card key={ann.id} className={`border-none shadow-card ${ann.category === "urgent" ? "border-l-4 border-l-destructive" : ""}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{ann.title}</h3>
                            {ann.category === "urgent" && <Badge variant="destructive">{t("urgent")}</Badge>}
                          </div>
                          <p className="text-muted-foreground mb-3">{ann.content}</p>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{ann.targetAudience === "all" ? t("all_users") : ann.targetAudience === "students" ? t("students_only") : t("teachers_only")}</Badge>
                            <Badge variant="outline">{ann.category}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="w-3 h-3" /> {ann.date}
                            </span>
                            <Badge variant={ann.isActive ? "default" : "secondary"}>
                              {ann.isActive ? t("active") : t("inactive")}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditAnnouncement(ann)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => updateAnnouncement(ann.id, { isActive: !ann.isActive })}>
                            {ann.isActive ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => { deleteAnnouncement(ann.id); toast.success(t("entry_deleted")); }}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Reports */}
          {activeTab === "reports" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("reports")}</h1>
                <p className="text-muted-foreground">{language === "ar" ? "إنشاء وعرض التقارير" : "Generate and view reports"}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: GraduationCap, title: language === "ar" ? "تقرير الطلاب" : "Student Report", desc: language === "ar" ? "التسجيل والحضور والأداء" : "Enrollment, attendance, and performance", color: "primary" },
                  { icon: DollarSign, title: t("financial_reports"), desc: language === "ar" ? "تحصيل الرسوم والمستحقات والإيرادات" : "Fee collection, outstanding, and revenue", color: "success" },
                  { icon: Users, title: language === "ar" ? "تقرير الموظفين" : "Staff Report", desc: language === "ar" ? "تعيينات المعلمين وتوزيع الفصول" : "Teacher assignments and class distribution", color: "warning" },
                ].map((report, i) => (
                  <Card key={i} className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-${report.color}/10 flex items-center justify-center mb-4`}>
                        <report.icon className={`w-6 h-6 text-${report.color}`} />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
                      <p className="text-sm text-muted-foreground">{report.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {/* Settings */}
          {activeTab === "settings" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("settings")}</h1>
                <p className="text-muted-foreground">{language === "ar" ? "إدارة تفضيلات الحساب" : "Manage your account preferences"}</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="border-none shadow-card lg:col-span-1">
                  <CardContent className="p-4">
                    <nav className="space-y-1">
                      {[
                        { id: "profile", icon: Users, label: t("profile") },
                        { id: "notifications", icon: Bell, label: t("notifications") },
                        { id: "security", icon: Shield, label: t("security") },
                        { id: "appearance", icon: Palette, label: t("appearance") },
                      ].map((item) => (
                        <button key={item.id} onClick={() => setSettingsSection(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${settingsSection === item.id ? 'bg-warning text-warning-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center text-warning-foreground text-2xl font-bold">
                            {language === "ar" ? "م" : "A"}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{profileData.name}</p>
                            <p className="text-sm text-muted-foreground">{profileData.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>{t("full_name")}</Label>
                            <Input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("email")}</Label>
                            <Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <Label>{t("phone")}</Label>
                            <Input value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} />
                          </div>
                        </div>
                        <Button onClick={() => toast.success(t("profile_updated"))}>
                          <Save className="w-4 h-4" />
                          <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("save_changes")}</span>
                        </Button>
                      </div>
                    )}
                    {settingsSection === "notifications" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("notifications")}</h3>
                        <div className="space-y-4">
                          {[
                            { key: "email", label: t("email_notifications"), desc: language === "ar" ? "تلقي التحديثات عبر البريد الإلكتروني" : "Receive updates via email" },
                            { key: "sms", label: t("sms_notifications"), desc: language === "ar" ? "تلقي التحديثات عبر الرسائل النصية" : "Receive updates via SMS" },
                            { key: "announcements", label: t("announcement_alerts"), desc: language === "ar" ? "إشعارات الإعلانات الجديدة" : "New announcement alerts" },
                            { key: "fees", label: t("fee_reminders"), desc: language === "ar" ? "تذكيرات الرسوم المستحقة" : "Fee payment reminders" },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                              <div>
                                <p className="font-medium text-foreground">{item.label}</p>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                              </div>
                              <Switch checked={notifications[item.key as keyof typeof notifications]} onCheckedChange={(checked) => setNotifications({...notifications, [item.key]: checked})} />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {settingsSection === "security" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("security")}</h3>
                        <div className="space-y-4 max-w-md">
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
                        <Button onClick={() => {
                          if (passwords.new !== passwords.confirm) { toast.error(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords don't match"); return; }
                          if (passwords.new.length < 6) { toast.error(language === "ar" ? "كلمة المرور قصيرة جداً" : "Password too short"); return; }
                          toast.success(t("password_changed"));
                          setPasswords({ current: "", new: "", confirm: "" });
                        }}>
                          <Lock className="w-4 h-4" />
                          <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("change_password")}</span>
                        </Button>
                      </div>
                    )}
                    {settingsSection === "appearance" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("appearance")}</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>{t("language")}</Label>
                            <p className="text-sm text-muted-foreground">{language === "ar" ? "اختر لغتك المفضلة" : "Choose your preferred language"}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant={language === "ar" ? "default" : "outline"} size="sm" onClick={() => setLanguage("ar")}>العربية</Button>
                            <Button variant={language === "en" ? "default" : "outline"} size="sm" onClick={() => setLanguage("en")}>English</Button>
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

      <AddStudentModal open={addStudentOpen} onOpenChange={setAddStudentOpen} />
      <ConfirmModal open={confirmModal.open} onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.action === "approve" ? t("approve") : t("reject")}
        description={confirmModal.action === "approve" ? (language === "ar" ? "هل أنت متأكد من الموافقة على تسجيل هذا الطالب؟" : "Approve this student's registration?") : t("action_cannot_undone")}
        confirmText={confirmModal.action === "approve" ? t("approve") : t("reject")}
        variant={confirmModal.action === "approve" ? "default" : "destructive"}
        onConfirm={() => confirmModal.action === "approve" ? handleApprove(confirmModal.studentId) : handleReject(confirmModal.studentId)}
      />
      {selectedStudent && (
        <FeePaymentModal open={paymentModalOpen} onOpenChange={setPaymentModalOpen} studentId={selectedStudent.id}
          studentName={`${selectedStudent.firstName} ${selectedStudent.surname}`} amount={115000} feeType={language === "ar" ? "الرسوم الدراسية" : "Tuition Fee"} onPaymentComplete={handlePaymentComplete}
        />
      )}
      <TimetableModal open={timetableModalOpen} onOpenChange={setTimetableModalOpen} entry={selectedTimetableEntry} mode={timetableMode} />
      <AnnouncementModal open={announcementModalOpen} onOpenChange={setAnnouncementModalOpen} announcement={selectedAnnouncement} mode={announcementMode} />
      <FeeStructureModal open={feeModalOpen} onOpenChange={setFeeModalOpen} fee={selectedFee} mode={feeMode} />
    </div>
  );
};

export default AdminDashboard;
