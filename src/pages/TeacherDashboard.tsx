import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  CheckCircle,
  Save
} from "lucide-react";
import { toast } from "sonner";

const TeacherDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
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

  const [scores, setScores] = useState(
    students.map(s => ({ id: s.id, ca1: s.ca1, ca2: s.ca2, exam: s.exam }))
  );

  const updateScore = (studentId: number, field: string, value: string) => {
    setScores(prev => prev.map(s => 
      s.id === studentId ? { ...s, [field]: parseInt(value) || 0 } : s
    ));
  };

  const handleSaveResults = () => {
    toast.success("Results saved successfully!");
  };

  const menuItems = [
    { icon: User, label: "My Profile", active: false },
    { icon: Users, label: "My Classes", active: false },
    { icon: FileText, label: "Upload Results", active: true },
    { icon: Bell, label: "Announcements", active: false },
  ];

  const myClasses = [
    { class: "JSS 1A", subject: "Mathematics", students: 35 },
    { class: "JSS 1B", subject: "Mathematics", students: 32 },
    { class: "JSS 2A", subject: "Mathematics", students: 38 },
    { class: "JSS 2B", subject: "Mathematics", students: 30 },
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
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-success to-success/80 flex items-center justify-center shadow-md">
              <BookOpen className="w-6 h-6 text-success-foreground" />
            </div>
            <span className="font-bold text-lg text-foreground">Teacher Portal</span>
          </Link>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                item.active 
                  ? 'bg-success text-success-foreground' 
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
                <h1 className="font-bold text-lg text-foreground">Mr. Ahmed Ibrahim</h1>
                <p className="text-sm text-muted-foreground">Mathematics Teacher</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center text-success-foreground font-semibold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-4 lg:p-8">
          {/* My Classes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {myClasses.map((cls, index) => (
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

          {/* Result Upload Section */}
          <Card className="border-none shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-success" />
                Upload Student Results
              </CardTitle>
              <CardDescription>Enter or update student scores for the selected class</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <Label>Select Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jss1a">JSS 1A</SelectItem>
                      <SelectItem value="jss1b">JSS 1B</SelectItem>
                      <SelectItem value="jss2a">JSS 2A</SelectItem>
                      <SelectItem value="jss2b">JSS 2B</SelectItem>
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
                      <SelectItem value="math">Mathematics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Term</Label>
                  <Select defaultValue="first">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">First Term</SelectItem>
                      <SelectItem value="second">Second Term</SelectItem>
                      <SelectItem value="third">Third Term</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Results Table */}
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
                    {students.map((student, index) => {
                      const studentScores = scores.find(s => s.id === student.id)!;
                      const total = studentScores.ca1 + studentScores.ca2 + studentScores.exam;
                      return (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4 text-muted-foreground text-sm">{student.regNo}</td>
                          <td className="py-3 px-4 font-medium text-foreground">{student.name}</td>
                          <td className="py-3 px-4 text-center">
                            <Input 
                              type="number" 
                              min="0" 
                              max="20" 
                              value={studentScores.ca1}
                              onChange={(e) => updateScore(student.id, 'ca1', e.target.value)}
                              className="w-16 h-8 text-center mx-auto"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Input 
                              type="number" 
                              min="0" 
                              max="20" 
                              value={studentScores.ca2}
                              onChange={(e) => updateScore(student.id, 'ca2', e.target.value)}
                              className="w-16 h-8 text-center mx-auto"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <Input 
                              type="number" 
                              min="0" 
                              max="60" 
                              value={studentScores.exam}
                              onChange={(e) => updateScore(student.id, 'exam', e.target.value)}
                              className="w-16 h-8 text-center mx-auto"
                            />
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className={`font-bold ${total >= 70 ? 'text-success' : total >= 50 ? 'text-warning' : 'text-destructive'}`}>
                              {total}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mt-6 gap-3">
                <Button variant="outline">Cancel</Button>
                <Button variant="success" onClick={handleSaveResults}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
