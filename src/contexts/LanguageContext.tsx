import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "ar";
type Direction = "ltr" | "rtl";

interface Translations {
  [key: string]: {
    en: string;
    ar: string;
  };
}

const translations: Translations = {
  // Common
  "dashboard": { en: "Dashboard", ar: "لوحة التحكم" },
  "students": { en: "Students", ar: "الطلاب" },
  "teachers": { en: "Teachers", ar: "المعلمون" },
  "settings": { en: "Settings", ar: "الإعدادات" },
  "logout": { en: "Logout", ar: "تسجيل الخروج" },
  "search": { en: "Search", ar: "بحث" },
  "save": { en: "Save", ar: "حفظ" },
  "cancel": { en: "Cancel", ar: "إلغاء" },
  "add": { en: "Add", ar: "إضافة" },
  "edit": { en: "Edit", ar: "تعديل" },
  "delete": { en: "Delete", ar: "حذف" },
  "confirm": { en: "Confirm", ar: "تأكيد" },
  "status": { en: "Status", ar: "الحالة" },
  "actions": { en: "Actions", ar: "الإجراءات" },
  "active": { en: "Active", ar: "نشط" },
  "suspended": { en: "Suspended", ar: "موقوف" },
  "pending": { en: "Pending", ar: "قيد الانتظار" },
  
  // Navigation
  "home": { en: "Home", ar: "الرئيسية" },
  "about": { en: "About", ar: "من نحن" },
  "programs": { en: "Programs", ar: "البرامج" },
  "contact": { en: "Contact", ar: "اتصل بنا" },
  "student_login": { en: "Student Login", ar: "دخول الطالب" },
  "staff_login": { en: "Staff Login", ar: "دخول الموظفين" },
  
  // Dashboard
  "welcome_back": { en: "Welcome back", ar: "مرحباً بعودتك" },
  "total_students": { en: "Total Students", ar: "إجمالي الطلاب" },
  "active_teachers": { en: "Active Teachers", ar: "المعلمون النشطون" },
  "pending_approvals": { en: "Pending Approvals", ar: "الموافقات المعلقة" },
  "active_classes": { en: "Active Classes", ar: "الفصول النشطة" },
  "quick_actions": { en: "Quick Actions", ar: "الإجراءات السريعة" },
  
  // Timetable
  "timetable": { en: "Timetable", ar: "الجدول الدراسي" },
  "monday": { en: "Monday", ar: "الإثنين" },
  "tuesday": { en: "Tuesday", ar: "الثلاثاء" },
  "wednesday": { en: "Wednesday", ar: "الأربعاء" },
  "thursday": { en: "Thursday", ar: "الخميس" },
  "friday": { en: "Friday", ar: "الجمعة" },
  "time": { en: "Time", ar: "الوقت" },
  "subject": { en: "Subject", ar: "المادة" },
  "teacher": { en: "Teacher", ar: "المعلم" },
  "class": { en: "Class", ar: "الفصل" },
  "room": { en: "Room", ar: "القاعة" },
  
  // Fees
  "fees": { en: "Fees", ar: "الرسوم" },
  "fee_management": { en: "Fee Management", ar: "إدارة الرسوم" },
  "fee_structure": { en: "Fee Structure", ar: "هيكل الرسوم" },
  "payment_history": { en: "Payment History", ar: "سجل المدفوعات" },
  "total_fees": { en: "Total Fees", ar: "إجمالي الرسوم" },
  "amount_paid": { en: "Amount Paid", ar: "المبلغ المدفوع" },
  "balance": { en: "Balance", ar: "الرصيد المتبقي" },
  "make_payment": { en: "Make Payment", ar: "إجراء الدفع" },
  "payment_method": { en: "Payment Method", ar: "طريقة الدفع" },
  "bank_transfer": { en: "Bank Transfer", ar: "تحويل بنكي" },
  "cash": { en: "Cash", ar: "نقداً" },
  "card": { en: "Card", ar: "بطاقة" },
  
  // Results
  "results": { en: "Results", ar: "النتائج" },
  "term": { en: "Term", ar: "الفصل الدراسي" },
  "session": { en: "Session", ar: "العام الدراسي" },
  "grade": { en: "Grade", ar: "الدرجة" },
  "score": { en: "Score", ar: "النتيجة" },
  "average": { en: "Average", ar: "المتوسط" },
  "position": { en: "Position", ar: "الترتيب" },
  
  // Salary
  "salary": { en: "Salary", ar: "الراتب" },
  "salary_structure": { en: "Salary Structure", ar: "هيكل الرواتب" },
  "basic_salary": { en: "Basic Salary", ar: "الراتب الأساسي" },
  "allowances": { en: "Allowances", ar: "البدلات" },
  "deductions": { en: "Deductions", ar: "الاستقطاعات" },
  "net_salary": { en: "Net Salary", ar: "صافي الراتب" },
  "withdraw": { en: "Withdraw", ar: "سحب" },
  "available_balance": { en: "Available Balance", ar: "الرصيد المتاح" },
  
  // Chat & Forum
  "chat": { en: "Chat", ar: "المحادثة" },
  "forum": { en: "Forum", ar: "المنتدى" },
  "messages": { en: "Messages", ar: "الرسائل" },
  "send": { en: "Send", ar: "إرسال" },
  "type_message": { en: "Type a message", ar: "اكتب رسالة" },
  "discussions": { en: "Discussions", ar: "المناقشات" },
  "new_topic": { en: "New Topic", ar: "موضوع جديد" },
  "replies": { en: "Replies", ar: "الردود" },
  
  // Settings
  "profile": { en: "Profile", ar: "الملف الشخصي" },
  "notifications": { en: "Notifications", ar: "الإشعارات" },
  "security": { en: "Security", ar: "الأمان" },
  "appearance": { en: "Appearance", ar: "المظهر" },
  "language": { en: "Language", ar: "اللغة" },
  "english": { en: "English", ar: "الإنجليزية" },
  "arabic": { en: "Arabic", ar: "العربية" },
  "dark_mode": { en: "Dark Mode", ar: "الوضع الداكن" },
  
  // School
  "school_name": { en: "Daru Ulum Isalekoto", ar: "دار العلوم إسالكوتو" },
  "islamic_education": { en: "Islamic Education", ar: "التعليم الإسلامي" },
  "western_education": { en: "Western Education", ar: "التعليم الغربي" },
  
  // Announcements
  "announcements": { en: "Announcements", ar: "الإعلانات" },
  "new_announcement": { en: "New Announcement", ar: "إعلان جديد" },
  
  // Reports
  "reports": { en: "Reports", ar: "التقارير" },
  "financial_reports": { en: "Financial Reports", ar: "التقارير المالية" },
  "academic_reports": { en: "Academic Reports", ar: "التقارير الأكاديمية" },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("en");

  const direction: Direction = language === "ar" ? "rtl" : "ltr";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) return key;
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
