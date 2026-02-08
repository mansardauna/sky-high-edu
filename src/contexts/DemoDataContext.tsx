import React, { createContext, useContext, useState, ReactNode } from "react";

// Types
export interface Student {
  id: string;
  surname: string;
  firstName: string;
  middleName?: string;
  dob: string;
  regNo: string;
  class: string;
  status: "active" | "suspended" | "inactive" | "pending";
  email?: string;
  phone?: string;
  parentName?: string;
  parentPhone?: string;
  dateRegistered: string;
}

export interface Teacher {
  id: string;
  name: string;
  email: string;
  password: string;
  subjects: string[];
  classes: string[];
  status: "active" | "suspended";
  salary?: TeacherSalary;
}

export interface TeacherSalary {
  basic: number;
  allowances: number;
  deductions: number;
  accountNumber?: string;
  bankName?: string;
  withdrawableBalance: number;
  lastPaymentDate?: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "super_admin";
}

export interface TimetableEntry {
  id: string;
  day: string;
  time: string;
  subject: string;
  teacher: string;
  class: string;
  room: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
}

export interface ClassInfo {
  id: string;
  name: string;
  section: string;
  capacity: number;
}

export interface Result {
  studentId: string;
  subjectId: string;
  ca1: number;
  ca2: number;
  exam: number;
  term: string;
  session: string;
}

export interface FeeStructure {
  id: string;
  name: string;
  amount: number;
  term: string;
  classLevel: string;
}

export interface FeePayment {
  id: string;
  studentId: string;
  feeId: string;
  amount: number;
  paidDate: string;
  paymentMethod: string;
  reference: string;
  status: "paid" | "partial" | "pending";
}

export interface SalaryWithdrawal {
  id: string;
  teacherId: string;
  amount: number;
  status: "pending" | "approved" | "rejected" | "completed";
  requestDate: string;
  processedDate?: string;
  accountNumber: string;
  bankName: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "admissions" | "events" | "notice" | "academic" | "urgent";
  targetAudience: "all" | "students" | "teachers";
  date: string;
  createdBy: string;
  isActive: boolean;
}

interface DemoDataContextType {
  students: Student[];
  teachers: Teacher[];
  admins: Admin[];
  timetable: TimetableEntry[];
  subjects: Subject[];
  classes: ClassInfo[];
  results: Result[];
  feeStructures: FeeStructure[];
  feePayments: FeePayment[];
  salaryWithdrawals: SalaryWithdrawal[];
  announcements: Announcement[];
  currentUser: (Student | Teacher | Admin) | null;
  userRole: string | null;
  
  // Auth functions
  loginStudent: (surname: string, dob: string) => Student | null;
  loginStaff: (email: string, password: string, role: string) => (Teacher | Admin) | null;
  logout: () => void;
  
  // Student functions
  addStudent: (student: Omit<Student, "id" | "regNo" | "dateRegistered">) => Student;
  updateStudent: (id: string, updates: Partial<Student>) => void;
  approveStudent: (id: string) => void;
  suspendStudent: (id: string) => void;
  activateStudent: (id: string) => void;
  
  // Teacher functions
  addTeacher: (teacher: Omit<Teacher, "id">) => Teacher;
  updateTeacher: (id: string, updates: Partial<Teacher>) => void;
  assignSubjectToTeacher: (teacherId: string, subject: string, classNames: string[]) => void;
  
  // Timetable functions
  addTimetableEntry: (entry: Omit<TimetableEntry, "id">) => void;
  updateTimetableEntry: (id: string, updates: Partial<TimetableEntry>) => void;
  deleteTimetableEntry: (id: string) => void;
  
  // Result functions
  updateResult: (studentId: string, subjectId: string, scores: { ca1?: number; ca2?: number; exam?: number }) => void;
  getStudentResults: (studentId: string) => Result[];
  
