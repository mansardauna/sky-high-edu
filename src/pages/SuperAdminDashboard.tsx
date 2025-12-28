import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
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
  MoreVertical,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Trash2,
  Edit,
  Plus
} from "lucide-react";
import { toast } from "sonner";

const SuperAdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const stats = [
    { label: "Total Students", value: "2,547", icon: GraduationCap, color: "primary" },
    { label: "Active Teachers", value: "156", icon: Users, color: "success" },
    { label: "Total Subjects", value: "24", icon: BookOpen, color: "warning" },
    { label: "System Users", value: "2,720", icon: UserCog, color: "accent" },
  ];

  const teachers = [
    { id: 1, name: "Mr. Ahmed Ibrahim", email: "ahmed@daruulum.edu", subjects: ["Mathematics"], classes: ["JSS 1A", "JSS 2A"], status: "active" },
    { id: 2, name: "Mrs. Fatima Yusuf", email: "fatima@daruulum.edu", subjects: ["English"], classes: ["JSS 1B", "JSS 2B"], status: "active" },
    { id: 3, name: "Ustaz Ibrahim Musa", email: "ibrahim@daruulum.edu", subjects: ["Islamic Studies", "Arabic"], classes: ["JSS 3A"], status: "suspended" },
    { id: 4, name: "Dr. Musa Aliyu", email: "musa@daruulum.edu", subjects: ["Science"], classes: ["SSS 1A", "SSS 2A"], status: "active" },
  ];

  const students = [
    { id: 1, name: "Ahmad Ibrahim", regNo: "DU/2024/001", class: "JSS 1A", status: "active" },
    { id: 2, name: "Fatima Yusuf", regNo: "DU/2024/002", class: "JSS 2B", status: "active" },
    { id: 3, name: "Muhammad Ali", regNo: "DU/2024/003", class: "SSS 1A", status: "suspended" },
    { id: 4, name: "Aisha Bello", regNo: "DU/2024/004", class: "JSS 3A", status: "inactive" },
  ];

  const handleStudentStatusChange = (studentId: number, newStatus: string) => {
    toast.success(`Student status updated to ${newStatus}`);
  };

  const menuItems = [
    { icon: TrendingUp, label: "Overview", active: true },
    { icon: GraduationCap, label: "Students", active: false },
    { icon: Users, label: "Teachers", active: false },
    { icon: BookOpen, label: "Subjects", active: false },
    { icon: UserCog, label: "Assignments", active: false },
    { icon: FileText, label: "Reports", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

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
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active 
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

          {/* Teacher Assignment Section */}
          <Card className="border-none shadow-card mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="w-5 h-5 text-primary" />
                  Teacher Subject Assignment
                </CardTitle>
                <CardDescription>Assign subjects and classes to teachers</CardDescription>
              </div>
              <Button variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Teacher
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Teacher</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Email</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subjects</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Classes</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teachers.map((teacher) => (
                      <tr key={teacher.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                              {teacher.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{teacher.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">{teacher.email}</td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {teacher.subjects.map((subject, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">{subject}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {teacher.classes.map((cls, i) => (
                              <Badge key={i} variant="outline" className="text-xs">{cls}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={teacher.status === 'active' ? 'default' : 'destructive'} className="capitalize">
                            {teacher.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="icon">
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

          {/* Student Management */}
          <Card className="border-none shadow-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-success" />
                  Student Management
                </CardTitle>
                <CardDescription>Activate, deactivate, or suspend student accounts</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Student</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Reg. No</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Class</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                      <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student) => (
                      <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center text-success font-semibold text-sm">
                              {student.name.charAt(0)}
                            </div>
                            <span className="font-medium text-foreground">{student.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground text-sm">{student.regNo}</td>
                        <td className="py-3 px-4 text-muted-foreground">{student.class}</td>
                        <td className="py-3 px-4 text-center">
                          <Badge 
                            variant={student.status === 'active' ? 'default' : student.status === 'suspended' ? 'destructive' : 'secondary'} 
                            className="capitalize"
                          >
                            {student.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-2">
                            {student.status !== 'active' && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-success hover:text-success hover:bg-success/10"
                                onClick={() => handleStudentStatusChange(student.id, 'active')}
                              >
                                <Play className="w-4 h-4" />
                              </Button>
                            )}
                            {student.status === 'active' && (
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-warning hover:text-warning hover:bg-warning/10"
                                onClick={() => handleStudentStatusChange(student.id, 'suspended')}
                              >
                                <Pause className="w-4 h-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleStudentStatusChange(student.id, 'inactive')}
                            >
                              <XCircle className="w-4 h-4" />
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
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
