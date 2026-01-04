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
  "view_all": { en: "View All", ar: "عرض الكل" },
  "submit": { en: "Submit", ar: "إرسال" },
  "close": { en: "Close", ar: "إغلاق" },
  "loading": { en: "Loading...", ar: "جاري التحميل..." },
  
  // Navigation
  "home": { en: "Home", ar: "الرئيسية" },
  "about": { en: "About", ar: "من نحن" },
  "programs": { en: "Programs", ar: "البرامج" },
  "contact": { en: "Contact", ar: "اتصل بنا" },
  "student_login": { en: "Student Login", ar: "دخول الطالب" },
  "staff_login": { en: "Staff Login", ar: "دخول الموظفين" },
  "student_portal": { en: "Student Portal", ar: "بوابة الطالب" },
  "teacher_portal": { en: "Teacher Portal", ar: "بوابة المعلم" },
  "admin_portal": { en: "Admin Portal", ar: "بوابة المدير" },
  "super_admin": { en: "Super Admin", ar: "المدير العام" },
  
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
  "day": { en: "Day", ar: "اليوم" },
  
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
  "push_announcement": { en: "Push Announcement", ar: "نشر الإعلان" },
  "announcement_title": { en: "Announcement Title", ar: "عنوان الإعلان" },
  "announcement_content": { en: "Announcement Content", ar: "محتوى الإعلان" },
  "target_audience": { en: "Target Audience", ar: "الجمهور المستهدف" },
  "all_users": { en: "All Users", ar: "جميع المستخدمين" },
  "students_only": { en: "Students Only", ar: "الطلاب فقط" },
  "teachers_only": { en: "Teachers Only", ar: "المعلمون فقط" },
  "latest_announcements": { en: "Latest Announcements", ar: "آخر الإعلانات" },
  
  // Reports
  "reports": { en: "Reports", ar: "التقارير" },
  "financial_reports": { en: "Financial Reports", ar: "التقارير المالية" },
  "academic_reports": { en: "Academic Reports", ar: "التقارير الأكاديمية" },

  // Landing Page
  "excellence_in_education": { en: "Excellence in Education", ar: "التميز في التعليم" },
  "welcome_to": { en: "Welcome to", ar: "مرحباً بكم في" },
  "school": { en: "School", ar: "المدرسة" },
  "hero_description": { en: "Nurturing minds, building futures. We provide world-class education rooted in Islamic values and modern academic excellence.", ar: "رعاية العقول، بناء المستقبل. نقدم تعليماً عالمي المستوى متجذراً في القيم الإسلامية والتميز الأكاديمي الحديث." },
  "why_choose_us": { en: "Why Choose Daru Ulum?", ar: "لماذا تختار دار العلوم؟" },
  "why_choose_description": { en: "We combine traditional Islamic values with modern education to prepare students for success in this world and the hereafter.", ar: "نحن نجمع بين القيم الإسلامية التقليدية والتعليم الحديث لإعداد الطلاب للنجاح في الدنيا والآخرة." },
  "access_your_portal": { en: "Access Your Portal", ar: "الدخول إلى بوابتك" },
  "portal_description": { en: "Login to your personalized dashboard for grades, assignments, and more.", ar: "تسجيل الدخول إلى لوحتك الشخصية للدرجات والواجبات والمزيد." },
  "ready_to_join": { en: "Ready to Join Daru Ulum?", ar: "هل أنت مستعد للانضمام إلى دار العلوم؟" },
  "cta_description": { en: "Enroll your child today and give them the gift of quality education combined with strong moral values.", ar: "سجل طفلك اليوم وامنحه هدية التعليم الجيد مع القيم الأخلاقية القوية." },
  "apply_now": { en: "Apply Now", ar: "قدم الآن" },
  "contact_us": { en: "Contact Us", ar: "اتصل بنا" },
  
  // Features
  "quality_education": { en: "Quality Education", ar: "تعليم عالي الجودة" },
  "quality_education_desc": { en: "World-class curriculum combining Islamic studies with modern academics", ar: "منهج عالمي يجمع بين الدراسات الإسلامية والأكاديميات الحديثة" },
  "expert_teachers": { en: "Expert Teachers", ar: "معلمون خبراء" },
  "expert_teachers_desc": { en: "Dedicated and qualified educators committed to student success", ar: "معلمون مؤهلون ومتفانون ملتزمون بنجاح الطلاب" },
  "digital_learning": { en: "Digital Learning", ar: "التعلم الرقمي" },
  "digital_learning_desc": { en: "State-of-the-art facilities with integrated technology", ar: "مرافق متطورة مع تكنولوجيا متكاملة" },
  "excellence": { en: "Excellence", ar: "التميز" },
  "excellence_desc": { en: "Proven track record of outstanding academic achievements", ar: "سجل حافل بالإنجازات الأكاديمية المتميزة" },
  
  // Stats
  "students_stat": { en: "Students", ar: "طالب" },
  "teachers_stat": { en: "Teachers", ar: "معلم" },
  "years": { en: "Years", ar: "سنة" },
  "success_rate": { en: "Success Rate", ar: "نسبة النجاح" },
  
  // Portal Cards
  "check_results": { en: "Check results, attendance & more", ar: "تحقق من النتائج والحضور والمزيد" },
  "manage_classes": { en: "Manage classes & upload results", ar: "إدارة الفصول ورفع النتائج" },
  "manage_staff": { en: "Manage staff & operations", ar: "إدارة الموظفين والعمليات" },
  "full_system_control": { en: "Full system control", ar: "التحكم الكامل في النظام" },
  "login": { en: "Login", ar: "تسجيل الدخول" },
  
  // About Page
  "about_hero_title": { en: "About Daru Ulum Isalekoto", ar: "عن دار العلوم إسالكوتو" },
  "about_hero_description": { en: "A leading Islamic educational institution in Ilorin, Kwara State, Nigeria, dedicated to providing comprehensive Islamic and secular education that nurtures the intellectual, spiritual, and moral potential of our students.", ar: "مؤسسة تعليمية إسلامية رائدة في إيلورين، ولاية كوارا، نيجيريا، مكرسة لتوفير تعليم إسلامي وعلماني شامل يرعى الإمكانات الفكرية والروحية والأخلاقية لطلابنا." },
  "since": { en: "Since", ar: "منذ" },
  "our_mission": { en: "Our Mission", ar: "مهمتنا" },
  "mission_description": { en: "To provide quality Islamic and Western education that develops students into well-rounded individuals who are academically excellent, morally upright, and spiritually grounded, prepared to contribute positively to society while maintaining their Islamic values.", ar: "توفير تعليم إسلامي وغربي عالي الجودة يطور الطلاب ليصبحوا أفراداً متكاملين متفوقين أكاديمياً، مستقيمين أخلاقياً، وراسخين روحياً، مستعدين للمساهمة إيجابياً في المجتمع مع الحفاظ على قيمهم الإسلامية." },
  "our_vision": { en: "Our Vision", ar: "رؤيتنا" },
  "vision_description": { en: "To be the leading Islamic educational institution in Nigeria, recognized for producing graduates who excel in both religious knowledge and secular academics, becoming leaders and positive change-makers in their communities and beyond.", ar: "أن نكون المؤسسة التعليمية الإسلامية الرائدة في نيجيريا، معترف بها لإنتاج خريجين يتفوقون في المعرفة الدينية والأكاديمية العلمانية، ليصبحوا قادة وصناع تغيير إيجابي في مجتمعاتهم وخارجها." },
  "our_core_values": { en: "Our Core Values", ar: "قيمنا الأساسية" },
  "values_description": { en: "The principles that guide everything we do at Daru Ulum Isalekoto", ar: "المبادئ التي توجه كل ما نقوم به في دار العلوم إسالكوتو" },
  "islamic_excellence": { en: "Islamic Excellence", ar: "التميز الإسلامي" },
  "islamic_excellence_desc": { en: "Combining Quranic education with modern academic curriculum", ar: "الجمع بين التعليم القرآني والمناهج الأكاديمية الحديثة" },
  "character_building": { en: "Character Building", ar: "بناء الشخصية" },
  "character_building_desc": { en: "Nurturing morally upright and responsible citizens", ar: "رعاية مواطنين مستقيمين أخلاقياً ومسؤولين" },
  "academic_rigor": { en: "Academic Rigor", ar: "الصرامة الأكاديمية" },
  "academic_rigor_desc": { en: "Maintaining high standards in both Islamic and Western education", ar: "الحفاظ على معايير عالية في كل من التعليم الإسلامي والغربي" },
  "holistic_development": { en: "Holistic Development", ar: "التطوير الشامل" },
  "holistic_development_desc": { en: "Fostering intellectual, spiritual, and physical growth", ar: "تعزيز النمو الفكري والروحي والجسدي" },
  "our_journey": { en: "Our Journey", ar: "رحلتنا" },
  "journey_description": { en: "Key milestones in the history of Daru Ulum Isalekoto", ar: "المعالم الرئيسية في تاريخ دار العلوم إسالكوتو" },
  "school_founded": { en: "School Founded", ar: "تأسيس المدرسة" },
  "school_founded_desc": { en: "Daru Ulum Isalekoto was established in Ilorin, Kwara State", ar: "تأسست دار العلوم إسالكوتو في إيلورين، ولاية كوارا" },
  "secondary_added": { en: "Secondary Section Added", ar: "إضافة القسم الثانوي" },
  "secondary_added_desc": { en: "Expanded to include junior and senior secondary education", ar: "توسعت لتشمل التعليم الثانوي الإعدادي والثانوي" },
  "modern_facilities": { en: "Modern Facilities", ar: "مرافق حديثة" },
  "modern_facilities_desc": { en: "New computer lab and science laboratories built", ar: "بناء معمل كمبيوتر جديد ومختبرات علمية" },
  "accreditation": { en: "Accreditation", ar: "الاعتماد" },
  "accreditation_desc": { en: "Received full accreditation from Ministry of Education", ar: "حصلت على الاعتماد الكامل من وزارة التربية والتعليم" },
  "digital_transformation": { en: "Digital Transformation", ar: "التحول الرقمي" },
  "digital_transformation_desc": { en: "Launched modern school management system", ar: "إطلاق نظام إدارة المدرسة الحديث" },
  "years_of_excellence": { en: "Years of Excellence", ar: "سنوات من التميز" },
  "alumni_network": { en: "Alumni Network", ar: "شبكة الخريجين" },
  "qualified_teachers": { en: "Qualified Teachers", ar: "معلمون مؤهلون" },
  "graduation_rate": { en: "Graduation Rate", ar: "نسبة التخرج" },
  "school_leadership": { en: "School Leadership", ar: "قيادة المدرسة" },
  "leadership_description": { en: "Dedicated leaders guiding our institution towards excellence", ar: "قادة متفانون يقودون مؤسستنا نحو التميز" },
  "principal": { en: "Principal / Chief Imam", ar: "المدير / الإمام الأكبر" },
  "vp_academics": { en: "Vice Principal (Academics)", ar: "نائب المدير (الأكاديمي)" },
  "vp_admin": { en: "Vice Principal (Admin)", ar: "نائب المدير (الإداري)" },
  
  // Programs Page
  "academic_programs": { en: "Academic Programs", ar: "البرامج الأكاديمية" },
  "programs_description": { en: "Discover our comprehensive range of educational programs designed to nurture both academic excellence and spiritual growth.", ar: "اكتشف مجموعتنا الشاملة من البرامج التعليمية المصممة لتعزيز التميز الأكاديمي والنمو الروحي." },
  "primary_education": { en: "Primary Education", ar: "التعليم الابتدائي" },
  "junior_secondary": { en: "Junior Secondary (JSS)", ar: "الإعدادية" },
  "senior_secondary": { en: "Senior Secondary (SSS)", ar: "الثانوية" },
  "islamic_studies": { en: "Islamic Studies", ar: "الدراسات الإسلامية" },
  "extracurricular": { en: "Extracurricular Activities", ar: "الأنشطة اللامنهجية" },
  "enroll_now": { en: "Enroll Now", ar: "سجل الآن" },
  
  // Contact Page
  "get_in_touch": { en: "Get in Touch", ar: "تواصل معنا" },
  "contact_description": { en: "Have questions? We'd love to hear from you. Reach out to us through any of the following channels.", ar: "لديك أسئلة؟ يسعدنا سماع رأيك. تواصل معنا من خلال أي من القنوات التالية." },
  "our_address": { en: "Our Address", ar: "عنواننا" },
  "phone_number": { en: "Phone Number", ar: "رقم الهاتف" },
  "email_address": { en: "Email Address", ar: "البريد الإلكتروني" },
  "office_hours": { en: "Office Hours", ar: "ساعات العمل" },
  "send_message": { en: "Send us a Message", ar: "أرسل لنا رسالة" },
  "your_name": { en: "Your Name", ar: "اسمك" },
  "your_email": { en: "Your Email", ar: "بريدك الإلكتروني" },
  "your_phone": { en: "Your Phone", ar: "هاتفك" },
  "select_subject": { en: "Select Subject", ar: "اختر الموضوع" },
  "general_inquiry": { en: "General Inquiry", ar: "استفسار عام" },
  "admissions": { en: "Admissions", ar: "القبول" },
  "feedback": { en: "Feedback", ar: "ملاحظات" },
  "other": { en: "Other", ar: "أخرى" },
  "your_message": { en: "Your Message", ar: "رسالتك" },
  "quick_contacts": { en: "Quick Contacts", ar: "جهات الاتصال السريعة" },
  "visit_campus": { en: "Visit Our Campus", ar: "زيارة حرمنا" },
  "book_tour": { en: "Book a Tour", ar: "احجز جولة" },
  
  // Footer
  "quick_links": { en: "Quick Links", ar: "روابط سريعة" },
  "portals": { en: "Portals", ar: "البوابات" },
  "news_events": { en: "News & Events", ar: "الأخبار والفعاليات" },
  "all_rights_reserved": { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },
  "footer_description": { en: "Nurturing minds, building futures. Excellence in education with Islamic values and modern standards.", ar: "رعاية العقول، بناء المستقبل. التميز في التعليم مع القيم الإسلامية والمعايير الحديثة." },

  // Announcements Categories
  "admissions_cat": { en: "Admissions", ar: "القبول" },
  "events": { en: "Events", ar: "الفعاليات" },
  "notice": { en: "Notice", ar: "إشعار" },
  "academic": { en: "Academic", ar: "أكاديمي" },
  "urgent": { en: "Urgent", ar: "عاجل" },
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
