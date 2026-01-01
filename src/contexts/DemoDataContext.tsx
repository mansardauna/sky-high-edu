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

interface DemoDataContextType {
  students: Student[];
  teachers: Teacher[];
  admins: Admin[];
  timetable: TimetableEntry[];
  subjects: Subject[];
  classes: ClassInfo[];
  results: Result[];
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
}

const DemoDataContext = createContext<DemoDataContextType | undefined>(undefined);

// Demo Data
const initialStudents: Student[] = [
  { id: "s1", surname: "Ibrahim", firstName: "Ahmad", dob: "2010-05-15", regNo: "DU/2024/001", class: "JSS 1A", status: "active", parentName: "Mr. Ibrahim", parentPhone: "08012345678", dateRegistered: "2024-01-15" },
  { id: "s2", surname: "Yusuf", firstName: "Fatima", dob: "2009-08-22", regNo: "DU/2024/002", class: "JSS 2B", status: "active", parentName: "Mrs. Yusuf", parentPhone: "08023456789", dateRegistered: "2024-01-16" },
  { id: "s3", surname: "Ali", firstName: "Muhammad", dob: "2008-03-10", regNo: "DU/2024/003", class: "SSS 1A", status: "suspended", parentName: "Mr. Ali", parentPhone: "08034567890", dateRegistered: "2024-01-17" },
  { id: "s4", surname: "Bello", firstName: "Aisha", dob: "2010-11-30", regNo: "DU/2024/004", class: "JSS 3A", status: "inactive", parentName: "Mr. Bello", parentPhone: "08045678901", dateRegistered: "2024-01-18" },
  { id: "s5", surname: "Suleiman", firstName: "Umar", dob: "2010-02-14", regNo: "DU/2024/005", class: "JSS 1A", status: "pending", parentName: "Mr. Suleiman", parentPhone: "08056789012", dateRegistered: "2024-12-28" },
  { id: "s6", surname: "Abdullahi", firstName: "Khadijah", dob: "2009-07-20", regNo: "DU/2024/006", class: "JSS 2A", status: "pending", parentName: "Mrs. Abdullahi", parentPhone: "08067890123", dateRegistered: "2024-12-29" },
];

const initialTeachers: Teacher[] = [
  { id: "t1", name: "Mr. Ahmed Ibrahim", email: "ahmed@daruulum.edu", password: "teacher123", subjects: ["Mathematics"], classes: ["JSS 1A", "JSS 2A"], status: "active" },
  { id: "t2", name: "Mrs. Fatima Yusuf", email: "fatima@daruulum.edu", password: "teacher123", subjects: ["English"], classes: ["JSS 1B", "JSS 2B"], status: "active" },
  { id: "t3", name: "Ustaz Ibrahim Musa", email: "ibrahim@daruulum.edu", password: "teacher123", subjects: ["Islamic Studies", "Arabic"], classes: ["JSS 3A"], status: "suspended" },
  { id: "t4", name: "Dr. Musa Aliyu", email: "musa@daruulum.edu", password: "teacher123", subjects: ["Science"], classes: ["SSS 1A", "SSS 2A"], status: "active" },
  { id: "t5", name: "Mrs. Zainab Abubakar", email: "zainab@daruulum.edu", password: "teacher123", subjects: ["Social Studies"], classes: ["JSS 1A", "JSS 1B"], status: "active" },
];

const initialAdmins: Admin[] = [
  { id: "a1", name: "Admin User", email: "admin@daruulum.edu", password: "admin123", role: "admin" },
  { id: "a2", name: "Super Admin", email: "superadmin@daruulum.edu", password: "super123", role: "super_admin" },
];

const initialSubjects: Subject[] = [
  { id: "sub1", name: "Mathematics", code: "MTH" },
  { id: "sub2", name: "English", code: "ENG" },
  { id: "sub3", name: "Islamic Studies", code: "ISL" },
  { id: "sub4", name: "Arabic", code: "ARB" },
  { id: "sub5", name: "Science", code: "SCI" },
  { id: "sub6", name: "Social Studies", code: "SST" },
  { id: "sub7", name: "Computer Science", code: "CSC" },
  { id: "sub8", name: "Physical Education", code: "PHE" },
];

const initialClasses: ClassInfo[] = [
  { id: "c1", name: "JSS 1A", section: "A", capacity: 40 },
  { id: "c2", name: "JSS 1B", section: "B", capacity: 40 },
  { id: "c3", name: "JSS 2A", section: "A", capacity: 38 },
  { id: "c4", name: "JSS 2B", section: "B", capacity: 35 },
  { id: "c5", name: "JSS 3A", section: "A", capacity: 42 },
  { id: "c6", name: "SSS 1A", section: "A", capacity: 36 },
  { id: "c7", name: "SSS 2A", section: "A", capacity: 34 },
  { id: "c8", name: "SSS 3A", section: "A", capacity: 30 },
];

