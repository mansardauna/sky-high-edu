# Daru Ulum School Management System

A comprehensive, modern school management system built for **Daru Ulum Isalekoto**. This application provides a complete solution for managing students, teachers, administrators, and all aspects of school operations.

## 🌟 Features

### Multi-Role Dashboard System
- **Student Dashboard**: View grades, timetables, fee status, announcements, chat & forum
- **Teacher Dashboard**: Manage results, view schedules, salary management, withdrawal requests
- **Admin Dashboard**: Student registration approval, fee management, announcements, timetables
- **Super Admin Dashboard**: Complete control over staff, subjects, fee structures, salaries

### Key Functionalities

#### 📚 Academic Management
- Student registration with approval workflow
- Result entry system (CA1, CA2, Exam scores)
- Timetable management with sorting & filtering
- Subject assignment to teachers

#### 💰 Financial Management
- Level-specific fee structures (set by Super Admin)
- Student fee tracking and payment status
- Teacher salary management
- Withdrawal request system for teachers
- Comprehensive financial reporting for admins

#### 📢 Communication
- Centralized announcement system
- Real-time student chat
- Student forum for community interaction
- Announcements sync across landing page and dashboards

#### 🌐 Internationalization
- Full English and Arabic language support
- RTL (Right-to-Left) layout for Arabic
- Language switcher accessible from all pages

#### ⚙️ Settings & Customization
- Profile management
- Notification preferences
- Security settings
- Theme/appearance options (including dark mode)

## 🚀 Demo Credentials

### Student Login
- **Surname**: Abdullahi
- **Date of Birth**: 2010-05-15

### Staff Login

| Role | Email | Password |
|------|-------|----------|
| Teacher | teacher@daruulum.edu | teacher123 |
| Admin | admin@daruulum.edu | admin123 |
| Super Admin | superadmin@daruulum.edu | super123 |

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **State Management**: React Context API
- **Routing**: React Router v6
- **Data Fetching**: TanStack Query
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── components/
│   ├── modals/          # Modal components (AddStudent, FeePayment, etc.)
│   ├── ui/              # shadcn/ui components
│   ├── DataTable.tsx    # Reusable sortable/searchable table
│   ├── StudentChat.tsx  # Real-time chat component
│   ├── StudentForum.tsx # Forum component
│   └── ...
├── contexts/
│   ├── DemoDataContext.tsx   # Central state management
│   └── LanguageContext.tsx   # i18n management
├── pages/
│   ├── Index.tsx             # Landing page
│   ├── StudentDashboard.tsx  # Student portal
│   ├── TeacherDashboard.tsx  # Teacher portal
│   ├── AdminDashboard.tsx    # Admin portal
│   ├── SuperAdminDashboard.tsx # Super admin portal
│   └── ...
└── ...
```

## 🏫 About Daru Ulum Isalekoto

Daru Ulum Isalekoto is an educational institution offering:
- **Primary Education**: Foundation studies (Years 1-6)
- **Junior Secondary (JSS)**: Core academic subjects (Years 7-9)
- **Senior Secondary (SSS)**: Specialized streams (Years 10-12)
- **Islamic Studies**: Comprehensive Quranic education

## 📧 Contact

- **Address**: 123 Education Road, Isalekoto, Nigeria
- **Phone**: +234 XXX XXX XXXX
- **Email**: info@daruulum.edu

## 📝 License

This project is proprietary software developed for Daru Ulum Isalekoto.

---

Built with ❤️ using [Lovable](https://lovable.dev)
