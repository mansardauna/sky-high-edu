import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Bell, 
  User,
  LogOut,
  Menu,
  UserPlus,
  Search,
  Settings,
  TrendingUp,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };

  const stats = [
    { label: "Total Students", value: "2,547", icon: GraduationCap, color: "primary", change: "+12%" },
    { label: "Total Teachers", value: "156", icon: Users, color: "success", change: "+3%" },
    { label: "Active Classes", value: "48", icon: BookOpen, color: "warning", change: "0%" },
    { label: "Pending Fees", value: "₦2.4M", icon: FileText, color: "destructive", change: "-8%" },
  ];

  const recentStudents = [
    { name: "Ahmad Ibrahim", class: "JSS 1A", status: "Active", date: "Dec 28, 2024" },
    { name: "Fatima Yusuf", class: "JSS 2B", status: "Active", date: "Dec 27, 2024" },
    { name: "Muhammad Ali", class: "SSS 1A", status: "Pending", date: "Dec 26, 2024" },
    { name: "Aisha Bello", class: "JSS 3A", status: "Active", date: "Dec 25, 2024" },
  ];

  const menuItems = [
    { icon: TrendingUp, label: "Dashboard", active: true },
    { icon: GraduationCap, label: "Students", active: false },
    { icon: Users, label: "Teachers", active: false },
    { icon: BookOpen, label: "Classes", active: false },
    { icon: Calendar, label: "Timetable", active: false },
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
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center shadow-md">
              <Users className="w-6 h-6 text-warning-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Admin Portal</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active 
                  ? 'bg-warning text-warning-foreground' 
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
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center text-warning-foreground font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>
            <Button variant="default" className="mt-4 md:mt-0">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Students */}
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle>Recent Registrations</CardTitle>
                <CardDescription>Newly registered students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{student.name}</p>
                          <p className="text-sm text-muted-foreground">{student.class}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          student.status === 'Active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                        }`}>
                          {student.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">{student.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    <span>Manage Students</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                    <Users className="w-6 h-6 text-success" />
                    <span>Manage Teachers</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                    <BookOpen className="w-6 h-6 text-warning" />
                    <span>Class Management</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-6 flex-col gap-2">
                    <FileText className="w-6 h-6 text-destructive" />
                    <span>Generate Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
