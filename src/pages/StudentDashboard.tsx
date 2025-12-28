import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  FileText, 
  Bell, 
  User,
  LogOut,
  Menu,
  X,
  TrendingUp,
  Clock,
  Award,
  Download
} from "lucide-react";
import { toast } from "sonner";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
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
    { icon: User, label: "My Profile", active: false },
    { icon: FileText, label: "Results", active: true },
    { icon: Calendar, label: "Timetable", active: false },
    { icon: BookOpen, label: "Courses", active: false },
    { icon: Bell, label: "Announcements", active: false },
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
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Daru Ulum</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active 
                  ? 'bg-primary text-primary-foreground' 
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
              <div>
                <h1 className="font-bold text-lg text-foreground">Welcome back, Ahmad!</h1>
                <p className="text-sm text-muted-foreground">JSS 2A • 2024/2025 Session</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="border-none shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Average Score</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Position</p>
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
                    <p className="text-sm text-muted-foreground mb-1">Subjects</p>
                    <p className="text-3xl font-bold text-foreground">6</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Results Table */}
            <Card className="lg:col-span-2 border-none shadow-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Term Results</CardTitle>
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
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subject</th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Teacher</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Score</th>
                        <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Grade</th>
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

            {/* Announcements */}
            <Card className="border-none shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Announcements
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
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
