import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useDemoData } from "@/contexts/DemoDataContext";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    dob: "",
    class: "",
    parentName: "",
    parentPhone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate();
  const { addStudent, classes } = useDemoData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.surname || !formData.dob || !formData.class || !formData.parentName || !formData.parentPhone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newStudent = addStudent({
        firstName: formData.firstName,
        middleName: formData.middleName,
        surname: formData.surname,
        dob: formData.dob,
        class: formData.class,
        parentName: formData.parentName,
        parentPhone: formData.parentPhone,
        email: formData.email,
        status: "pending",
      });
      
      setRegNo(newStudent.regNo);
      setSuccess(true);
      toast.success("Registration submitted successfully!");
      setLoading(false);
    }, 1500);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <Card className="shadow-2xl border-none max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-success" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h2>
            <p className="text-muted-foreground mb-6">
              Your registration has been submitted and is pending admin approval.
            </p>
            <div className="bg-muted p-4 rounded-lg mb-6">
              <p className="text-sm text-muted-foreground mb-1">Your Registration Number</p>
              <p className="text-2xl font-bold text-primary">{regNo}</p>
            </div>
            <div className="bg-warning/10 border border-warning/20 p-4 rounded-lg mb-6">
              <p className="text-sm text-foreground">
                <strong>Important:</strong> Save your registration number. You will need it along with your surname and date of birth to login once approved.
              </p>
            </div>
            <div className="space-y-3">
              <Button variant="hero" className="w-full" onClick={() => navigate("/student-login")}>
                Go to Login Page
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/")}>
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="shadow-2xl border-none">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl font-bold">Student Registration</CardTitle>
            <CardDescription>
              Register for admission to Daru Ulum School
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="middleName">Middle Name</Label>
                    <Input
                      id="middleName"
                      placeholder="Enter middle name"
                      value={formData.middleName}
                      onChange={(e) => updateField("middleName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Surname *</Label>
                    <Input
                      id="surname"
                      placeholder="Enter surname"
                      value={formData.surname}
                      onChange={(e) => updateField("surname", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => updateField("dob", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Academic Information</h3>
                <div className="space-y-2">
                  <Label>Class Applying For *</Label>
                  <Select value={formData.class} onValueChange={(value) => updateField("class", value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.name}>{cls.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Parent/Guardian Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="parentName">Parent/Guardian Name *</Label>
                    <Input
                      id="parentName"
                      placeholder="Enter parent/guardian name"
                      value={formData.parentName}
                      onChange={(e) => updateField("parentName", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="parentPhone">Phone Number *</Label>
                    <Input
                      id="parentPhone"
                      type="tel"
                      placeholder="08012345678"
                      value={formData.parentPhone}
                      onChange={(e) => updateField("parentPhone", e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="parent@email.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By submitting this form, you agree to our terms and conditions. Your registration will be reviewed by the school admin and you will be notified once approved.
                </p>
              </div>

              <Button 
                type="submit" 
                variant="hero" 
                size="lg" 
                className="w-full"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Registration"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already registered?{" "}
                <Link to="/student-login" className="text-primary hover:underline font-medium">
                  Login Here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} Daru Ulum School
        </p>
      </div>
    </div>
  );
};

export default StudentRegistration;
