import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  Settings,
  TrendingUp,
  UserCog,
  Search,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Edit,
  Plus,
  Calendar,
  Trash2,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData, Teacher, TimetableEntry } from "@/contexts/DemoDataContext";
import { AddTeacherModal } from "@/components/modals/AddTeacherModal";
import { AssignSubjectModal } from "@/components/modals/AssignSubjectModal";
import { TimetableModal } from "@/components/modals/TimetableModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [addTeacherOpen, setAddTeacherOpen] = useState(false);
  const [assignSubjectOpen, setAssignSubjectOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [timetableModalOpen, setTimetableModalOpen] = useState(false);
  const [timetableMode, setTimetableMode] = useState<"add" | "edit">("add");
  const [selectedTimetableEntry, setSelectedTimetableEntry] = useState<TimetableEntry | null>(null);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; id: string; action: string; type: string }>({ open: false, id: "", action: "", type: "" });
  
  const navigate = useNavigate();
  const { 
    students, 
    teachers, 
    timetable, 
    subjects,
    suspendStudent, 
    activateStudent, 
    updateTeacher,
    deleteTimetableEntry,
    logout 
  } = useDemoData();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const activeStudents = students.filter(s => s.status === "active");
  const activeTeachers = teachers.filter(t => t.status === "active");

  const stats = [
    { label: "Total Students", value: students.length.toString(), icon: GraduationCap, color: "primary" },
    { label: "Active Teachers", value: activeTeachers.length.toString(), icon: Users, color: "success" },
    { label: "Total Subjects", value: subjects.length.toString(), icon: BookOpen, color: "warning" },
    { label: "Timetable Entries", value: timetable.length.toString(), icon: Calendar, color: "accent" },
  ];

  const handleStudentStatusChange = (studentId: string, action: string) => {
    if (action === "activate") {
      activateStudent(studentId);
      toast.success("Student activated successfully!");
    } else if (action === "suspend") {
      suspendStudent(studentId);
      toast.success("Student suspended successfully!");
    }
    setConfirmModal({ open: false, id: "", action: "", type: "" });
  };

  const handleTeacherStatusChange = (teacherId: string, action: string) => {
    if (action === "activate") {
      updateTeacher(teacherId, { status: "active" });
      toast.success("Teacher activated successfully!");
    } else if (action === "suspend") {
      updateTeacher(teacherId, { status: "suspended" });
      toast.success("Teacher suspended successfully!");
    }
    setConfirmModal({ open: false, id: "", action: "", type: "" });
  };

  const handleDeleteTimetable = (id: string) => {
    deleteTimetableEntry(id);
    toast.success("Timetable entry deleted!");
    setConfirmModal({ open: false, id: "", action: "", type: "" });
  };

  const openAssignSubject = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setAssignSubjectOpen(true);
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

  const menuItems = [
    { icon: TrendingUp, label: "Overview", id: "overview" },
    { icon: GraduationCap, label: "Students", id: "students" },
    { icon: Users, label: "Teachers", id: "teachers" },
    { icon: UserCog, label: "Assignments", id: "assignments" },
    { icon: Calendar, label: "Timetable", id: "timetable" },
    { icon: BookOpen, label: "Subjects", id: "subjects" },
    { icon: FileText, label: "Reports", id: "reports" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center shadow-md">
              <Shield className="w-6 h-6 text-destructive-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Super Admin</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-destructive text-destructive-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden p-2 text-foreground"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search anything..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 h-10"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-destructive to-destructive/80 flex items-center justify-center text-destructive-foreground font-semibold">
                S
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {activeTab === "overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Super Admin Dashboard</h1>
                <p className="text-muted-foreground">Complete control over the school management system</p>
              </div>

              {/* Stats Cards */}
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

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("students")}>
                  <GraduationCap className="w-6 h-6 text-primary" />
                  <span>Manage Students</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("teachers")}>
                  <Users className="w-6 h-6 text-success" />
                  <span>Manage Teachers</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("assignments")}>
                  <UserCog className="w-6 h-6 text-warning" />
                  <span>Assign Subjects</span>
                </Button>
                <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("timetable")}>
                  <Calendar className="w-6 h-6 text-destructive" />
                  <span>Manage Timetable</span>
                </Button>
              </div>
            </>
          )}

          {activeTab === "teachers" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Teacher Management</h1>
                  <p className="text-muted-foreground">Add, edit, and manage teacher accounts</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddTeacherOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Teacher
                </Button>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Teacher</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Email</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Subjects</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Classes</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Status</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Actions</th>
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
                                <span className="font-medium text-foreground">{teacher.name}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground">{teacher.email}</td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.subjects.length > 0 ? teacher.subjects.map((subject, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{subject}</Badge>
                                )) : <span className="text-muted-foreground text-sm">No subjects</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.classes.length > 0 ? teacher.classes.map((cls, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{cls}</Badge>
                                )) : <span className="text-muted-foreground text-sm">No classes</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Badge variant={teacher.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                                {teacher.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="text-primary hover:text-primary hover:bg-primary/10"
                                  onClick={() => openAssignSubject(teacher)}
                                >
                                  <Edit className="w-4 h-4" />
                                </Button>
                                {teacher.status === 'active' ? (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-warning hover:text-warning hover:bg-warning/10"
                                    onClick={() => setConfirmModal({ open: true, id: teacher.id, action: "suspend", type: "teacher" })}
                                  >
                                    <Pause className="w-4 h-4" />
                                  </Button>
                                ) : (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-success hover:text-success hover:bg-success/10"
                                    onClick={() => setConfirmModal({ open: true, id: teacher.id, action: "activate", type: "teacher" })}
                                  >
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

          {activeTab === "students" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Student Management</h1>
                <p className="text-muted-foreground">Activate, suspend, or deactivate student accounts</p>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Student</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Reg. No</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Class</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Status</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Actions</th>
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
                                <span className="font-medium text-foreground">{student.firstName} {student.surname}</span>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-muted-foreground font-mono">{student.regNo}</td>
                            <td className="py-4 px-6 text-foreground">{student.class}</td>
                            <td className="py-4 px-6 text-center">
                              <Badge 
                                variant={
                                  student.status === 'active' ? 'default' : 
                                  student.status === 'pending' ? 'secondary' :
                                  'destructive'
                                } 
                                className="capitalize"
                              >
                                {student.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center gap-1">
                                {student.status !== 'active' && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-success hover:text-success hover:bg-success/10"
                                    onClick={() => setConfirmModal({ open: true, id: student.id, action: "activate", type: "student" })}
                                  >
                                    <Play className="w-4 h-4" />
                                  </Button>
                                )}
                                {student.status === 'active' && (
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-warning hover:text-warning hover:bg-warning/10"
                                    onClick={() => setConfirmModal({ open: true, id: student.id, action: "suspend", type: "student" })}
                                  >
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

          {activeTab === "assignments" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Subject Assignments</h1>
                  <p className="text-muted-foreground">Assign subjects and classes to teachers</p>
                </div>
              </div>

              <Card className="border-none shadow-card">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Teacher</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Current Subjects</th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Assigned Classes</th>
                          <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Action</th>
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
                                  <span className="font-medium text-foreground">{teacher.name}</span>
                                  <p className="text-sm text-muted-foreground">{teacher.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.subjects.length > 0 ? teacher.subjects.map((subject, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">{subject}</Badge>
                                )) : <span className="text-muted-foreground text-sm">None assigned</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex flex-wrap gap-1">
                                {teacher.classes.length > 0 ? teacher.classes.map((cls, i) => (
                                  <Badge key={i} variant="outline" className="text-xs">{cls}</Badge>
                                )) : <span className="text-muted-foreground text-sm">None assigned</span>}
                              </div>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <Button variant="default" size="sm" onClick={() => openAssignSubject(teacher)}>
                                <Plus className="w-4 h-4 mr-1" />
                                Assign
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

          {activeTab === "timetable" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Timetable Management</h1>
                  <p className="text-muted-foreground">Create and manage class schedules</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={openAddTimetable}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Schedule
                </Button>
              </div>

              {/* Timetable by Day */}
              <div className="space-y-6">
                {days.map((day) => {
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
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/10"
                                    onClick={() => openEditTimetable(entry)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                                    onClick={() => setConfirmModal({ open: true, id: entry.id, action: "delete", type: "timetable" })}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                              <h4 className="font-semibold text-foreground mb-1">{entry.subject}</h4>
                              <p className="text-sm text-muted-foreground mb-2">{entry.teacher}</p>
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
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Timetable Entries</h3>
                      <p className="text-muted-foreground mb-4">Start by adding class schedules.</p>
                      <Button variant="default" onClick={openAddTimetable}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add First Schedule
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}

          {activeTab === "subjects" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Subjects</h1>
                <p className="text-muted-foreground">View all available subjects</p>
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
                          <h3 className="font-semibold text-foreground">{subject.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">{subject.code}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Modals */}
      <AddTeacherModal open={addTeacherOpen} onOpenChange={setAddTeacherOpen} />
      <AssignSubjectModal open={assignSubjectOpen} onOpenChange={setAssignSubjectOpen} teacher={selectedTeacher} />
      <TimetableModal 
        open={timetableModalOpen} 
        onOpenChange={setTimetableModalOpen} 
        entry={selectedTimetableEntry}
        mode={timetableMode}
      />
      
      <ConfirmModal
        open={confirmModal.open}
        onOpenChange={(open) => setConfirmModal({ ...confirmModal, open })}
        title={
          confirmModal.action === "activate" ? `Activate ${confirmModal.type}` :
          confirmModal.action === "suspend" ? `Suspend ${confirmModal.type}` :
          `Delete ${confirmModal.type} entry`
        }
        description={
          confirmModal.action === "activate" ? `Are you sure you want to activate this ${confirmModal.type}?` :
          confirmModal.action === "suspend" ? `Are you sure you want to suspend this ${confirmModal.type}?` :
          `Are you sure you want to delete this timetable entry? This action cannot be undone.`
        }
        confirmText={confirmModal.action === "activate" ? "Activate" : confirmModal.action === "suspend" ? "Suspend" : "Delete"}
        variant={confirmModal.action === "activate" ? "default" : "destructive"}
        onConfirm={() => {
          if (confirmModal.type === "student") {
            handleStudentStatusChange(confirmModal.id, confirmModal.action);
          } else if (confirmModal.type === "teacher") {
            handleTeacherStatusChange(confirmModal.id, confirmModal.action);
          } else if (confirmModal.type === "timetable") {
            handleDeleteTimetable(confirmModal.id);
          }
        }}
      />
    </div>
  );
};

export default SuperAdminDashboard;
