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
  User,
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
  Mail,
  Phone,
  Camera
} from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [settingsSection, setSettingsSection] = useState("profile");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();
  const { timetable, currentUser, logout } = useDemoData();

  const teacher = currentUser as any || { name: "Mr. Ahmed Ibrahim", email: "ahmed@daruulum.edu", subjects: ["Mathematics"], classes: ["JSS 1A", "JSS 2A"] };
  const teacherName = teacher?.name || "Mr. Ahmed Ibrahim";
  const teacherClasses = teacher?.classes || ["JSS 1A", "JSS 1B", "JSS 2A", "JSS 2B"];
  const teacherSubjects = teacher?.subjects || ["Mathematics"];

  // Filter timetable for this teacher
  const myTimetable = timetable.filter(t => t.teacher === teacherName);
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
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
    { icon: TrendingUp, label: "Dashboard", id: "dashboard" },
    { icon: Users, label: "My Classes", id: "classes" },
    { icon: Calendar, label: "Timetable", id: "timetable" },
    { icon: FileText, label: "Upload Results", id: "results" },
    { icon: Bell, label: "Announcements", id: "announcements" },
    { icon: Settings, label: "Settings", id: "settings" },
  ];

  const myClasses = teacherClasses.map((cls: string) => ({
    class: cls,
    subject: teacherSubjects[0] || "Mathematics",
    students: Math.floor(Math.random() * 10) + 30
  }));

  return (
    <div className="min-h-screen bg-muted/30">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-success-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Teacher Portal</span>
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
                <h1 className="font-bold text-lg text-foreground">{teacherName}</h1>
                <p className="text-sm text-muted-foreground">{teacherSubjects.join(", ")} Teacher</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
                        <p className="text-sm text-muted-foreground mb-1">Total Students</p>
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
                        <p className="text-sm text-muted-foreground mb-1">Today's Classes</p>
                        <p className="text-3xl font-bold text-foreground">{myTimetable.filter(t => t.day === "Monday").length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-primary" />
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
                          {cls.students} students
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
                        <Badge variant="secondary">{cls.students} students</Badge>
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
                <h1 className="text-2xl font-bold text-foreground">My Timetable</h1>
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
                          {day}
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
                    <Label>Select Class</Label>
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
                    <Label>Select Subject</Label>
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
                    <Label>Term</Label>
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
                      {students.map((student) => {
                        const studentScores = scores.find(s => s.id === student.id)!;
                        const total = studentScores.ca1 + studentScores.ca2 + studentScores.exam;
                        return (
                          <tr key={student.id} className="border-b border-border/50">
                            <td className="py-3 px-4 text-muted-foreground text-sm">{student.regNo}</td>
                            <td className="py-3 px-4 font-medium text-foreground">{student.name}</td>
                            <td className="py-3 px-4 text-center">
                              <Input type="number" min="0" max="20" value={studentScores.ca1} onChange={(e) => updateScore(student.id, 'ca1', e.target.value)} className="w-16 h-8 text-center mx-auto" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Input type="number" min="0" max="20" value={studentScores.ca2} onChange={(e) => updateScore(student.id, 'ca2', e.target.value)} className="w-16 h-8 text-center mx-auto" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <Input type="number" min="0" max="60" value={studentScores.exam} onChange={(e) => updateScore(student.id, 'exam', e.target.value)} className="w-16 h-8 text-center mx-auto" />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className={`font-bold ${total >= 70 ? 'text-success' : total >= 50 ? 'text-warning' : 'text-destructive'}`}>{total}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mt-6 gap-3">
                  <Button variant="outline">Cancel</Button>
                  <Button variant="default" onClick={handleSaveResults}>
                    <Save className="w-4 h-4 mr-2" />
                    Save Results
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "announcements" && (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
                <p className="text-muted-foreground">Latest school updates</p>
              </div>
              <div className="space-y-4">
                {[
                  { title: "Staff meeting on Friday", date: "Jan 2, 2025", urgent: true },
                  { title: "Submit term results by next week", date: "Dec 30, 2024", urgent: true },
                  { title: "New curriculum guidelines available", date: "Dec 28, 2024", urgent: false },
                ].map((item, index) => (
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
                            settingsSection === section.id ? "bg-success text-success-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
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
                        <CardTitle className="flex items-center gap-2"><User className="w-5 h-5 text-success" />Profile</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center text-success-foreground text-2xl font-bold">
                            {teacherName.charAt(0)}
                          </div>
                          <Button variant="outline" size="sm"><Camera className="w-4 h-4 mr-2" />Change Photo</Button>
                        </div>
                        <Separator />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2"><Label>Full Name</Label><Input value={profileData.name} onChange={(e) => setProfileData({ ...profileData, name: e.target.value })} /></div>
                          <div className="space-y-2"><Label>Email</Label><Input type="email" value={profileData.email} onChange={(e) => setProfileData({ ...profileData, email: e.target.value })} /></div>
                          <div className="space-y-2"><Label>Phone</Label><Input value={profileData.phone} onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })} /></div>
                          <div className="space-y-2"><Label>Subjects</Label><Input value={teacherSubjects.join(", ")} disabled /></div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => toast.success("Profile updated!")}><Save className="w-4 h-4 mr-2" />Save Changes</Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {settingsSection === "notifications" && (
                    <Card className="border-none shadow-card">
                      <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="w-5 h-5 text-success" />Notifications</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-muted-foreground" /><p className="font-medium">Email Notifications</p></div>
                          <Switch checked={notifications.email} onCheckedChange={(c) => setNotifications({ ...notifications, email: c })} />
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-muted-foreground" /><p className="font-medium">SMS Notifications</p></div>
                          <Switch checked={notifications.sms} onCheckedChange={(c) => setNotifications({ ...notifications, sms: c })} />
                        </div>
                        <div className="flex justify-end"><Button onClick={() => toast.success("Saved!")}><Save className="w-4 h-4 mr-2" />Save</Button></div>
                      </CardContent>
                    </Card>
                  )}

                  {settingsSection === "security" && (
                    <Card className="border-none shadow-card">
                      <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5 text-success" />Security</CardTitle></CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-4 max-w-md">
                          <div className="space-y-2"><Label>Current Password</Label><Input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} /></div>
                          <div className="space-y-2"><Label>New Password</Label><Input type="password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} /></div>
                          <div className="space-y-2"><Label>Confirm Password</Label><Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} /></div>
                        </div>
                        <div className="flex justify-end">
                          <Button onClick={() => { if (passwords.new === passwords.confirm && passwords.new.length >= 6) { toast.success("Password updated!"); setPasswords({ current: "", new: "", confirm: "" }); } else { toast.error("Check password requirements"); } }}>
                            <Lock className="w-4 h-4 mr-2" />Update Password
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {settingsSection === "appearance" && (
                    <Card className="border-none shadow-card">
                      <CardHeader><CardTitle className="flex items-center gap-2"><Palette className="w-5 h-5 text-success" />Appearance</CardTitle></CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-4">
                          <button className="p-4 rounded-lg border-2 border-success bg-card text-center"><div className="w-8 h-8 rounded-full bg-background border mx-auto mb-2" /><span className="text-sm font-medium">Light</span></button>
                          <button className="p-4 rounded-lg border border-border bg-card text-center opacity-50"><div className="w-8 h-8 rounded-full bg-foreground mx-auto mb-2" /><span className="text-sm font-medium">Dark</span><p className="text-xs text-muted-foreground">Soon</p></button>
                          <button className="p-4 rounded-lg border border-border bg-card text-center opacity-50"><div className="w-8 h-8 rounded-full bg-gradient-to-br from-background to-foreground mx-auto mb-2" /><span className="text-sm font-medium">System</span><p className="text-xs text-muted-foreground">Soon</p></button>
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

export default TeacherDashboard;
