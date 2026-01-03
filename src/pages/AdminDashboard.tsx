import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  UserPlus,
  Settings,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  CreditCard,
  DollarSign,
  Search,
  Plus,
  Edit,
  Globe,
  Shield,
  Palette,
  Lock,
  Save
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AddStudentModal } from "@/components/modals/AddStudentModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";
import { FeePaymentModal } from "@/components/modals/FeePaymentModal";
import { DataTable } from "@/components/DataTable";
import { TimetableModal } from "@/components/modals/TimetableModal";
import { TimetableEntry } from "@/contexts/DemoDataContext";

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
  const navigate = useNavigate();
  const { 
    students, 
    teachers, 
    timetable,
    feeStructures, 
    feePayments,
    approveStudent, 
    suspendStudent, 
    addFeePayment,
    updateFeeStructure,
    addFeeStructure,
    deleteTimetableEntry,
    logout 
  } = useDemoData();
  const { t, language, setLanguage, direction } = useLanguage();

  const handleLogout = () => {
    logout();
    toast.success(t("logout") + " successful");
    navigate("/");
  };

  const pendingStudents = students.filter(s => s.status === "pending");
  const activeStudents = students.filter(s => s.status === "active");
  const activeTeachers = teachers.filter(t => t.status === "active");

  const stats = [
    { label: t("total_students"), value: students.length.toString(), icon: GraduationCap, color: "primary", change: "+12%" },
    { label: t("active_teachers"), value: activeTeachers.length.toString(), icon: Users, color: "success", change: "+3%" },
    { label: t("pending_approvals"), value: pendingStudents.length.toString(), icon: Clock, color: "warning", change: "New" },
    { label: t("active_classes"), value: "8", icon: BookOpen, color: "accent", change: "0%" },
  ];

  const handleApprove = (studentId: string) => {
    approveStudent(studentId);
    toast.success("Student approved successfully!");
    setConfirmModal({ open: false, studentId: "", action: "" });
  };

  const handleReject = (studentId: string) => {
    suspendStudent(studentId);
    toast.success("Student registration rejected.");
    setConfirmModal({ open: false, studentId: "", action: "" });
  };

  const handleRecordPayment = (student: any) => {
    setSelectedStudent(student);
    setPaymentModalOpen(true);
  };

  const handlePaymentComplete = (paymentData: any) => {
    if (selectedStudent) {
      const classLevel = selectedStudent.class.startsWith("SSS") ? "SSS" : "JSS";
      const tuitionFee = feeStructures.find(f => f.name === "Tuition Fee" && f.classLevel === classLevel);
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

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const dayTranslations: Record<string, string> = {
    Monday: t("monday"),
    Tuesday: t("tuesday"),
    Wednesday: t("wednesday"),
    Thursday: t("thursday"),
    Friday: t("friday"),
  };

  const menuItems = [
    { icon: TrendingUp, label: t("dashboard"), id: "dashboard" },
    { icon: GraduationCap, label: t("students"), id: "students" },
    { icon: Clock, label: t("pending_approvals"), id: "pending" },
    { icon: Users, label: t("teachers"), id: "teachers" },
    { icon: Calendar, label: t("timetable"), id: "timetable" },
    { icon: CreditCard, label: t("fees"), id: "fees" },
    { icon: FileText, label: t("reports"), id: "reports" },
    { icon: Settings, label: t("settings"), id: "settings" },
  ];

  const filteredStudents = students.filter(s => 
    s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [profileData, setProfileData] = useState({ name: "Admin User", email: "admin@daruulum.edu", phone: "+234 801 234 5678" });
  const [notifications, setNotifications] = useState({ email: true, sms: false, announcements: true, fees: true });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  // Timetable DataTable columns
  const timetableColumns = [
    { key: "day", header: t("monday").split(" ")[0] === t("monday") ? "Day" : "اليوم", sortable: true, filterable: true },
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
            toast.success("Entry deleted");
          }}>
            <XCircle className="w-4 h-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30" dir={direction}>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 ${direction === "rtl" ? "right-0" : "left-0"} h-full w-64 bg-card border-${direction === "rtl" ? "l" : "r"} border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : direction === "rtl" ? 'translate-x-full' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-warning-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">
              {language === "ar" ? "بوابة المدير" : "Admin Portal"}
            </span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
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
              {item.id === "pending" && pendingStudents.length > 0 && (
                <Badge variant="destructive" className="ml-auto">{pendingStudents.length}</Badge>
              )}
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
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder={t("search") + "..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 h-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setLanguage(language === "en" ? "ar" : "en")} title={t("language")}>
                <Globe className="w-5 h-5" />
              </Button>
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                {pendingStudents.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center text-warning-foreground font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("dashboard")}</h1>
                  <p className="text-muted-foreground">{t("welcome_back")}! Here's what's happening today.</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddStudentOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t("add")} {t("students")}
                </Button>
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
                          stat.change === 'New' ? 'bg-warning/10 text-warning' :
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
                      <CardDescription>Students waiting for registration approval</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("pending")}>
                      View All
                    </Button>
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

              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>{t("quick_actions")}</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <Calendar className="w-6 h-6 text-accent-foreground" />
                      <span>{t("timetable")}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "pending" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("pending_approvals")}</h1>
                <p className="text-muted-foreground">Review and approve student registrations</p>
              </div>

              {pendingStudents.length === 0 ? (
                <Card className="border-none shadow-card">
                  <CardContent className="p-12 text-center">
                    <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No pending registrations to review.</p>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-card">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Student</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">{t("class")}</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Parent</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Date</th>
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
                                    <p className="text-sm text-muted-foreground">DOB: {student.dob}</p>
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
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button variant="destructive" size="sm" onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "reject" })}>
                                    <XCircle className="w-4 h-4 mr-1" />
                                    Reject
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

          {activeTab === "students" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("students")}</h1>
                  <p className="text-muted-foreground">Manage all registered students</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddStudentOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t("add")} Student
                </Button>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-6">
                  <DataTable
                    data={filteredStudents}
                    columns={[
                      { 
                        key: "name", 
                        header: "Student",
                        sortable: true,
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
                      { key: "regNo", header: "Reg. No", sortable: true },
                      { key: "class", header: t("class"), sortable: true, filterable: true },
                      { 
                        key: "status", 
                        header: t("status"),
                        sortable: true,
                        filterable: true,
                        render: (item) => (
                          <Badge variant={item.status === 'active' ? 'default' : item.status === 'pending' ? 'secondary' : 'destructive'} className="capitalize">
                            {item.status}
                          </Badge>
                        )
                      },
                      {
                        key: "actions",
                        header: t("actions"),
                        render: (item) => (
                          <Button variant="outline" size="sm" onClick={() => handleRecordPayment(item)}>
                            <CreditCard className="w-4 h-4 mr-1" />
                            Record Payment
                          </Button>
                        )
                      }
                    ]}
                    searchPlaceholder={t("search") + " students..."}
                    pageSize={10}
                  />
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "teachers" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("teachers")}</h1>
                <p className="text-muted-foreground">View all teachers and their assignments</p>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">{t("teacher")}</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Email</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Subjects</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Classes</th>
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
                              <Badge variant={teacher.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                                {teacher.status}
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

          {activeTab === "timetable" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{t("timetable")}</h1>
                  <p className="text-muted-foreground">Manage class schedules</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddTimetable}>
                  <Plus className="w-4 h-4 mr-2" />
                  {t("add")} Schedule
                </Button>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-6">
                  <DataTable
                    data={timetable}
                    columns={timetableColumns}
                    searchPlaceholder={t("search") + " timetable..."}
                    pageSize={15}
                  />
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "fees" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("fee_management")}</h1>
                <p className="text-muted-foreground">Manage fee structures and payments</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Expected</p>
                    <p className="text-2xl font-bold text-foreground">₦{(students.filter(s => s.status === "active").length * 115000).toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Collected</p>
                    <p className="text-2xl font-bold text-success">₦{feePayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Outstanding</p>
                    <p className="text-2xl font-bold text-destructive">₦{((students.filter(s => s.status === "active").length * 115000) - feePayments.reduce((sum, p) => sum + p.amount, 0)).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-card mb-6">
                <CardHeader>
                  <CardTitle>{t("fee_structure")}</CardTitle>
                  <CardDescription>Configure fees for different class levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fee Name</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class Level</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">{t("term")}</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {feeStructures.map((fee) => (
                          <tr key={fee.id} className="border-b border-border/50 hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium text-foreground">{fee.name}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline">{fee.classLevel}</Badge>
                            </td>
                            <td className="py-3 px-4 text-muted-foreground">{fee.term} Term</td>
                            <td className="py-3 px-4 text-right font-semibold text-foreground">₦{fee.amount.toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>Recent Payments</CardTitle>
                  <CardDescription>Latest fee payments received</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Student</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fee Type</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date</th>
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
                              <td className="py-3 px-4 text-muted-foreground">{fee?.name}</td>
                              <td className="py-3 px-4 text-right font-semibold text-foreground">₦{payment.amount.toLocaleString()}</td>
                              <td className="py-3 px-4 text-muted-foreground">{payment.paidDate}</td>
                              <td className="py-3 px-4 text-center">
                                <Badge variant={payment.status === 'paid' ? 'default' : payment.status === 'partial' ? 'secondary' : 'destructive'} className="capitalize">
                                  {payment.status}
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

          {activeTab === "reports" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">{t("reports")}</h1>
                <p className="text-muted-foreground">Generate and view reports</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Student Report</h3>
                    <p className="text-sm text-muted-foreground">Enrollment, attendance, and academic performance</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4">
                      <DollarSign className="w-6 h-6 text-success" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{t("financial_reports")}</h3>
                    <p className="text-sm text-muted-foreground">Fee collection, outstanding payments, and revenue</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-warning" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Staff Report</h3>
                    <p className="text-sm text-muted-foreground">Teacher assignments and class distribution</p>
                  </CardContent>
                </Card>
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
                        { id: "profile", icon: Users, label: t("profile") },
                        { id: "notifications", icon: Bell, label: t("notifications") },
                        { id: "security", icon: Shield, label: t("security") },
                        { id: "appearance", icon: Palette, label: t("appearance") },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setSettingsSection(item.id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                            settingsSection === item.id ? 'bg-warning text-warning-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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

      <AddStudentModal open={addStudentOpen} onOpenChange={setAddStudentOpen} />
      
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={confirmModal.action === "approve" ? "Approve Student" : "Reject Registration"}
        description={confirmModal.action === "approve" 
          ? "Are you sure you want to approve this student's registration? They will be able to login to the student portal."
          : "Are you sure you want to reject this registration? This action cannot be undone."
        }
        confirmText={confirmModal.action === "approve" ? "Approve" : "Reject"}
        variant={confirmModal.action === "approve" ? "default" : "destructive"}
        onConfirm={() => confirmModal.action === "approve" ? handleApprove(confirmModal.studentId) : handleReject(confirmModal.studentId)}
      />

      {selectedStudent && (
        <FeePaymentModal
          open={paymentModalOpen}
          onOpenChange={setPaymentModalOpen}
          studentId={selectedStudent.id}
          studentName={`${selectedStudent.firstName} ${selectedStudent.surname}`}
          amount={115000}
          feeType="Tuition Fee"
          onPaymentComplete={handlePaymentComplete}
        />
      )}

      <TimetableModal
        open={timetableModalOpen}
        onOpenChange={setTimetableModalOpen}
        entry={selectedTimetableEntry}
        mode={timetableMode}
      />
    </div>
  );
};

export default AdminDashboard;
