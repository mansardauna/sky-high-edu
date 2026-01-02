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
  User,
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
  Mail,
  Phone,
  Camera
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsSection, setSettingsSection] = useState("profile");
  const navigate = useNavigate();
  const { timetable, feeStructures, feePayments, currentUser, logout } = useDemoData();

  // Get current student data
  const student = currentUser as any || { firstName: "Ahmad", surname: "Ibrahim", class: "JSS 1A", id: "s1" };
  const studentClass = student?.class || "JSS 1A";
  const studentId = student?.id || "s1";

  // Filter timetable for student's class
  const myTimetable = timetable.filter(t => t.class === studentClass);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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
    { icon: TrendingUp, label: "Dashboard", id: "dashboard" },
    { icon: FileText, label: "Results", id: "results" },
    { icon: Calendar, label: "Timetable", id: "timetable" },
    { icon: CreditCard, label: "Fees", id: "fees" },
    { icon: Bell, label: "Announcements", id: "announcements" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-md">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Student Portal</span>
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
            Logout
          </Button>
        </div>
      </aside>

      <div className="lg:ml-64">
        <header className="sticky top-0 bg-card/80 backdrop-blur-lg border-b border-border z-30">
          <div className="flex items-center justify-between px-4 lg:px-8 h-16">
            <div className="flex items-center gap-4">
              <button className="lg:hidden p-2 text-foreground" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className="font-bold text-lg text-foreground">Welcome back, {student.firstName}!</h1>
                <p className="text-sm text-muted-foreground">{studentClass} • 2024/2025 Session</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
                        <p className="text-sm text-muted-foreground mb-1">Fee Balance</p>
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
            </>
          )}

          {activeTab === "results" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">My Results</h1>
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
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Subject</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">CA1 (20)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">CA2 (20)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Exam (60)</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Total</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Grade</th>
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
                <h1 className="text-2xl font-bold text-foreground">My Timetable</h1>
                <p className="text-muted-foreground">Class schedule for {studentClass}</p>
              </div>
              <div className="space-y-6">
                {days.map((day) => {
                  const dayEntries = myTimetable.filter(t => t.day === day).sort((a, b) => a.time.localeCompare(b.time));
                  return (
                    <Card key={day} className="border-none shadow-card">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-primary" />
                          {day}
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
                <h1 className="text-2xl font-bold text-foreground">Fee Information</h1>
                <p className="text-muted-foreground">View your fee status and payment history</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Total Fees</p>
                    <p className="text-2xl font-bold text-foreground">₦{totalFees.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Amount Paid</p>
                    <p className="text-2xl font-bold text-success">₦{totalPaid.toLocaleString()}</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-card">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-1">Balance</p>
                    <p className="text-2xl font-bold text-destructive">₦{(totalFees - totalPaid).toLocaleString()}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-none shadow-card">
                <CardHeader>
                  <CardTitle>Fee Breakdown</CardTitle>
                  <CardDescription>First Term 2024/2025</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Fee Type</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Amount</th>
                          <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">Paid</th>
                          <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {myFees.map((fee, index) => (
                          <tr key={index} className="border-b border-border/50">
                            <td className="py-3 px-4 font-medium text-foreground">{fee.structure.name}</td>
                            <td className="py-3 px-4 text-right text-muted-foreground">₦{fee.structure.amount.toLocaleString()}</td>
                            <td className="py-3 px-4 text-right text-foreground">₦{(fee.payment?.amount || 0).toLocaleString()}</td>
                            <td className="py-3 px-4 text-center">
                              <Badge variant={fee.payment?.status === 'paid' ? 'default' : fee.payment?.status === 'partial' ? 'secondary' : 'destructive'}>
                                {fee.payment?.status || 'Pending'}
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

          {activeTab === "announcements" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
                <p className="text-muted-foreground">Latest news and updates</p>
              </div>
              <div className="space-y-4">
                {announcements.map((item, index) => (
                  <Card key={index} className={`border-none shadow-card ${item.urgent ? 'border-l-4 border-l-destructive' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
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
            <div className="max-w-4xl">
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="md:col-span-1 border-none shadow-card h-fit">
                  <CardContent className="p-4">
                    <nav className="space-y-1">
                      {[
                        { id: "profile", label: "Profile", icon: User },
                        { id: "notifications", label: "Notifications", icon: Bell },
                        { id: "security", label: "Security", icon: Shield },
                        { id: "appearance", label: "Appearance", icon: Palette },
                      ].map((section) => (
                        <button
                          key={section.id}
                          onClick={() => setSettingsSection(section.id)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left ${
                            settingsSection === section.id
                              ? "bg-primary text-primary-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <section.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{section.label}</span>
                        </button>
                      ))}
                    </nav>
                  </CardContent>
                </Card>

                <div className="md:col-span-3">
                  {settingsSection === "profile" && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <User className="w-5 h-5 text-primary" />
                          Profile Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-2xl font-bold">
                            {student.firstName?.charAt(0) || "A"}
                          </div>
                          <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-2" />Change Photo</Button>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Full Name</Label>
                            <Input value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Class</Label>
                            <Input value={studentClass} disabled />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => toast.success("Profile updated!")}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {settingsSection === "notifications" && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-primary" />Notifications</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <div><p className="font-medium">Email Notifications</p></div>
                          </div>
                          <Switch checked={notifications.email} onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })} />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <div><p className="font-medium">SMS Notifications</p></div>
                          </div>
                          <Switch checked={notifications.sms} onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })} />
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => toast.success("Preferences saved!")}><Save className="w-4 h-4 mr-2" />Save</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {settingsSection === "security" && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-primary" />Security</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4 max-w-md">
                          <div className="space-y-2">
                            <Label>Current Password</Label>
                            <Input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>New Password</Label>
                            <Input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} />
                          </div>
                          <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} />
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => { if (passwords.new === passwords.confirm && passwords.new.length >= 6) { toast.success("Password updated!"); setPasswords({ current: "", new: "", confirm: "" }); } else { toast.error("Passwords must match and be at least 6 characters"); } }}>
                            <Lock className="w-4 h-4 mr-2" />Update Password
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {settingsSection === "appearance" && (
                    <Card className="border-none shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-primary" />Appearance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <button className="p-4 rounded-lg border-2 border-primary bg-card text-center">
                            <div className="w-8 h-8 rounded-full bg-background border mx-auto mb-2" />
                            <span className="text-sm font-medium">Light</span>
                          </button>
                          <button className="p-4 rounded-lg border border-border bg-card text-center opacity-50">
                            <div className="w-8 h-8 rounded-full bg-foreground mx-auto mb-2" />
                            <span className="text-sm font-medium">Dark</span>
                            <p className="text-xs text-muted-foreground">Soon</p>
                          </button>
                          <button className="p-4 rounded-lg border border-border bg-card text-center opacity-50">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-background to-foreground mx-auto mb-2" />
                            <span className="text-sm font-medium">System</span>
                            <p className="text-xs text-muted-foreground">Soon</p>
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