const initialTimetable: TimetableEntry[] = [
  { id: "tt1", day: "Monday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Ahmed Ibrahim", class: "JSS 1A", room: "Room 101" },
  { id: "tt2", day: "Monday", time: "09:00 - 10:00", subject: "English", teacher: "Mrs. Fatima Yusuf", class: "JSS 1A", room: "Room 101" },
  { id: "tt3", day: "Monday", time: "10:30 - 11:30", subject: "Science", teacher: "Dr. Musa Aliyu", class: "JSS 1A", room: "Lab 1" },
  { id: "tt4", day: "Monday", time: "11:30 - 12:30", subject: "Islamic Studies", teacher: "Ustaz Ibrahim Musa", class: "JSS 1A", room: "Room 101" },
  { id: "tt5", day: "Tuesday", time: "08:00 - 09:00", subject: "Arabic", teacher: "Ustaz Ibrahim Musa", class: "JSS 1A", room: "Room 101" },
  { id: "tt6", day: "Tuesday", time: "09:00 - 10:00", subject: "Social Studies", teacher: "Mrs. Zainab Abubakar", class: "JSS 1A", room: "Room 101" },
  { id: "tt7", day: "Wednesday", time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Ahmed Ibrahim", class: "JSS 2A", room: "Room 102" },
  { id: "tt8", day: "Wednesday", time: "09:00 - 10:00", subject: "English", teacher: "Mrs. Fatima Yusuf", class: "JSS 2B", room: "Room 103" },
];

const initialResults: Result[] = [
  { studentId: "s1", subjectId: "sub1", ca1: 15, ca2: 18, exam: 55, term: "First", session: "2024/2025" },
  { studentId: "s1", subjectId: "sub2", ca1: 16, ca2: 17, exam: 48, term: "First", session: "2024/2025" },
  { studentId: "s1", subjectId: "sub3", ca1: 18, ca2: 19, exam: 58, term: "First", session: "2024/2025" },
  { studentId: "s2", subjectId: "sub1", ca1: 18, ca2: 20, exam: 60, term: "First", session: "2024/2025" },
  { studentId: "s2", subjectId: "sub2", ca1: 17, ca2: 18, exam: 52, term: "First", session: "2024/2025" },
];

export const DemoDataProvider = ({ children }: { children: ReactNode }) => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [admins] = useState<Admin[]>(initialAdmins);
  const [timetable, setTimetable] = useState<TimetableEntry[]>(initialTimetable);
  const [subjects] = useState<Subject[]>(initialSubjects);
  const [classes] = useState<ClassInfo[]>(initialClasses);
  const [results, setResults] = useState<Result[]>(initialResults);
  const [currentUser, setCurrentUser] = useState<(Student | Teacher | Admin) | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  // Auth functions
  const loginStudent = (surname: string, dob: string): Student | null => {
    const student = students.find(
      s => s.surname.toLowerCase() === surname.toLowerCase() && s.dob === dob && s.status === "active"
    );
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

  // Student functions
  const addStudent = (student: Omit<Student, "id" | "regNo" | "dateRegistered">): Student => {
    const newId = `s${students.length + 1}`;
    const regNo = `DU/2024/${String(students.length + 1).padStart(3, "0")}`;
    const newStudent: Student = {
      ...student,
      id: newId,
      regNo,
      dateRegistered: new Date().toISOString().split("T")[0],
    };
    setStudents(prev => [...prev, newStudent]);
    return newStudent;
  };

  const updateStudent = (id: string, updates: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  const approveStudent = (id: string) => {
    updateStudent(id, { status: "active" });
  };

  const suspendStudent = (id: string) => {
    updateStudent(id, { status: "suspended" });
  };

  const activateStudent = (id: string) => {
    updateStudent(id, { status: "active" });
  };

  // Teacher functions
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

  // Timetable functions
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

  // Result functions
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

  const getStudentResults = (studentId: string): Result[] => {
    return results.filter(r => r.studentId === studentId);
  };

  return (
    <DemoDataContext.Provider value={{
      students,
      teachers,
      admins,
      timetable,
      subjects,
      classes,
      results,
      currentUser,
      userRole,
      loginStudent,
      loginStaff,
      logout,
      addStudent,
      updateStudent,
      approveStudent,
      suspendStudent,
      activateStudent,
      addTeacher,
      updateTeacher,
      assignSubjectToTeacher,
      addTimetableEntry,
      updateTimetableEntry,
      deleteTimetableEntry,
      updateResult,
      getStudentResults,
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
