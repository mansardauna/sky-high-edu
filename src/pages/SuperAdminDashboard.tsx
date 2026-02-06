import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Shield, Users, GraduationCap, BookOpen, FileText, Bell, LogOut, Menu, Settings,
  TrendingUp, UserCog, Search, CheckCircle, XCircle, Pause, Play, Edit, Plus,
  Calendar, Trash2, Clock, Megaphone, CreditCard, DollarSign, Palette, Lock, Save,
  Eye, EyeOff
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData, Teacher, TimetableEntry, FeeStructure, Announcement } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AddTeacherModal } from "@/components/modals/AddTeacherModal";
import { AssignSubjectModal } from "@/components/modals/AssignSubjectModal";
import { TimetableModal } from "@/components/modals/TimetableModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { AnnouncementModal } from "@/components/modals/AnnouncementModal";
import { FeeStructureModal } from "@/components/modals/FeeStructureModal";
import logo from "@/assets/logo.png";

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [settingsSection, setSettingsSection] = useState("profile");
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [assignSubjectOpen, setAssignSubjectOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [timetableMode, setTimetableMode] = useState<"add" | "edit">("add");
  const [selectedTimetableEntry, setSelectedTimetableEntry] = useState<TimetableEntry | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; id: string; action: string; type: string }>({ open: false, id: "", action: "", type: "" });
  const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
  const [announcementMode, setAnnouncementMode] = useState<"add" | "edit">("add");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [feeModalOpen, setFeeModalOpen] = useState(false);
  const [feeMode, setFeeMode] = useState<"add" | "edit">("add");
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null);

  const navigate = useNavigate();
  const { t, language, setLanguage, direction, translateSubject, translateName, translateStatus, translateFeeType } = useLanguage();
  const { 
    students, teachers, timetable, subjects, feeStructures, feePayments, announcements,
    suspendStudent, activateStudent, updateTeacher, deleteTimetableEntry,
    deleteAnnouncement, updateAnnouncement, logout 
  } = useDemoData();

  const handleLogout = () => {
    logout();
    toast.success(language === "ar" ? "تم تسجيل الخروج بنجاح" : "Logout successful");
    navigate("/");
  };

  const activeStudents = students.filter(s => s.status === "active");
  const activeTeachers = teachers.filter(t => t.status === "active");

  const stats = [
    { label: t("total_students"), value: students.length.toString(), icon: GraduationCap, color: "primary" },
    { label: t("active_teachers"), value: activeTeachers.length.toString(), icon: Users, color: "success" },
    { label: t("total_subjects"), value: subjects.length.toString(), icon: BookOpen, color: "warning" },
    { label: t("timetable_entries"), value: timetable.length.toString(), icon: Calendar, color: "accent" },
  ];

  const handleStudentStatusChange = (studentId: string, action: string) => {
    if (action === "activate") { activateStudent(studentId); toast.success(t("student_approved")); }
    else if (action === "suspend") { suspendStudent(studentId); toast.success(t("suspended")); }
    setConfirmModal({ open: false, id: "", action: "", type: "" });
  };

  const handleTeacherStatusChange = (teacherId: string, action: string) => {
    if (action === "activate") { updateTeacher(teacherId, { status: "active" }); toast.success(t("active")); }
    else if (action === "suspend") { updateTeacher(teacherId, { status: "suspended" }); toast.success(t("suspended")); }
    setConfirmModal({ open: false, id: "", action: "", type: "" });
  };

  const handleDeleteTimetable = (id: string) => {
    deleteTimetableEntry(id);
    toast.success(t("entry_deleted"));
    setConfirmModal({ open: false, id: "", action: "", type: "" });
  };

  const openAssignSubject = (teacher: Teacher) => { setSelectedTeacher(teacher); setAssignSubjectOpen(true); };
  const openEditTimetable = (entry: TimetableEntry) => { setSelectedTimetableEntry(entry); setTimetableMode("edit"); setTimetableModalOpen(true); };
  const openAddTimetable = () => { setSelectedTimetableEntry(null); setTimetableMode("add"); setTimetableModalOpen(true); };
  const openAddAnnouncement = () => { setSelectedAnnouncement(null); setAnnouncementMode("add"); setAnnouncementModalOpen(true); };
  const openEditAnnouncement = (ann: Announcement) => { setSelectedAnnouncement(ann); setAnnouncementMode("edit"); setAnnouncementModalOpen(true); };
  const openAddFee = () => { setSelectedFee(null); setFeeMode("add"); setFeeModalOpen(true); };
  const openEditFee = (fee: FeeStructure) => { setSelectedFee(fee); setFeeMode("edit"); setFeeModalOpen(true); };

  const [profileData, setProfileData] = useState({ name: language === "ar" ? "المدير العام" : "Super Admin", email: "superadmin@daruulum.edu", phone: "+234 801 234 5678" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, announcements: true, fees: true });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const menuItems = [
    { icon: TrendingUp, label: t("overview"), id: "overview" },
    { icon: GraduationCap, label: t("students"), id: "students" },
    { icon: Users, label: t("teachers"), id: "teachers" },
    { icon: UserCog, label: t("assignments"), id: "assignments" },
    { icon: Calendar, label: t("timetable"), id: "timetable" },
    { icon: CreditCard, label: t("fees"), id: "fees" },
    { icon: Megaphone, label: t("announcements"), id: "announcements" },
    { icon: BookOpen, label: t("subjects"), id: "subjects" },
    { icon: FileText, label: t("reports"), id: "reports" },
    { icon: Settings, label: t("settings"), id: "settings" },
  ];

  return (
    <div className="min-h-screen bg-muted/30" dir={direction}>
      {sidebarOpen && <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} h-full w-64 bg-card border-${direction === "rtl" ? "l" : "r"} border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Daru Ulum" className="w-10 h-10 object-contain" />
            <div>
              <span className="font-bold text-foreground block">{language === "ar" ? "دار العلوم" : "Daru Ulum"}</span>
              <span className="text-xs text-muted-foreground">{t("super_admin")}</span>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 140px)" }}>
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === item.id ? 'bg-destructive text-destructive-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
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
              <button className="lg:hidden p-2 text-foreground" onClick={() => setSidebarOpen(true)}><Menu className="w-6 h-6" /></button>
              <div className="relative hidden md:block">
                <Search className={`absolute ${direction === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground`} />
                <Input placeholder={t("search") + "..."} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={`w-80 ${direction === "rtl" ? "pr-10" : "pl-10"} h-10`} />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center text-destructive-foreground font-semibold">
                {language === "ar" ? "م" : "S"}
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Overview */}
          {activeTab === "overview" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("super_admin_dashboard")}</h1>
                  <p className="text-muted-foreground">{t("complete_system_control")}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddAnnouncement}>
                  <Megaphone className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("push_announcement")}</span>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((stat, index) => (
                  <Card key={index} className="border-none shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                          <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { icon: GraduationCap, label: t("manage_students"), tab: "students", color: "primary" },
                  { icon: Users, label: t("manage_teachers"), tab: "teachers", color: "success" },
                  { icon: UserCog, label: t("assign_subjects"), tab: "assignments", color: "warning" },
                  { icon: Calendar, label: t("manage_timetable"), tab: "timetable", color: "destructive" },
                  { icon: Megaphone, label: t("announcements"), tab: "announcements", color: "primary" },
                ].map((item, i) => (
                  <Button key={i} variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab(item.tab)}>
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                    <span>{item.label}</span>
                  </Button>
                ))}
              </div>
            </>
          )}

          {/* Teachers */}
          {activeTab === "teachers" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("teacher_management")}</h1>
                  <p className="text-muted-foreground">{t("add_edit_teachers")}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddTeacherOpen(true)}>
                  <Plus className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("add_teacher")}</span>
                </Button>
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
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.map((teacher) => (
                          <tr key={teacher.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                  {teacher.name.charAt(0)}
                                </div>
                                <span className="font-medium text-foreground">{translateName(teacher.name)}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground">{teacher.email}</td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.subjects.length > 0 ? teacher.subjects.map((subject, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{translateSubject(subject)}</Badge>
                                )) : <span className="text-muted-foreground text-sm">{t("no_subjects")}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.classes.length > 0 ? teacher.classes.map((cls, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{cls}</Badge>
                                )) : <span className="text-muted-foreground text-sm">{t("no_classes_assigned")}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Badge variant={teacher.status === 'active' ? 'default' : 'destructive'}>
                                {translateStatus(teacher.status)}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-1">
                                <Button variant="ghost" size="icon" className="text-primary hover:text-primary hover:bg-primary/10" onClick={() => openAssignSubject(teacher)}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {teacher.status === 'active' ? (
                                  <Button variant="ghost" size="icon" className="text-warning hover:text-warning hover:bg-warning/10"
                                    onClick={() => setConfirmModal({ open: true, id: teacher.id, action: "suspend", type: "teacher" })}>
                                    <Pause className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button variant="ghost" size="icon" className="text-success hover:text-success hover:bg-success/10"
                                    onClick={() => setConfirmModal({ open: true, id: teacher.id, action: "activate", type: "teacher" })}>
                                    <Play className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
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

          {/* Students */}
          {activeTab === "students" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("student_management")}</h1>
                <p className="text-muted-foreground">{t("activate_suspend_students")}</p>
              </div>
              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("students")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("reg_no")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("class")}</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("status")}</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((student) => (
                          <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center text-success font-semibold">
                                  {student.firstName.charAt(0)}
                                </div>
                                <span className="font-medium text-foreground">{translateName(`${student.firstName} ${student.surname}`)}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground font-mono">{student.regNo}</td>
                            <td className="py-4 px-6 text-foreground">{student.class}</td>
                            <td className="py-4 px-6 text-center">
                              <Badge variant={student.status === 'active' ? 'default' : student.status === 'pending' ? 'secondary' : 'destructive'}>
                                {translateStatus(student.status)}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-1">
                                {student.status !== 'active' && (
                                  <Button variant="ghost" size="icon" className="text-success hover:text-success hover:bg-success/10"
                                    onClick={() => setConfirmModal({ open: true, id: student.id, action: "activate", type: "student" })}>
                                    <Play className="w-4 h-4" />
                                  </Button>
                                )}
                                {student.status === 'active' && (
                                  <Button variant="ghost" size="icon" className="text-warning hover:text-warning hover:bg-warning/10"
                                    onClick={() => setConfirmModal({ open: true, id: student.id, action: "suspend", type: "student" })}>
                                    <Pause className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
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

          {/* Assignments */}
          {activeTab === "assignments" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("assignments")}</h1>
                <p className="text-muted-foreground">{t("assign_subject_to")} {t("teachers").toLowerCase()}</p>
              </div>
              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("teacher")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("subjects")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("assigned_classes")}</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {teachers.filter(t => t.status === "active").map((teacher) => (
                          <tr key={teacher.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                  {teacher.name.charAt(0)}
                                </div>
                                <div>
                                  <span className="font-medium text-foreground">{translateName(teacher.name)}</span>
                                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.subjects.length > 0 ? teacher.subjects.map((subject, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{translateSubject(subject)}</Badge>
                                )) : <span className="text-muted-foreground text-sm">{t("no_subjects")}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.classes.length > 0 ? teacher.classes.map((cls, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{cls}</Badge>
                                )) : <span className="text-muted-foreground text-sm">{t("no_classes_assigned")}</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Button variant="default" size="sm" onClick={() => openAssignSubject(teacher)}>
                                <Plus className="w-4 h-4" />
                                <span className={direction === "rtl" ? "mr-1" : "ml-1"}>{t("assign_subject")}</span>
                              </Button>
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
                  <h1 className="text-2xl font-bold text-foreground">{t("manage_timetable")}</h1>
                  <p className="text-muted-foreground">{t("organize_by_day")}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddTimetable}>
                  <Plus className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("add_entry")}</span>
                </Button>
              </div>
              <div className="space-y-6">
                {["الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map((day) => {
                  const dayEntries = timetable.filter(t => t.day === day);
                  if (dayEntries.length === 0) return null;
                  return (
                    <Card key={day} className="border-none shadow-card">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          {day}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {dayEntries.sort((a, b) => a.time.localeCompare(b.time)).map((entry) => (
                            <div key={entry.id} className="p-4 rounded-lg bg-muted/50 border border-border/50">
                              <div className="flex items-start justify-between mb-2">
                                <Badge variant="secondary">{entry.time}</Badge>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-primary" onClick={() => openEditTimetable(entry)}>
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"
                                    onClick={() => setConfirmModal({ open: true, id: entry.id, action: "delete", type: "timetable" })}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <h4 className="font-semibold text-foreground mb-1">{translateSubject(entry.subject)}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{translateName(entry.teacher)}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Badge variant="outline" className="text-xs">{entry.class}</Badge>
                                <span>•</span>
                                <span>{entry.room}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
                {timetable.length === 0 && (
                  <Card className="border-none shadow-card">
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">{t("no_timetable_entries")}</h3>
                      <Button variant="default" onClick={openAddTimetable}><Plus className="w-4 h-4 mr-2" />{t("add_entry")}</Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}

          {/* Fees */}
          {activeTab === "fees" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("fee_management")}</h1>
                  <p className="text-muted-foreground">{language === "ar" ? "إدارة هيكل الرسوم الدراسية" : "Manage fee structures"}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddFee}>
                  <Plus className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{language === "ar" ? "إضافة رسوم" : "Add Fee"}</span>
                </Button>
              </div>
              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("fee_type")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("class")}</th>
                          <th className={`${direction === "rtl" ? "text-right" : "text-left"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("term")}</th>
                          <th className={`${direction === "rtl" ? "text-left" : "text-right"} py-4 px-6 text-sm font-semibold text-muted-foreground`}>{t("amount")}</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">{t("actions")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructures.map((fee) => (
                          <tr key={fee.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-4 px-6 font-medium text-foreground">{translateFeeType(fee.name)}</td>
                            <td className="py-4 px-6"><Badge variant="outline">{fee.classLevel}</Badge></td>
                            <td className="py-4 px-6 text-muted-foreground">{fee.term}</td>
                            <td className={`py-4 px-6 ${direction === "rtl" ? "text-left" : "text-right"} font-semibold text-foreground`}>₦{fee.amount.toLocaleString()}</td>
                            <td className="py-4 px-6 text-center">
                              <Button variant="ghost" size="sm" onClick={() => openEditFee(fee)}><Edit className="w-4 h-4" /></Button>
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

          {/* Announcements */}
          {activeTab === "announcements" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("announcements")}</h1>
                  <p className="text-muted-foreground">{language === "ar" ? "إدارة ونشر الإعلانات" : "Manage and push announcements"}</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddAnnouncement}>
                  <Megaphone className="w-4 h-4" />
                  <span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("push_announcement")}</span>
                </Button>
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
                            <span className="text-xs text-muted-foreground">{ann.date}</span>
                            <Badge variant={ann.isActive ? "default" : "secondary"}>{ann.isActive ? t("active") : t("inactive")}</Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openEditAnnouncement(ann)}><Edit className="w-4 h-4" /></Button>
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

          {/* Subjects */}
          {activeTab === "subjects" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("subjects")}</h1>
                <p className="text-muted-foreground">{t("view_all")} {t("subjects").toLowerCase()}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {subjects.map((subject) => (
                  <Card key={subject.id} className="border-none shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{translateSubject(subject.name)}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{subject.code}</p>
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
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: GraduationCap, title: language === "ar" ? "تقرير الطلاب" : "Student Report", color: "primary" },
                  { icon: DollarSign, title: t("financial_reports"), color: "success" },
                  { icon: Users, title: language === "ar" ? "تقرير الموظفين" : "Staff Report", color: "warning" },
                ].map((r, i) => (
                  <Card key={i} className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-xl bg-${r.color}/10 flex items-center justify-center mb-4`}>
                        <r.icon className={`w-6 h-6 text-${r.color}`} />
                      </div>
                      <h3 className="font-semibold text-foreground">{r.title}</h3>
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
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${settingsSection === item.id ? 'bg-destructive text-destructive-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
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
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center text-destructive-foreground text-2xl font-bold">
                            {language === "ar" ? "م" : "S"}
                          </div>
                          <div>
                            <p className="font-semibold text-foreground">{profileData.name}</p>
                            <p className="text-sm text-muted-foreground">{profileData.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2"><Label>{t("full_name")}</Label><Input value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} /></div>
                          <div className="space-y-2"><Label>{t("email")}</Label><Input value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} /></div>
                          <div className="space-y-2"><Label>{t("phone")}</Label><Input value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} /></div>
                        </div>
                        <Button onClick={() => toast.success(t("profile_updated"))}><Save className="w-4 h-4" /><span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("save_changes")}</span></Button>
                      </div>
                    )}
                    {settingsSection === "notifications" && (
                      <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t("notifications")}</h3>
                        <div className="space-y-4">
                          {[
                            { key: "email", label: t("email_notifications") },
                            { key: "sms", label: t("sms_notifications") },
                            { key: "announcements", label: t("announcement_alerts") },
                            { key: "fees", label: t("fee_reminders") },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                              <p className="font-medium text-foreground">{item.label}</p>
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
                          <div className="space-y-2"><Label>{t("current_password")}</Label><Input type="password" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} /></div>
                          <div className="space-y-2"><Label>{t("new_password")}</Label><Input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} /></div>
                          <div className="space-y-2"><Label>{t("confirm_password")}</Label><Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} /></div>
                        </div>
                        <Button onClick={() => {
                          if (passwords.new !== passwords.confirm) { toast.error(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords don't match"); return; }
                          toast.success(t("password_changed"));
                          setPasswords({ current: "", new: "", confirm: "" });
                        }}><Lock className="w-4 h-4" /><span className={direction === "rtl" ? "mr-2" : "ml-2"}>{t("change_password")}</span></Button>
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

      <AddTeacherModal open={addTeacherOpen} onOpenChange={setAddTeacherOpen} />
      <AssignSubjectModal open={assignSubjectOpen} onOpenChange={setAssignSubjectOpen} teacher={selectedTeacher} />
      <TimetableModal open={timetableModalOpen} onOpenChange={setTimetableModalOpen} entry={selectedTimetableEntry} mode={timetableMode} />
      <AnnouncementModal open={announcementModalOpen} onOpenChange={setAnnouncementModalOpen} announcement={selectedAnnouncement} mode={announcementMode} />
      <FeeStructureModal open={feeModalOpen} onOpenChange={setFeeModalOpen} fee={selectedFee} mode={feeMode} />
      <ConfirmModal open={confirmModal.open} onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.action === "activate" ? t("activate") : confirmModal.action === "suspend" ? t("suspend") : t("delete")}
        description={t("are_you_sure")}
        confirmText={confirmModal.action === "activate" ? t("activate") : confirmModal.action === "suspend" ? t("suspend") : t("delete")}
        variant={confirmModal.action === "activate" ? "default" : "destructive"}
        onConfirm={() => {
          if (confirmModal.type === "student") handleStudentStatusChange(confirmModal.id, confirmModal.action);
          else if (confirmModal.type === "teacher") handleTeacherStatusChange(confirmModal.id, confirmModal.action);
          else if (confirmModal.type === "timetable") handleDeleteTimetable(confirmModal.id);
        }}
      />
    </div>
  );
};

export default SuperAdminDashboard;