  // Fee functions
  addFeePayment: (payment: Omit<FeePayment, "id">) => void;
  updateFeePayment: (paymentId: string, updates: Partial<FeePayment>) => void;
  getStudentFees: (studentId: string) => { structure: FeeStructure; payment?: FeePayment }[];
  updateFeeStructure: (id: string, updates: Partial<FeeStructure>) => void;
  addFeeStructure: (fee: Omit<FeeStructure, "id">) => void;
  
  // Salary functions
  updateTeacherSalary: (teacherId: string, salary: Partial<TeacherSalary>) => void;
  requestWithdrawal: (teacherId: string, amount: number, accountNumber: string, bankName: string) => void;
  processWithdrawal: (withdrawalId: string, status: "approved" | "rejected" | "completed") => void;

  // Announcement functions
  addAnnouncement: (announcement: Omit<Announcement, "id" | "date">) => void;
  updateAnnouncement: (id: string, updates: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;
  getActiveAnnouncements: (audience?: "all" | "students" | "teachers") => Announcement[];
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

// Demo Data
const initialStudents: Student[] = [
  { id: "s1", surname: "Ibrahim", firstName: "أحمد", dob: "15-05-2010", regNo: "DU/2024/001", class: "إعدادي ١أ", status: "active", parentName: "السيد إبراهيم", parentPhone: "08012345678", dateRegistered: "٢٠٢٤-٠١-١٥" },
  { id: "s2", surname: "يوسف", firstName: "فاطمة", dob: "22-08-2009", regNo: "DU/2024/002", class: "إعدادي ٢ب", status: "active", parentName: "السيدة يوسف", parentPhone: "08023456789", dateRegistered: "٢٠٢٤-٠١-١٦" },
  { id: "s3", surname: "Ali", firstName: "محمد", dob: "10-03-2008", regNo: "DU/2024/003", class: "توجيهي ١أ", status: "suspended", parentName: "السيد علي", parentPhone: "08034567890", dateRegistered: "٢٠٢٤-٠١-١٧" },
  { id: "s4", surname: "بيلو", firstName: "عائشة", dob: "30-11-2010", regNo: "DU/2024/004", class: "إعدادي ٣أ", status: "inactive", parentName: "السيد بيلو", parentPhone: "08045678901", dateRegistered: "٢٠٢٤-٠١-١٨" },
  { id: "s5", surname: "سليمان", firstName: "عمر", dob: "14-02-2010", regNo: "DU/2024/005", class: "إعدادي ١أ", status: "pending", parentName: "السيد سليمان", parentPhone: "08056789012", dateRegistered: "٢٠٢٤-١٢-٢٨" },
  { id: "s6", surname: "عبد الله", firstName: "خديجة", dob: "20-07-2009", regNo: "DU/2024/006", class: "إعدادي ٢أ", status: "pending", parentName: "السيدة عبد الله", parentPhone: "08067890123", dateRegistered: "٢٠٢٤-١٢-٢٩" },
];

const initialTeachers: Teacher[] = [
  { 
    id: "t1", 
    name: "الأستاذ أحمد إبراهيم", 
    email: "ahmed@daruulum.edu", 
    password: "teacher123", 
    subjects: ["الرياضيات"], 
    classes: ["إعدادي ١أ", "إعدادي ٢أ"], 
    status: "active",
    salary: { basic: 150000, allowances: 30000, deductions: 15000, withdrawableBalance: 165000, accountNumber: "1234567890", bankName: "First Bank", lastPaymentDate: "2024-12-25" }
  },
  { 
    id: "t2", 
    name: "الأستاذة فاطمة يوسف", 
    email: "fatima@daruulum.edu", 
    password: "teacher123", 
    subjects: ["اللغة الإنجليزية"], 
    classes: ["إعدادي ١ب", "إعدادي ٢ب"], 
    status: "active",
    salary: { basic: 145000, allowances: 25000, deductions: 12000, withdrawableBalance: 158000, accountNumber: "0987654321", bankName: "GTBank", lastPaymentDate: "2024-12-25" }
  },
  { 
    id: "t3", 
    name: "الأستاذ إبراهيم موسى", 
    email: "ibrahim@daruulum.edu", 
    password: "teacher123", 
    subjects: ["الدراسات الإسلامية", "اللغة العربية"], 
    classes: ["إعدادي ٣أ"], 
    status: "suspended",
    salary: { basic: 160000, allowances: 35000, deductions: 18000, withdrawableBalance: 0 }
  },
  { 
    id: "t4", 
    name: "الدكتور موسى عليو", 
    email: "musa@daruulum.edu", 
    password: "teacher123", 
    subjects: ["العلوم"], 
    classes: ["توجيهي ١أ", "توجيهي ٢أ"], 
    status: "active",
    salary: { basic: 200000, allowances: 50000, deductions: 25000, withdrawableBalance: 225000, accountNumber: "1122334455", bankName: "UBA", lastPaymentDate: "2024-12-25" }
  },
  { 
    id: "t5", 
    name: "الأستاذة زينب أبوبكر", 
    email: "zainab@daruulum.edu", 
    password: "teacher123", 
    subjects: ["الدراسات الاجتماعية"], 
    classes: ["إعدادي ١أ", "إعدادي ١ب"], 
    status: "active",
    salary: { basic: 140000, allowances: 20000, deductions: 10000, withdrawableBalance: 150000, accountNumber: "5544332211", bankName: "Zenith Bank", lastPaymentDate: "2024-12-25" }
  },
];

const initialAdmins: Admin[] = [
  { id: "a1", name: "Admin User", email: "admin@daruulum.edu", password: "admin123", role: "admin" },
  { id: "a2", name: "Super Admin", email: "superadmin@daruulum.edu", password: "super123", role: "super_admin" },
];

const initialSubjects: Subject[] = [
  { id: "sub1", name: "الرياضيات", code: "MTH" },
  { id: "sub2", name: "اللغة الإنجليزية", code: "ENG" },
  { id: "sub3", name: "الدراسات الإسلامية", code: "ISL" },
  { id: "sub4", name: "اللغة العربية", code: "ARB" },
  { id: "sub5", name: "العلوم", code: "SCI" },
  { id: "sub6", name: "الدراسات الاجتماعية", code: "SST" },
  { id: "sub7", name: "علوم الحاسوب", code: "CSC" },
  { id: "sub8", name: "التربية البدنية", code: "PHE" },
  { id: "sub9", name: "الدراسات القرآنية", code: "QRN" },
  { id: "sub10", name: "الفقه الإسلامي", code: "FQH" },
  { id: "sub11", name: "الحديث", code: "HDT" },
];

const initialClasses: ClassInfo[] = [
  // التمهيدي (Tamhidi - Preparatory)
  { id: "c1", name: "تمهيدي ١", section: "أ", capacity: 35 },
  { id: "c2", name: "تمهيدي ٢", section: "أ", capacity: 35 },
  // الإعدادي (I'dadi - Intermediate)
  { id: "c3", name: "إعدادي ١أ", section: "أ", capacity: 40 },
  { id: "c4", name: "إعدادي ١ب", section: "ب", capacity: 40 },
  { id: "c5", name: "إعدادي ٢أ", section: "أ", capacity: 38 },
  { id: "c6", name: "إعدادي ٢ب", section: "ب", capacity: 35 },
  { id: "c7", name: "إعدادي ٣أ", section: "أ", capacity: 42 },
  // التوجيهي (Tawjihi - Secondary)
  { id: "c8", name: "توجيهي ١أ", section: "أ", capacity: 36 },
  { id: "c9", name: "توجيهي ٢أ", section: "أ", capacity: 34 },
  { id: "c10", name: "توجيهي ٣أ", section: "أ", capacity: 30 },
];

const initialTimetable: TimetableEntry[] = [
  { id: "tt1", day: "الإثنين", time: "٠٨:٠٠ - ٠٩:٠٠", subject: "الرياضيات", teacher: "الأستاذ أحمد إبراهيم", class: "إعدادي ١أ", room: "قاعة ١٠١" },
  { id: "tt2", day: "الإثنين", time: "٠٩:٠٠ - ١٠:٠٠", subject: "اللغة الإنجليزية", teacher: "الأستاذة فاطمة يوسف", class: "إعدادي ١أ", room: "قاعة ١٠١" },
  { id: "tt3", day: "الإثنين", time: "١٠:٣٠ - ١١:٣٠", subject: "العلوم", teacher: "الدكتور موسى عليو", class: "إعدادي ١أ", room: "المختبر ١" },
  { id: "tt4", day: "الإثنين", time: "١١:٣٠ - ١٢:٣٠", subject: "الدراسات الإسلامية", teacher: "الأستاذ إبراهيم موسى", class: "إعدادي ١أ", room: "قاعة ١٠١" },
  { id: "tt5", day: "الثلاثاء", time: "٠٨:٠٠ - ٠٩:٠٠", subject: "اللغة العربية", teacher: "الأستاذ إبراهيم موسى", class: "إعدادي ١أ", room: "قاعة ١٠١" },
  { id: "tt6", day: "الثلاثاء", time: "٠٩:٠٠ - ١٠:٠٠", subject: "الدراسات الاجتماعية", teacher: "الأستاذة زينب أبوبكر", class: "إعدادي ١أ", room: "قاعة ١٠١" },
  { id: "tt7", day: "الأربعاء", time: "٠٨:٠٠ - ٠٩:٠٠", subject: "الرياضيات", teacher: "الأستاذ أحمد إبراهيم", class: "إعدادي ٢أ", room: "قاعة ١٠٢" },
  { id: "tt8", day: "الأربعاء", time: "٠٩:٠٠ - ١٠:٠٠", subject: "اللغة الإنجليزية", teacher: "الأستاذة فاطمة يوسف", class: "إعدادي ٢ب", room: "قاعة ١٠٣" },
  { id: "tt9", day: "الخميس", time: "٠٨:٠٠ - ٠٩:٠٠", subject: "العلوم", teacher: "الدكتور موسى عليو", class: "توجيهي ١أ", room: "المختبر ٢" },
  { id: "tt10", day: "الجمعة", time: "٠٨:٠٠ - ٠٩:٠٠", subject: "الدراسات الإسلامية", teacher: "الأستاذ إبراهيم موسى", class: "إعدادي ٣أ", room: "قاعة ١٠٥" },
];

const initialResults: Result[] = [
  { studentId: "s1", subjectId: "sub1", ca1: 15, ca2: 18, exam: 55, term: "First", session: "2024/2025" },
  { studentId: "s1", subjectId: "sub2", ca1: 16, ca2: 17, exam: 48, term: "First", session: "2024/2025" },
  { studentId: "s1", subjectId: "sub3", ca1: 18, ca2: 19, exam: 58, term: "First", session: "2024/2025" },
  { studentId: "s2", subjectId: "sub1", ca1: 18, ca2: 20, exam: 60, term: "First", session: "2024/2025" },
  { studentId: "s2", subjectId: "sub2", ca1: 17, ca2: 18, exam: 52, term: "First", session: "2024/2025" },
];

const initialFeeStructures: FeeStructure[] = [
  { id: "f1", name: "Tuition Fee", amount: 75000, term: "First", classLevel: "JSS" },
  { id: "f2", name: "Development Levy", amount: 15000, term: "First", classLevel: "JSS" },
  { id: "f3", name: "Book Fee", amount: 25000, term: "First", classLevel: "JSS" },
  { id: "f4", name: "Tuition Fee", amount: 95000, term: "First", classLevel: "SSS" },
  { id: "f5", name: "Examination Fee", amount: 10000, term: "First", classLevel: "All" },
  { id: "f6", name: "Laboratory Fee", amount: 5000, term: "First", classLevel: "SSS" },
  { id: "f7", name: "Sports Fee", amount: 3000, term: "First", classLevel: "All" },
];

const initialFeePayments: FeePayment[] = [
  { id: "fp1", studentId: "s1", feeId: "f1", amount: 75000, paidDate: "2024-01-20", paymentMethod: "bank_transfer", reference: "TRX001", status: "paid" },
  { id: "fp2", studentId: "s1", feeId: "f2", amount: 15000, paidDate: "2024-01-20", paymentMethod: "bank_transfer", reference: "TRX001", status: "paid" },
  { id: "fp3", studentId: "s2", feeId: "f1", amount: 50000, paidDate: "2024-01-22", paymentMethod: "cash", reference: "RCP002", status: "partial" },
];

const initialSalaryWithdrawals: SalaryWithdrawal[] = [
  { id: "sw1", teacherId: "t1", amount: 100000, status: "completed", requestDate: "2024-12-15", processedDate: "2024-12-17", accountNumber: "1234567890", bankName: "First Bank" },
  { id: "sw2", teacherId: "t2", amount: 80000, status: "pending", requestDate: "2024-12-28", accountNumber: "0987654321", bankName: "GTBank" },
];

const initialAnnouncements: Announcement[] = [
  { id: "ann1", title: "فتح باب التسجيل للفصل الجديد", content: "التسجيل للفصل الدراسي الجديد مفتوح الآن. يُنصح جميع أولياء الأمور بإكمال التسجيل قبل ١٥ يناير.", category: "admissions", targetAudience: "all", date: "2024-12-28", createdBy: "الإدارة", isActive: true },
  { id: "ann2", title: "نتائج اليوم الرياضي السنوي", content: "تهانينا لجميع المشاركين في يومنا الرياضي السنوي! ستُعلن تفاصيل النتائج وحفل التكريم قريباً.", category: "events", targetAudience: "all", date: "2024-12-25", createdBy: "الإدارة", isActive: true },
  { id: "ann3", title: "جدول العطلة", content: "ستكون المدرسة مغلقة من ٢٠ ديسمبر إلى ٥ يناير لعطلة نهاية العام. تستأنف الدراسة في ٦ يناير.", category: "notice", targetAudience: "all", date: "2024-12-20", createdBy: "الإدارة", isActive: true },
  { id: "ann4", title: "اجتماع المعلمين", content: "اجتماع إلزامي للموظفين يوم الإثنين الساعة ٢ ظهراً في القاعة الرئيسية. يجب على جميع المعلمين الحضور.", category: "academic", targetAudience: "teachers", date: "2024-12-18", createdBy: "المدير العام", isActive: true },
  { id: "ann5", title: "صدور جدول الامتحانات", content: "صدر جدول الامتحانات لهذا الفصل. يمكن للطلاب الاطلاع عليه في لوحة التحكم الخاصة بهم.", category: "academic", targetAudience: "students", date: "2024-12-15", createdBy: "الإدارة", isActive: true },
];

export const DemoDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [admins] = useState<Admin[]>(initialAdmins);
  const [timetable, setTimetable] = useState<TimetableEntry[]>(initialTimetable);
  const [subjects] = useState<Subject[]>(initialSubjects);
  const [classes] = useState<ClassInfo[]>(initialClasses);
  const [results, setResults] = useState<Result[]>(initialResults);
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>(initialFeeStructures);
  const [feePayments, setFeePayments] = useState<FeePayment[]>(initialFeePayments);
  const [salaryWithdrawals, setSalaryWithdrawals] = useState<SalaryWithdrawal[]>(initialSalaryWithdrawals);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [currentUser, setCurrentUser] = useState<(Student | Teacher | Admin) | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Helper to convert Arabic numerals to Western
  const arabicToWestern = (str: string): string => {
    const arabicNumerals = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    let result = str;
    arabicNumerals.forEach((num, index) => {
      result = result.replace(new RegExp(num, 'g'), index.toString());
    });
    return result;
  };

  // Helper to normalize date format for comparison
  const normalizeDob = (dob: string): string => {
    const western = arabicToWestern(dob);
    // Handle both DD-MM-YYYY and YYYY-MM-DD formats
    const parts = western.split('-');
    if (parts.length === 3) {
      if (parts[0].length === 4) {
        // YYYY-MM-DD format
        return western;
      } else {
        // DD-MM-YYYY format -> convert to YYYY-MM-DD
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
    }
    return western;
  };

  const loginStudent = (surname: string, dob: string): Student | null => {
    const normalizedInputDob = normalizeDob(dob);
    const student = students.find(s => {
      const normalizedStoredDob = normalizeDob(s.dob);
      const surnameMatch = s.surname.toLowerCase() === surname.toLowerCase() || 
                          arabicToWestern(s.surname).toLowerCase() === surname.toLowerCase() ||
                          s.surname === surname;
      return surnameMatch && normalizedStoredDob === normalizedInputDob && s.status === "active";
    });
    if (student) {
      setCurrentUser(student);
      setUserRole("student");
      return student;
    }
    return null;
  };

  const loginStaff = (email: string, password: string, role: string): (Teacher | Admin) | null => {
    if (role === "teacher") {
      const teacher = teachers.find(t => t.email === email && t.password === password && t.status === "active");
      if (teacher) {
        setCurrentUser(teacher);
        setUserRole("teacher");
        return teacher;
      }
    } else {
      const admin = admins.find(a => a.email === email && a.password === password && a.role === role);
      if (admin) {
        setCurrentUser(admin);
        setUserRole(role);
        return admin;
      }
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
  };

  const addStudent = (student: Omit<Student, "id" | "regNo" | "dateRegistered">): Student => {
    const newId = `s${students.length + 1}`;
    const regNo = `DU/2024/${String(students.length + 1).padStart(3, "0")}`;
    const newStudent: Student = { ...student, id: newId, regNo, dateRegistered: new Date().toISOString().split("T")[0] };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const approveStudent = (id: string) => updateStudent(id, { status: "active" });
  const suspendStudent = (id: string) => updateStudent(id, { status: "suspended" });
  const activateStudent = (id: string) => updateStudent(id, { status: "active" });

  const addTeacher = (teacher: Omit<Teacher, "id">): Teacher => {
    const newId = `t${teachers.length + 1}`;
    const newTeacher: Teacher = { ...teacher, id: newId };
    setTeachers(prev => [...prev, newTeacher]);
    return newTeacher;
  };

  const updateTeacher = (id: string, updates: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const assignSubjectToTeacher = (teacherId: string, subject: string, classNames: string[]) => {
    setTeachers(prev => prev.map(t => {
      if (t.id === teacherId) {
        const newSubjects = t.subjects.includes(subject) ? t.subjects : [...t.subjects, subject];
        const newClasses = [...new Set([...t.classes, ...classNames])];
        return { ...t, subjects: newSubjects, classes: newClasses };
      }
      return t;
    }));
  };

  const addTimetableEntry = (entry: Omit<TimetableEntry, "id">) => {
    const newId = `tt${timetable.length + 1}`;
    setTimetable(prev => [...prev, { ...entry, id: newId }]);
  };

  const updateTimetableEntry = (id: string, updates: Partial<TimetableEntry>) => {
    setTimetable(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTimetableEntry = (id: string) => {
    setTimetable(prev => prev.filter(t => t.id !== id));
  };

  const updateResult = (studentId: string, subjectId: string, scores: { ca1?: number; ca2?: number; exam?: number }) => {
    setResults(prev => {
      const existingIndex = prev.findIndex(r => r.studentId === studentId && r.subjectId === subjectId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], ...scores };
        return updated;
      } else {
        return [...prev, { studentId, subjectId, ca1: scores.ca1 || 0, ca2: scores.ca2 || 0, exam: scores.exam || 0, term: "First", session: "2024/2025" }];
      }
    });
  };

  const getStudentResults = (studentId: string): Result[] => results.filter(r => r.studentId === studentId);

  const addFeePayment = (payment: Omit<FeePayment, "id">) => {
    const newId = `fp${feePayments.length + 1}`;
    setFeePayments(prev => [...prev, { ...payment, id: newId }]);
  };

  const updateFeePayment = (paymentId: string, updates: Partial<FeePayment>) => {
    setFeePayments(prev => prev.map(p => p.id === paymentId ? { ...p, ...updates } : p));
  };

  const getStudentFees = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return [];
    const classLevel = student.class.startsWith("SSS") ? "SSS" : "JSS";
    return feeStructures
      .filter(f => f.classLevel === classLevel || f.classLevel === "All")
      .map(structure => ({
        structure,
        payment: feePayments.find(p => p.studentId === studentId && p.feeId === structure.id)
      }));
  };

  const updateFeeStructure = (id: string, updates: Partial<FeeStructure>) => {
    setFeeStructures(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const addFeeStructure = (fee: Omit<FeeStructure, "id">) => {
    const newId = `f${feeStructures.length + 1}`;
    setFeeStructures(prev => [...prev, { ...fee, id: newId }]);
  };

  const updateTeacherSalary = (teacherId: string, salary: Partial<TeacherSalary>) => {
    setTeachers(prev => prev.map(t => {
      if (t.id === teacherId) {
        return { ...t, salary: { ...t.salary, ...salary } as TeacherSalary };
      }
      return t;
    }));
  };

  const requestWithdrawal = (teacherId: string, amount: number, accountNumber: string, bankName: string) => {
    const newId = `sw${salaryWithdrawals.length + 1}`;
    setSalaryWithdrawals(prev => [...prev, {
      id: newId,
      teacherId,
      amount,
      status: "pending",
      requestDate: new Date().toISOString().split("T")[0],
      accountNumber,
      bankName
    }]);
  };

  const processWithdrawal = (withdrawalId: string, status: "approved" | "rejected" | "completed") => {
    setSalaryWithdrawals(prev => prev.map(w => {
      if (w.id === withdrawalId) {
        const updated = { ...w, status, processedDate: new Date().toISOString().split("T")[0] };
        // If completed, deduct from teacher's balance
        if (status === "completed") {
          const teacher = teachers.find(t => t.id === w.teacherId);
          if (teacher?.salary) {
            updateTeacherSalary(w.teacherId, {
              withdrawableBalance: teacher.salary.withdrawableBalance - w.amount
            });
          }
        }
        return updated;
      }
      return w;
    }));
  };

  // Announcement functions
  const addAnnouncement = (announcement: Omit<Announcement, "id" | "date">) => {
    const newId = `ann${announcements.length + 1}`;
    const newAnnouncement: Announcement = {
      ...announcement,
      id: newId,
      date: new Date().toISOString().split("T")[0]
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
  };

  const updateAnnouncement = (id: string, updates: Partial<Announcement>) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  };

  const getActiveAnnouncements = (audience?: "all" | "students" | "teachers") => {
    return announcements
      .filter(a => a.isActive)
      .filter(a => !audience || a.targetAudience === "all" || a.targetAudience === audience)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  return (
    <DemoDataContext.Provider value={{
      students, teachers, admins, timetable, subjects, classes, results, feeStructures, feePayments, salaryWithdrawals, announcements,
      currentUser, userRole, loginStudent, loginStaff, logout,
      addStudent, updateStudent, approveStudent, suspendStudent, activateStudent,
      addTeacher, updateTeacher, assignSubjectToTeacher,
      addTimetableEntry, updateTimetableEntry, deleteTimetableEntry,
      updateResult, getStudentResults, addFeePayment, updateFeePayment, getStudentFees, updateFeeStructure, addFeeStructure,
      updateTeacherSalary, requestWithdrawal, processWithdrawal,
      addAnnouncement, updateAnnouncement, deleteAnnouncement, getActiveAnnouncements,
    }}>
      {children}
    </DemoDataContext.Provider>
  );
};

export const useDemoData = () => {
  const context = useContext(DemoDataContext);
  if (!context) {
    throw new Error("useDemoData must be used within a DemoDataProvider");
  }
  return context;
};
