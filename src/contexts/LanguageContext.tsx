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
  "inactive": { en: "Inactive", ar: "غير نشط" },
  "view_all": { en: "View All", ar: "عرض الكل" },
  "submit": { en: "Submit", ar: "إرسال" },
  "close": { en: "Close", ar: "إغلاق" },
  "loading": { en: "Loading...", ar: "جاري التحميل..." },
  "name": { en: "Name", ar: "الاسم" },
  "email": { en: "Email", ar: "البريد الإلكتروني" },
  "phone": { en: "Phone", ar: "الهاتف" },
  "password": { en: "Password", ar: "كلمة المرور" },
  "download": { en: "Download", ar: "تحميل" },
  "upload": { en: "Upload", ar: "رفع" },
  "back": { en: "Back", ar: "رجوع" },
  "next": { en: "Next", ar: "التالي" },
  "previous": { en: "Previous", ar: "السابق" },
  "yes": { en: "Yes", ar: "نعم" },
  "no": { en: "No", ar: "لا" },
  "all": { en: "All", ar: "الكل" },
  "none": { en: "None", ar: "لا شيء" },
  "select": { en: "Select", ar: "اختر" },
  "required": { en: "Required", ar: "مطلوب" },
  "optional": { en: "Optional", ar: "اختياري" },
  
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
  "back_to_home": { en: "Back to Home", ar: "العودة للرئيسية" },
  
  // Dashboard
  "welcome_back": { en: "Welcome back", ar: "مرحباً بعودتك" },
  "total_students": { en: "Total Students", ar: "إجمالي الطلاب" },
  "active_teachers": { en: "Active Teachers", ar: "المعلمون النشطون" },
  "pending_approvals": { en: "Pending Approvals", ar: "الموافقات المعلقة" },
  "active_classes": { en: "Active Classes", ar: "الفصول النشطة" },
  "quick_actions": { en: "Quick Actions", ar: "الإجراءات السريعة" },
  "overview": { en: "Overview", ar: "نظرة عامة" },
  "my_classes": { en: "My Classes", ar: "فصولي" },
  "no_classes": { en: "No classes scheduled", ar: "لا توجد فصول مجدولة" },
  "student_management": { en: "Student Management", ar: "إدارة الطلاب" },
  "teacher_management": { en: "Teacher Management", ar: "إدارة المعلمين" },
  "manage_students": { en: "Manage Students", ar: "إدارة الطلاب" },
  "manage_teachers": { en: "Manage Teachers", ar: "إدارة المعلمين" },
  "assign_subjects": { en: "Assign Subjects", ar: "تعيين المواد" },
  "manage_timetable": { en: "Manage Timetable", ar: "إدارة الجدول" },
  
  // Days
  "timetable": { en: "Timetable", ar: "الجدول الدراسي" },
  "monday": { en: "Monday", ar: "الإثنين" },
  "tuesday": { en: "Tuesday", ar: "الثلاثاء" },
  "wednesday": { en: "Wednesday", ar: "الأربعاء" },
  "thursday": { en: "Thursday", ar: "الخميس" },
  "friday": { en: "Friday", ar: "الجمعة" },
  "saturday": { en: "Saturday", ar: "السبت" },
  "sunday": { en: "Sunday", ar: "الأحد" },
  "time": { en: "Time", ar: "الوقت" },
  "subject": { en: "Subject", ar: "المادة" },
  "teacher": { en: "Teacher", ar: "المعلم" },
  "class": { en: "Class", ar: "الفصل" },
  "room": { en: "Room", ar: "القاعة" },
  "day": { en: "Day", ar: "اليوم" },
  "timetable_entries": { en: "Timetable Entries", ar: "إدخالات الجدول" },
  
  // Subjects
  "subjects": { en: "Subjects", ar: "المواد" },
  "mathematics": { en: "Mathematics", ar: "الرياضيات" },
  "english_subject": { en: "English", ar: "اللغة الإنجليزية" },
  "islamic_studies": { en: "Islamic Studies", ar: "الدراسات الإسلامية" },
  "arabic_subject": { en: "Arabic", ar: "اللغة العربية" },
  "science": { en: "Science", ar: "العلوم" },
  "social_studies": { en: "Social Studies", ar: "الدراسات الاجتماعية" },
  "computer_science": { en: "Computer Science", ar: "علوم الحاسوب" },
  "physical_education": { en: "Physical Education", ar: "التربية البدنية" },
  "physics": { en: "Physics", ar: "الفيزياء" },
  "chemistry": { en: "Chemistry", ar: "الكيمياء" },
  "biology": { en: "Biology", ar: "الأحياء" },
  "economics": { en: "Economics", ar: "الاقتصاد" },
  "government": { en: "Government", ar: "الحكومة" },
  "quranic_studies": { en: "Quranic Studies", ar: "الدراسات القرآنية" },
  "basic_science": { en: "Basic Science", ar: "العلوم الأساسية" },
  "basic_technology": { en: "Basic Technology", ar: "التكنولوجيا الأساسية" },
  
  // Teacher Names (transliteration)
  "mr_ahmed_ibrahim": { en: "Mr. Ahmed Ibrahim", ar: "الأستاذ أحمد إبراهيم" },
  "mrs_fatima_yusuf": { en: "Mrs. Fatima Yusuf", ar: "الأستاذة فاطمة يوسف" },
  "ustaz_ibrahim_musa": { en: "Ustaz Ibrahim Musa", ar: "الأستاذ إبراهيم موسى" },
  "dr_musa_aliyu": { en: "Dr. Musa Aliyu", ar: "الدكتور موسى عليو" },
  "mrs_zainab_abubakar": { en: "Mrs. Zainab Abubakar", ar: "الأستاذة زينب أبوبكر" },
  
  // Student Names
  "ahmad_ibrahim": { en: "Ahmad Ibrahim", ar: "أحمد إبراهيم" },
  "fatima_yusuf": { en: "Fatima Yusuf", ar: "فاطمة يوسف" },
  "muhammad_ali": { en: "Muhammad Ali", ar: "محمد علي" },
  "aisha_bello": { en: "Aisha Bello", ar: "عائشة بيلو" },
  "umar_suleiman": { en: "Umar Suleiman", ar: "عمر سليمان" },
  "khadijah_abdullahi": { en: "Khadijah Abdullahi", ar: "خديجة عبد الله" },
  
  // Fees
  "fees": { en: "Fees", ar: "الرسوم" },
  "fee_management": { en: "Fee Management", ar: "إدارة الرسوم" },
  "fee_structure": { en: "Fee Structure", ar: "هيكل الرسوم" },
  "payment_history": { en: "Payment History", ar: "سجل المدفوعات" },
  "total_fees": { en: "Total Fees", ar: "إجمالي الرسوم" },
  "amount_paid": { en: "Amount Paid", ar: "المبلغ المدفوع" },
  "balance": { en: "Balance", ar: "الرصيد المتبقي" },
  "make_payment": { en: "Make Payment", ar: "إجراء الدفع" },
  "record_payment": { en: "Record Payment", ar: "تسجيل الدفع" },
  "payment_method": { en: "Payment Method", ar: "طريقة الدفع" },
  "bank_transfer": { en: "Bank Transfer", ar: "تحويل بنكي" },
  "cash": { en: "Cash", ar: "نقداً" },
  "card": { en: "Card", ar: "بطاقة" },
  "pos": { en: "POS Payment", ar: "دفع نقطة البيع" },
  "online": { en: "Online Payment", ar: "دفع إلكتروني" },
  "tuition_fee": { en: "Tuition Fee", ar: "الرسوم الدراسية" },
  "development_levy": { en: "Development Levy", ar: "رسوم التطوير" },
  "book_fee": { en: "Book Fee", ar: "رسوم الكتب" },
  "examination_fee": { en: "Examination Fee", ar: "رسوم الامتحانات" },
  "laboratory_fee": { en: "Laboratory Fee", ar: "رسوم المختبر" },
  "sports_fee": { en: "Sports Fee", ar: "رسوم الرياضة" },
  "amount": { en: "Amount", ar: "المبلغ" },
  "paid": { en: "Paid", ar: "مدفوع" },
  "partial": { en: "Partial", ar: "جزئي" },
  "unpaid": { en: "Unpaid", ar: "غير مدفوع" },
  "payment_reference": { en: "Payment Reference", ar: "مرجع الدفع" },
  "amount_due": { en: "Amount Due", ar: "المبلغ المستحق" },
  "fee_type": { en: "Fee Type", ar: "نوع الرسوم" },
  
  // Results
  "results": { en: "Results", ar: "النتائج" },
  "term": { en: "Term", ar: "الفصل الدراسي" },
  "session": { en: "Session", ar: "العام الدراسي" },
  "grade": { en: "Grade", ar: "الدرجة" },
  "score": { en: "Score", ar: "النتيجة" },
  "average": { en: "Average", ar: "المتوسط" },
  "position": { en: "Position", ar: "الترتيب" },
  "first_term": { en: "First Term", ar: "الفصل الأول" },
  "second_term": { en: "Second Term", ar: "الفصل الثاني" },
  "third_term": { en: "Third Term", ar: "الفصل الثالث" },
  "ca1": { en: "CA1", ar: "التقييم 1" },
  "ca2": { en: "CA2", ar: "التقييم 2" },
  "exam": { en: "Exam", ar: "الامتحان" },
  "total": { en: "Total", ar: "المجموع" },
  "upload_results": { en: "Upload Results", ar: "رفع النتائج" },
  "download_report": { en: "Download Report", ar: "تحميل التقرير" },
  "view_results": { en: "View Results", ar: "عرض النتائج" },
  "detailed_results": { en: "Detailed Results", ar: "النتائج التفصيلية" },
  "results_breakdown": { en: "Results Breakdown", ar: "تفصيل النتائج" },
  "attendance": { en: "Attendance", ar: "الحضور" },
  
  // Salary
  "salary": { en: "Salary", ar: "الراتب" },
  "salary_structure": { en: "Salary Structure", ar: "هيكل الرواتب" },
  "basic_salary": { en: "Basic Salary", ar: "الراتب الأساسي" },
  "allowances": { en: "Allowances", ar: "البدلات" },
  "deductions": { en: "Deductions", ar: "الاستقطاعات" },
  "net_salary": { en: "Net Salary", ar: "صافي الراتب" },
  "withdraw": { en: "Withdraw", ar: "سحب" },
  "available_balance": { en: "Available Balance", ar: "الرصيد المتاح" },
  "request_withdrawal": { en: "Request Withdrawal", ar: "طلب سحب" },
  "withdrawal_amount": { en: "Withdrawal Amount", ar: "مبلغ السحب" },
  "account_number": { en: "Account Number", ar: "رقم الحساب" },
  "bank_name": { en: "Bank Name", ar: "اسم البنك" },
  "withdrawal_history": { en: "Withdrawal History", ar: "سجل السحوبات" },
  "approved": { en: "Approved", ar: "موافق عليه" },
  "rejected": { en: "Rejected", ar: "مرفوض" },
  "completed": { en: "Completed", ar: "مكتمل" },
  "processing": { en: "Processing", ar: "قيد المعالجة" },
  
  // Chat & Forum
  "chat": { en: "Chat", ar: "المحادثة" },
  "forum": { en: "Forum", ar: "المنتدى" },
  "messages": { en: "Messages", ar: "الرسائل" },
  "send": { en: "Send", ar: "إرسال" },
  "type_message": { en: "Type a message", ar: "اكتب رسالة" },
  "discussions": { en: "Discussions", ar: "المناقشات" },
  "new_topic": { en: "New Topic", ar: "موضوع جديد" },
  "replies": { en: "Replies", ar: "الردود" },
  "chat_rooms": { en: "Chat Rooms", ar: "غرف المحادثة" },
  "class_chat": { en: "Class Chat", ar: "محادثة الفصل" },
  "study_group": { en: "Study Group", ar: "مجموعة الدراسة" },
  "general_chat": { en: "General Chat", ar: "المحادثة العامة" },
  "no_discussions": { en: "No discussions found", ar: "لم يتم العثور على مناقشات" },
  "be_first_discussion": { en: "Be the first to start a discussion!", ar: "كن أول من يبدأ مناقشة!" },
  "create_discussion": { en: "Create Discussion", ar: "إنشاء مناقشة" },
  "discussion_title": { en: "Discussion Title", ar: "عنوان المناقشة" },
  "discussion_content": { en: "Content", ar: "المحتوى" },
  "category": { en: "Category", ar: "الفئة" },
  "general": { en: "General", ar: "عام" },
  "search_discussions": { en: "Search discussions...", ar: "البحث في المناقشات..." },
  "likes": { en: "Likes", ar: "إعجابات" },
  "just_now": { en: "Just now", ar: "الآن" },
  "hours_ago": { en: "hours ago", ar: "ساعات مضت" },
  "days_ago": { en: "days ago", ar: "أيام مضت" },
  
  // Settings
  "profile": { en: "Profile", ar: "الملف الشخصي" },
  "notifications": { en: "Notifications", ar: "الإشعارات" },
  "security": { en: "Security", ar: "الأمان" },
  "appearance": { en: "Appearance", ar: "المظهر" },
  "language": { en: "Language", ar: "اللغة" },
  "english_lang": { en: "English", ar: "الإنجليزية" },
  "arabic_lang": { en: "Arabic", ar: "العربية" },
  "dark_mode": { en: "Dark Mode", ar: "الوضع الداكن" },
  "email_notifications": { en: "Email Notifications", ar: "إشعارات البريد" },
  "sms_notifications": { en: "SMS Notifications", ar: "إشعارات الرسائل" },
  "announcement_alerts": { en: "Announcement Alerts", ar: "تنبيهات الإعلانات" },
  "result_notifications": { en: "Result Notifications", ar: "إشعارات النتائج" },
  "fee_reminders": { en: "Fee Reminders", ar: "تذكيرات الرسوم" },
  "current_password": { en: "Current Password", ar: "كلمة المرور الحالية" },
  "new_password": { en: "New Password", ar: "كلمة المرور الجديدة" },
  "confirm_password": { en: "Confirm Password", ar: "تأكيد كلمة المرور" },
  "change_password": { en: "Change Password", ar: "تغيير كلمة المرور" },
  "save_changes": { en: "Save Changes", ar: "حفظ التغييرات" },
  "profile_updated": { en: "Profile updated successfully", ar: "تم تحديث الملف الشخصي بنجاح" },
  "password_changed": { en: "Password changed successfully", ar: "تم تغيير كلمة المرور بنجاح" },
  "full_name": { en: "Full Name", ar: "الاسم الكامل" },
  
  // School
  "school_name": { en: "Daru Ulum Isalekoto", ar: "دار العلوم إسالكوتو" },
  "islamic_education": { en: "Islamic Education", ar: "التعليم الإسلامي" },
  "western_education": { en: "Western Education", ar: "التعليم الغربي" },
  "registration_number": { en: "Registration Number", ar: "رقم التسجيل" },
  "reg_no": { en: "Reg. No", ar: "رقم التسجيل" },
  "date_registered": { en: "Date Registered", ar: "تاريخ التسجيل" },
  
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
  "no_announcements": { en: "No announcements yet", ar: "لا توجد إعلانات بعد" },
  
  // Reports
  "reports": { en: "Reports", ar: "التقارير" },
  "financial_reports": { en: "Financial Reports", ar: "التقارير المالية" },
  "academic_reports": { en: "Academic Reports", ar: "التقارير الأكاديمية" },
  "generate_report": { en: "Generate Report", ar: "إنشاء تقرير" },
  
  // Assignments
  "assignments": { en: "Assignments", ar: "التعيينات" },
  "assign_subject": { en: "Assign Subject", ar: "تعيين مادة" },
  "assigned_classes": { en: "Assigned Classes", ar: "الفصول المعينة" },
  "no_subjects": { en: "No subjects assigned", ar: "لم يتم تعيين مواد" },
  
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
  "primary_education": { en: "Primary Education (Tamhidi)", ar: "التمهيدي" },
  "primary_education_desc": { en: "Foundation education combining Islamic values with core academic subjects.", ar: "التعليم الأساسي الذي يجمع بين القيم الإسلامية والمواد الأكاديمية الأساسية." },
  "junior_secondary": { en: "Intermediate (I'dadi)", ar: "الإعدادي" },
  "junior_secondary_desc": { en: "Comprehensive curriculum preparing students for senior secondary education.", ar: "منهج شامل يعد الطلاب للتعليم الثانوي." },
  "senior_secondary": { en: "Secondary (Tawjihi)", ar: "التوجيهي" },
  "senior_secondary_desc": { en: "Specialized tracks preparing students for higher education and professional careers.", ar: "مسارات متخصصة تعد الطلاب للتعليم العالي والمهن المهنية." },
  
  // Class levels
  "tamhidi": { en: "Tamhidi (Preparatory)", ar: "التمهيدي" },
  "tamhidi_1": { en: "Tamhidi 1", ar: "تمهيدي ١" },
  "tamhidi_2": { en: "Tamhidi 2", ar: "تمهيدي ٢" },
  "idadi": { en: "I'dadi (Intermediate)", ar: "الإعدادي" },
  "idadi_1": { en: "I'dadi 1", ar: "إعدادي ١" },
  "idadi_2": { en: "I'dadi 2", ar: "إعدادي ٢" },
  "idadi_3": { en: "I'dadi 3", ar: "إعدادي ٣" },
  "tawjihi": { en: "Tawjihi (Secondary)", ar: "التوجيهي" },
  "tawjihi_1": { en: "Tawjihi 1", ar: "توجيهي ١" },
  "tawjihi_2": { en: "Tawjihi 2", ar: "توجيهي ٢" },
  "tawjihi_3": { en: "Tawjihi 3", ar: "توجيهي ٣" },
  "islamic_studies_programs": { en: "Islamic Studies Programs", ar: "برامج الدراسات الإسلامية" },
  "extracurricular": { en: "Extracurricular Activities", ar: "الأنشطة اللامنهجية" },
  "extracurricular_desc": { en: "Beyond academics, we offer various activities for holistic development", ar: "بعيداً عن الأكاديميات، نقدم أنشطة متنوعة للتطوير الشامل" },
  "enroll_now": { en: "Enroll Now", ar: "سجل الآن" },
  "hifz_program": { en: "Hifz Program", ar: "برنامج الحفظ" },
  "hifz_program_desc": { en: "Complete Quran memorization program with tajweed certification", ar: "برنامج حفظ القرآن الكامل مع شهادة التجويد" },
  "arabic_language": { en: "Arabic Language", ar: "اللغة العربية" },
  "arabic_language_desc": { en: "Comprehensive Arabic language studies from beginner to advanced", ar: "دراسات اللغة العربية الشاملة من المبتدئ إلى المتقدم" },
  "islamic_jurisprudence": { en: "Islamic Jurisprudence", ar: "الفقه الإسلامي" },
  "islamic_jurisprudence_desc": { en: "Fiqh studies covering various schools of Islamic thought", ar: "دراسات الفقه التي تغطي مختلف المذاهب الإسلامية" },
  "hadith_studies": { en: "Hadith Studies", ar: "دراسات الحديث" },
  "hadith_studies_desc": { en: "Study of Prophetic traditions and their applications", ar: "دراسة الأحاديث النبوية وتطبيقاتها" },
  "core_subjects": { en: "Core Subjects", ar: "المواد الأساسية" },
  "key_features": { en: "Key Features", ar: "الميزات الرئيسية" },
  "duration": { en: "Duration", ar: "المدة" },
  "continuous": { en: "Continuous", ar: "مستمر" },
  "ages": { en: "Ages", ar: "الأعمار" },
  "academic_excellence": { en: "Academic Excellence", ar: "التميز الأكاديمي" },
  "debate_club": { en: "Debate Club", ar: "نادي المناظرة" },
  "science_club": { en: "Science Club", ar: "نادي العلوم" },
  "art_creativity": { en: "Art & Creativity", ar: "الفن والإبداع" },
  "sports": { en: "Sports", ar: "الرياضة" },
  "small_class_sizes": { en: "Small class sizes", ar: "أحجام فصول صغيرة" },
  "qualified_teachers_feature": { en: "Qualified teachers", ar: "معلمون مؤهلون" },
  "safe_environment": { en: "Safe learning environment", ar: "بيئة تعليمية آمنة" },
  "character_development": { en: "Character development", ar: "تطوير الشخصية" },
  "modern_laboratories": { en: "Modern laboratories", ar: "مختبرات حديثة" },
  "career_guidance": { en: "Career guidance", ar: "التوجيه المهني" },
  "exam_preparation": { en: "Exam preparation", ar: "التحضير للامتحانات" },
  "waec_neco_prep": { en: "WAEC/NECO preparation", ar: "التحضير لـ WAEC/NECO" },
  "university_counseling": { en: "University counseling", ar: "الإرشاد الجامعي" },
  "practical_sessions": { en: "Practical sessions", ar: "الحصص العملية" },
  "leadership_training": { en: "Leadership training", ar: "التدريب القيادي" },
  "take_first_step": { en: "Take the first step towards a quality Islamic and academic education for your child.", ar: "اتخذ الخطوة الأولى نحو تعليم إسلامي وأكاديمي عالي الجودة لطفلك." },
  
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
  "admissions_inquiry": { en: "Admissions Inquiry", ar: "استفسار القبول" },
  "feedback": { en: "Feedback", ar: "ملاحظات" },
  "other": { en: "Other", ar: "أخرى" },
  "your_message": { en: "Your Message", ar: "رسالتك" },
  "quick_contacts": { en: "Quick Contacts", ar: "جهات الاتصال السريعة" },
  "visit_campus": { en: "Visit Our Campus", ar: "زيارة حرمنا" },
  "book_tour": { en: "Book a Tour", ar: "احجز جولة" },
  "admissions_office": { en: "Admissions Office", ar: "مكتب القبول" },
  "academic_affairs": { en: "Academic Affairs", ar: "الشؤون الأكاديمية" },
  "finance_office": { en: "Finance Office", ar: "المكتب المالي" },
  "location": { en: "Location", ar: "الموقع" },
  
  // Footer
  "quick_links": { en: "Quick Links", ar: "روابط سريعة" },
  "portals": { en: "Portals", ar: "البوابات" },
  "news_events": { en: "News & Events", ar: "الأخبار والفعاليات" },
  "all_rights_reserved": { en: "All rights reserved", ar: "جميع الحقوق محفوظة" },
  "footer_description": { en: "Nurturing minds, building futures. Excellence in education with Islamic values and modern standards.", ar: "رعاية العقول، بناء المستقبل. التميز في التعليم مع القيم الإسلامية والمعايير الحديثة." },

  // Announcements Categories
  "admissions": { en: "Admissions", ar: "القبول" },
  "events": { en: "Events", ar: "الفعاليات" },
  "notice": { en: "Notice", ar: "إشعار" },
  "academic": { en: "Academic", ar: "أكاديمي" },
  "urgent": { en: "Urgent", ar: "عاجل" },
  
  // Login/Registration
  "staff_portal": { en: "Staff Portal", ar: "بوابة الموظفين" },
  "login_credentials": { en: "Login with your credentials", ar: "تسجيل الدخول ببياناتك" },
  "student_credentials": { en: "Login with your surname and date of birth", ar: "تسجيل الدخول بالاسم العائلي وتاريخ الميلاد" },
  "select_role": { en: "Select Role", ar: "اختر الدور" },
  "subject_teacher": { en: "Subject Teacher", ar: "معلم مادة" },
  "admin_staff": { en: "Admin Staff", ar: "موظف إداري" },
  "enter_email": { en: "Enter your email", ar: "أدخل بريدك الإلكتروني" },
  "enter_password": { en: "Enter your password", ar: "أدخل كلمة المرور" },
  "forgot_password": { en: "Forgot Password?", ar: "نسيت كلمة المرور؟" },
  "login_to_portal": { en: "Login to Portal", ar: "تسجيل الدخول للبوابة" },
  "logging_in": { en: "Logging in...", ar: "جاري تسجيل الدخول..." },
  "contact_support": { en: "Contact IT Support", ar: "اتصل بالدعم الفني" },
  "having_trouble": { en: "Having trouble logging in?", ar: "هل تواجه مشكلة في تسجيل الدخول؟" },
  "demo_login": { en: "Demo Login", ar: "بيانات تجريبية" },
  "surname": { en: "Surname", ar: "الاسم العائلي" },
  "enter_surname": { en: "Enter your surname", ar: "أدخل اسمك العائلي" },
  "date_of_birth": { en: "Date of Birth", ar: "تاريخ الميلاد" },
  "new_student": { en: "New student?", ar: "طالب جديد؟" },
  "register_here": { en: "Register Here", ar: "سجل هنا" },
  "already_registered": { en: "Already registered?", ar: "مسجل بالفعل؟" },
  "login_here": { en: "Login Here", ar: "سجل الدخول هنا" },
  
  // Registration
  "student_registration": { en: "Student Registration", ar: "تسجيل الطالب" },
  "register_admission": { en: "Register for admission to Daru Ulum School", ar: "سجل للالتحاق بمدرسة دار العلوم" },
  "personal_information": { en: "Personal Information", ar: "المعلومات الشخصية" },
  "academic_information": { en: "Academic Information", ar: "المعلومات الأكاديمية" },
  "parent_information": { en: "Parent/Guardian Information", ar: "معلومات ولي الأمر" },
  "first_name": { en: "First Name", ar: "الاسم الأول" },
  "middle_name": { en: "Middle Name", ar: "الاسم الأوسط" },
  "class_applying": { en: "Class Applying For", ar: "الفصل المتقدم له" },
  "parent_name": { en: "Parent/Guardian Name", ar: "اسم ولي الأمر" },
  "enter_parent_name": { en: "Enter parent/guardian name", ar: "أدخل اسم ولي الأمر" },
  "terms_agreement": { en: "By submitting this form, you agree to our terms and conditions. Your registration will be reviewed by the school admin and you will be notified once approved.", ar: "بإرسال هذا النموذج، فإنك توافق على الشروط والأحكام. سيتم مراجعة تسجيلك من قبل إدارة المدرسة وسيتم إخطارك بمجرد الموافقة." },
  "submit_registration": { en: "Submit Registration", ar: "إرسال التسجيل" },
  "submitting": { en: "Submitting...", ar: "جاري الإرسال..." },
  "registration_successful": { en: "Registration Successful!", ar: "تم التسجيل بنجاح!" },
  "registration_pending": { en: "Your registration has been submitted and is pending admin approval.", ar: "تم إرسال تسجيلك وهو قيد الموافقة." },
  "your_reg_number": { en: "Your Registration Number", ar: "رقم تسجيلك" },
  "important_notice": { en: "Save your registration number. You will need it along with your surname and date of birth to login once approved.", ar: "احفظ رقم تسجيلك. ستحتاجه مع اسمك العائلي وتاريخ ميلادك لتسجيل الدخول بعد الموافقة." },
  "go_to_login": { en: "Go to Login Page", ar: "الذهاب لصفحة تسجيل الدخول" },
  
  // Actions & Confirmations
  "approve": { en: "Approve", ar: "موافقة" },
  "reject": { en: "Reject", ar: "رفض" },
  "activate": { en: "Activate", ar: "تفعيل" },
  "suspend": { en: "Suspend", ar: "تعليق" },
  "add_student": { en: "Add Student", ar: "إضافة طالب" },
  "add_teacher": { en: "Add Teacher", ar: "إضافة معلم" },
  "add_entry": { en: "Add Entry", ar: "إضافة إدخال" },
  "edit_entry": { en: "Edit Entry", ar: "تعديل إدخال" },
  "delete_entry": { en: "Delete Entry", ar: "حذف إدخال" },
  "are_you_sure": { en: "Are you sure?", ar: "هل أنت متأكد؟" },
  "action_cannot_undone": { en: "This action cannot be undone.", ar: "لا يمكن التراجع عن هذا الإجراء." },
  "student_approved": { en: "Student approved successfully!", ar: "تمت الموافقة على الطالب بنجاح!" },
  "student_rejected": { en: "Student registration rejected.", ar: "تم رفض تسجيل الطالب." },
  "teacher_added": { en: "Teacher added successfully!", ar: "تمت إضافة المعلم بنجاح!" },
  "subject_assigned": { en: "Subject assigned successfully!", ar: "تم تعيين المادة بنجاح!" },
  "entry_deleted": { en: "Entry deleted successfully!", ar: "تم حذف الإدخال بنجاح!" },
  "results_saved": { en: "Results saved successfully!", ar: "تم حفظ النتائج بنجاح!" },
  "payment_recorded": { en: "Payment recorded successfully!", ar: "تم تسجيل الدفع بنجاح!" },
  "withdrawal_submitted": { en: "Withdrawal request submitted!", ar: "تم إرسال طلب السحب!" },
  "please_fill_fields": { en: "Please fill in all fields", ar: "يرجى ملء جميع الحقول" },
  "please_fill_required": { en: "Please fill in all required fields", ar: "يرجى ملء جميع الحقول المطلوبة" },
  "invalid_credentials": { en: "Invalid credentials", ar: "بيانات غير صحيحة" },
  "select_class_option": { en: "Select class", ar: "اختر الفصل" },
  "select_subject_form": { en: "Select subject", ar: "اختر المادة" },
  "select_teacher": { en: "Select teacher", ar: "اختر المعلم" },
  "select_day": { en: "Select day", ar: "اختر اليوم" },
  "select_time": { en: "Select time", ar: "اختر الوقت" },
  "enter_room": { en: "Enter room number", ar: "أدخل رقم القاعة" },
  "students_waiting": { en: "Students waiting for registration approval", ar: "الطلاب في انتظار الموافقة على التسجيل" },
  "no_pending_approvals": { en: "No pending approvals", ar: "لا توجد موافقات معلقة" },
  "all_caught_up": { en: "All caught up! No pending registrations.", ar: "كل شيء على ما يرام! لا توجد تسجيلات معلقة." },
  "common_tasks": { en: "Common administrative tasks", ar: "المهام الإدارية الشائعة" },
  "whats_happening": { en: "Here's what's happening today.", ar: "هذا ما يحدث اليوم." },
  "complete_system_control": { en: "Complete control over the school management system", ar: "التحكم الكامل في نظام إدارة المدرسة" },
  "teaching_schedule": { en: "Your teaching schedule", ar: "جدولك التدريسي" },
  "view_manage_classes": { en: "View and manage your assigned classes", ar: "عرض وإدارة فصولك المعينة" },
  "enter_student_scores": { en: "Enter or update student scores for the selected class", ar: "أدخل أو حدث درجات الطلاب للفصل المحدد" },
  
  // Super Admin Dashboard
  "super_admin_dashboard": { en: "Super Admin Dashboard", ar: "لوحة تحكم المدير العام" },
  "total_subjects": { en: "Total Subjects", ar: "إجمالي المواد" },
  "activate_suspend_students": { en: "Activate, suspend, or deactivate student accounts", ar: "تفعيل أو تعليق أو إلغاء تفعيل حسابات الطلاب" },
  "add_edit_teachers": { en: "Add, edit, and manage teacher accounts", ar: "إضافة وتعديل وإدارة حسابات المعلمين" },
  "organize_by_day": { en: "School timetable organized by day", ar: "الجدول المدرسي منظم حسب اليوم" },
  
  // Modals
  "add_new_teacher": { en: "Add New Teacher", ar: "إضافة معلم جديد" },
  "add_teacher_desc": { en: "Add a new teacher to the school system", ar: "إضافة معلم جديد لنظام المدرسة" },
  "default_password": { en: "Default Password", ar: "كلمة المرور الافتراضية" },
  "password_change_note": { en: "Teacher can change this after first login", ar: "يمكن للمعلم تغييرها بعد تسجيل الدخول الأول" },
  "assign_subject_to": { en: "Assign a subject and classes to", ar: "تعيين مادة وفصول إلى" },
  "choose_subject": { en: "Choose a subject", ar: "اختر مادة" },
  "select_classes": { en: "Select Classes", ar: "اختر الفصول" },
  "add_new_student": { en: "Add New Student", ar: "إضافة طالب جديد" },
  "add_student_desc": { en: "Manually add a student to the system", ar: "إضافة طالب يدوياً للنظام" },
  "add_timetable_entry": { en: "Add Timetable Entry", ar: "إضافة إدخال للجدول" },
  "edit_timetable_entry": { en: "Edit Timetable Entry", ar: "تعديل إدخال الجدول" },
  "no_timetable_entries": { en: "No Timetable Entries", ar: "لا توجد إدخالات للجدول" },
  "start_adding_schedules": { en: "Start by adding class schedules.", ar: "ابدأ بإضافة جداول الفصول." },
  "no_classes_assigned": { en: "No classes assigned", ar: "لم يتم تعيين فصول" },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateSubject: (subject: string) => string;
  translateDay: (day: string) => string;
  translateName: (name: string) => string;
  translateStatus: (status: string) => string;
  translateFeeType: (feeType: string) => string;
  translateCategory: (category: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Subject translations mapping
const subjectMap: Record<string, string> = {
  "Mathematics": "mathematics",
  "English": "english",
  "English Language": "english",
  "Islamic Studies": "islamic_studies",
  "Arabic": "arabic",
  "Science": "science",
  "Social Studies": "social_studies",
  "Computer Science": "computer_science",
  "Physical Education": "physical_education",
  "Physics": "physics",
  "Chemistry": "chemistry",
  "Biology": "biology",
  "Economics": "economics",
  "Government": "government",
  "Quranic Studies": "quranic_studies",
  "Basic Science": "basic_science",
  "Basic Technology": "basic_technology",
};

// Day translations mapping
const dayMap: Record<string, string> = {
  "Monday": "monday",
  "Tuesday": "tuesday",
  "Wednesday": "wednesday",
  "Thursday": "thursday",
  "Friday": "friday",
  "Saturday": "saturday",
  "Sunday": "sunday",
};

// Name translations mapping
const nameMap: Record<string, string> = {
  "Mr. Ahmed Ibrahim": "mr_ahmed_ibrahim",
  "Mrs. Fatima Yusuf": "mrs_fatima_yusuf",
  "Ustaz Ibrahim Musa": "ustaz_ibrahim_musa",
  "Dr. Musa Aliyu": "dr_musa_aliyu",
  "Mrs. Zainab Abubakar": "mrs_zainab_abubakar",
  "Ahmad Ibrahim": "ahmad_ibrahim",
  "Fatima Yusuf": "fatima_yusuf",
  "Muhammad Ali": "muhammad_ali",
  "Aisha Bello": "aisha_bello",
  "Umar Suleiman": "umar_suleiman",
  "Khadijah Abdullahi": "khadijah_abdullahi",
};

// Status translations mapping
const statusMap: Record<string, string> = {
  "active": "active",
  "suspended": "suspended",
  "pending": "pending",
  "inactive": "inactive",
  "paid": "paid",
  "partial": "partial",
  "unpaid": "unpaid",
  "approved": "approved",
  "rejected": "rejected",
  "completed": "completed",
};

// Fee type translations mapping
const feeTypeMap: Record<string, string> = {
  "Tuition Fee": "tuition_fee",
  "Development Levy": "development_levy",
  "Book Fee": "book_fee",
  "Examination Fee": "examination_fee",
  "Laboratory Fee": "laboratory_fee",
  "Sports Fee": "sports_fee",
};

// Category translations mapping
const categoryMap: Record<string, string> = {
  "admissions": "admissions",
  "events": "events",
  "notice": "notice",
  "academic": "academic",
  "urgent": "urgent",
  "General": "general",
  "Mathematics": "mathematics",
  "Islamic Studies": "islamic_studies",
  "Arabic": "arabic",
  "Science": "science",
  "English": "english",
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("ar");
  
  // Set Arabic as default on mount
  React.useEffect(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  }, []);

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

  const translateSubject = (subject: string): string => {
    const key = subjectMap[subject];
    if (key && translations[key]) {
      return translations[key][language];
    }
    return subject;
  };

  const translateDay = (day: string): string => {
    const key = dayMap[day];
    if (key && translations[key]) {
      return translations[key][language];
    }
    return day;
  };

  const translateName = (name: string): string => {
    const key = nameMap[name];
    if (key && translations[key]) {
      return translations[key][language];
    }
    return name;
  };

  const translateStatus = (status: string): string => {
    const key = statusMap[status];
    if (key && translations[key]) {
      return translations[key][language];
    }
    return status;
  };

  const translateFeeType = (feeType: string): string => {
    const key = feeTypeMap[feeType];
    if (key && translations[key]) {
      return translations[key][language];
    }
    return feeType;
  };

  const translateCategory = (category: string): string => {
    const key = categoryMap[category];
    if (key && translations[key]) {
      return translations[key][language];
    }
    return category;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      direction, 
      setLanguage, 
      t, 
      translateSubject, 
      translateDay, 
      translateName, 
      translateStatus,
      translateFeeType,
      translateCategory
    }}>
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
