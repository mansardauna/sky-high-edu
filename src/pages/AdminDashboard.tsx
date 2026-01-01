import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Bell, 
  LogOut,
  Menu,
  UserPlus,
  Search,
  Settings,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";
import { AddStudentModal } from "@/components/modals/AddStudentModal";
import { ConfirmModal } from "@/components/modals/ConfirmModal";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [addStudentOpen, setAddStudentOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; studentId: string; action: string }>({ open: false, studentId: "", action: "" });
  const navigate = useNavigate();
  const { students, teachers, approveStudent, suspendStudent, logout } = useDemoData();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const pendingStudents = students.filter(s => s.status === "pending");
  const activeStudents = students.filter(s => s.status === "active");
  const activeTeachers = teachers.filter(t => t.status === "active");

  const stats = [
    { label: "Total Students", value: students.length.toString(), icon: GraduationCap, color: "primary", change: "+12%" },
    { label: "Active Teachers", value: activeTeachers.length.toString(), icon: Users, color: "success", change: "+3%" },
    { label: "Pending Approvals", value: pendingStudents.length.toString(), icon: Clock, color: "warning", change: "New" },
    { label: "Active Classes", value: "8", icon: BookOpen, color: "accent", change: "0%" },
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

  const menuItems = [
    { icon: TrendingUp, label: "Dashboard", id: "dashboard" },
    { icon: GraduationCap, label: "Students", id: "students" },
    { icon: Clock, label: "Pending Approvals", id: "pending" },
    { icon: Users, label: "Teachers", id: "teachers" },
    { icon: Calendar, label: "Timetable", id: "timetable" },
    { icon: FileText, label: "Reports", id: "reports" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const filteredStudents = students.filter(s => 
    s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.surname.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.regNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-warning-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Admin Portal</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-warning text-warning-foreground' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
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
                  placeholder="Search students, teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 h-10"
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
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {activeTab === "dashboard" && (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                  <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddStudentOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Student
                </Button>
              </div>

              {/* Stats Cards */}
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
                          stat.change.startsWith('-') ? 'bg-destructive/10 text-destructive' : 
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

              {/* Pending Approvals Quick View */}
              {pendingStudents.length > 0 && (
                <Card className="border-none shadow-card mb-6">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-warning" />
                        Pending Approvals
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
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-success hover:text-success hover:bg-success/10"
                              onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "approve" })}
                            >
                              <CheckCircle className="w-5 h-5" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "reject" })}
                            >
                              <XCircle className="w-5 h-5" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Actions */}
              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("students")}>
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <span>Manage Students</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("teachers")}>
                      <Users className="w-6 h-6 text-success" />
                      <span>View Teachers</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("pending")}>
                      <Clock className="w-6 h-6 text-warning" />
                      <span>Pending Approvals</span>
                    </Button>
                    <Button variant="outline" className="h-auto py-6 flex-col gap-2" onClick={() => setActiveTab("timetable")}>
                      <Calendar className="w-6 h-6 text-accent" />
                      <span>View Timetable</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "pending" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Pending Approvals</h1>
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
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Class</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Parent</th>
                            <th className="text-left py-4 px-6 text-sm font-semibold text-muted-foreground">Date</th>
                            <th className="text-center py-4 px-6 text-sm font-semibold text-muted-foreground">Actions</th>
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
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "approve" })}
                                  >
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Approve
                                  </Button>
                                  <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => setConfirmModal({ open: true, studentId: student.id, action: "reject" })}
                                  >
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
                  <h1 className="text-2xl font-bold text-foreground">All Students</h1>
                  <p className="text-muted-foreground">Manage all registered students</p>
                </div>
                <Button variant="default" className="mt-4 md:mt-0" onClick={() => setAddStudentOpen(true)}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add New Student
                </Button>
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
                        </tr>
                      </thead>
                      <tbody>
                        {filteredStudents.map((student) => (
                          <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                  {student.firstName.charAt(0)}
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{student.firstName} {student.surname}</p>
                                  <p className="text-sm text-muted-foreground">{student.parentPhone}</p>
                                </div>
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "teachers" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Teachers</h1>
                <p className="text-muted-foreground">View all teachers and their assignments</p>
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
        </main>
      </div>

      {/* Modals */}
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
    </div>
  );
};

export default AdminDashboard;
