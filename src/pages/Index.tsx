import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Trophy, 
  ArrowRight, 
  Star,
  Calendar,
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  BookMarked,
  Lightbulb,
  Target,
  Award,
  Heart,
  Globe,
  Shield,
  Clock
} from "lucide-react";
import heroImage from "@/assets/hero-school-new.jpg";
import studentsQuranImage from "@/assets/students-group.jpg";
import studentsImage from "@/assets/students-quran.jpg";
import logoImage from "@/assets/logo.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDemoData } from "@/contexts/DemoDataContext";

const Index = () => {
  const { t, language, direction } = useLanguage();
  const { getActiveAnnouncements } = useDemoData();
  
  const announcements = getActiveAnnouncements().slice(0, 3);

  const features = [
    {
      icon: BookMarked,
      titleKey: "quality_education",
      descKey: "quality_education_desc",
      color: "bg-primary"
    },
    {
      icon: Users,
      titleKey: "expert_teachers",
      descKey: "expert_teachers_desc",
      color: "bg-success"
    },
    {
      icon: Lightbulb,
      titleKey: "digital_learning",
      descKey: "digital_learning_desc",
      color: "bg-warning"
    },
    {
      icon: Target,
      titleKey: "excellence",
      descKey: "excellence_desc",
      color: "bg-accent"
    }
  ];

  const programs = [
    {
      titleKey: "tamhidi",
      descKey: "primary_education_desc",
      icon: BookOpen,
      color: "from-primary/20 to-primary/5"
    },
    {
      titleKey: "idadi",
      descKey: "junior_secondary_desc",
      icon: GraduationCap,
      color: "from-success/20 to-success/5"
    },
    {
      titleKey: "tawjihi",
      descKey: "senior_secondary_desc",
      icon: Trophy,
      color: "from-warning/20 to-warning/5"
    }
  ];

  const stats = [
    { value: "٢,٥٠٠+", labelKey: "students_stat", icon: Users },
    { value: "١٥٠+", labelKey: "teachers_stat", icon: GraduationCap },
    { value: "٢٥+", labelKey: "years", icon: Calendar },
    { value: "٩٨%", labelKey: "success_rate", icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: language === "ar" ? "التربية الإسلامية" : "Islamic Nurturing",
      desc: language === "ar" ? "نربي أبناءنا على القيم الإسلامية الأصيلة والأخلاق الحميدة" : "We nurture students with authentic Islamic values and noble character"
    },
    {
      icon: Globe,
      title: language === "ar" ? "التميز الأكاديمي" : "Academic Excellence",
      desc: language === "ar" ? "نسعى للتميز في العلوم الشرعية والعلوم الحديثة معاً" : "We strive for excellence in both Islamic and modern sciences"
    },
    {
      icon: Shield,
      title: language === "ar" ? "بيئة آمنة" : "Safe Environment",
      desc: language === "ar" ? "نوفر بيئة تعليمية آمنة ومحفزة لجميع الطلاب" : "We provide a safe and stimulating learning environment for all students"
    },
    {
      icon: Clock,
      title: language === "ar" ? "تراث عريق" : "Rich Heritage",
      desc: language === "ar" ? "أكثر من ستين عاماً من الخبرة في التعليم الإسلامي" : "Over sixty years of experience in Islamic education"
    }
  ];

  const categoryTranslations: Record<string, string> = {
    admissions: t("admissions_cat"),
    events: t("events"),
    notice: t("notice"),
    academic: t("academic"),
    urgent: t("urgent")
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center overflow-hidden" dir={direction}>
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={t("school_name")} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70" />
          <div className="absolute inset-0 opacity-[0.07]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M40 10L50 30H30L40 10zM40 70L30 50h20L40 70zM10 40l20-10v20L10 40zm60 0L50 50V30l20 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 py-16 md:py-20">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="flex justify-center mb-6 md:mb-8">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-2xl p-3 md:p-4 shadow-2xl animate-fade-in">
                <img src={logoImage} alt={t("school_name")} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight animate-slide-up">
              {t("school_name")}
            </h1>
            
            <p className="text-lg md:text-2xl text-primary-foreground/90 mb-3 md:mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {language === "ar" ? "جبهة العلماء والأئمة - إسالكوتو، إيلورين" : "Jabhatil Ulanahi wal Ahimma - Isalekoto, Ilorin"}
            </p>
            
            <p className="text-base md:text-xl text-primary-foreground/80 mb-8 md:mb-10 max-w-2xl mx-auto animate-slide-up px-4" style={{ animationDelay: "0.2s" }}>
              {t("hero_description")}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 animate-slide-up px-4" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl font-semibold"
                asChild
              >
                <Link to="/student-login">
                  {t("student_portal")} <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button 
                size="xl" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 bg-transparent"
                asChild
              >
                <Link to="/staff-login">
                  {t("staff_login")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar - NOT overlapping hero */}
      <section className="bg-foreground/95 backdrop-blur-sm" dir={direction}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/20 rtl:divide-x-reverse">
            {stats.map((stat, index) => (
              <div key={index} className="py-5 md:py-6 px-3 md:px-4 text-center">
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary hidden md:block" />
                  <div>
                    <div className="text-xl md:text-3xl font-bold text-background">{stat.value}</div>
                    <div className="text-background/70 text-xs md:text-sm">{t(stat.labelKey)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-20 bg-background" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t("about")}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {language === "ar" ? "عن دار العلوم إسالكوتو" : "About Daru Ulum Isalekoto"}
              </h2>
              
              <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
                {language === "ar" 
                  ? "تأسست مدرسة دار العلوم إسالكوتو تحت مظلة جبهة العلماء والأئمة في إيلورين، ولاية كوارا، نيجيريا، بمبادرة من الأمير التاسع لإيلورين، ألحاج زُلْقَرْنَيْن قَمْبَرِي، بمساعدة العالم الكبير الشيخ آدم عبد الله الإلوري. نحن مؤسسة تعليمية إسلامية رائدة مكرسة لتوفير تعليم شامل يجمع بين الدراسات الإسلامية والعلوم الحديثة."
                  : "Daru Ulum Isalekoto was established under the umbrella of Jabhatil Ulanahi wal Ahimma in Isalekoto, Ilorin, Kwara State, Nigeria. It was founded through the initiative of the 9th Emir of Ilorin, Alhaji Zulkarnayni Gambari, with the support of the renowned scholar Sheikh Adam Abdullah Al-Ilory. We are a leading Islamic educational institution dedicated to providing comprehensive education combining Islamic studies with modern academics."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground text-sm md:text-base">{t("islamic_education")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5 text-success" />
                  </div>
                  <span className="font-medium text-foreground text-sm md:text-base">{t("western_education")}</span>
                </div>
              </div>
              
              <Button asChild size="lg">
                <Link to="/about">
                  {language === "ar" ? "اقرأ المزيد" : "Learn More"} <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src={studentsQuranImage} 
                  alt={t("school_name")} 
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-primary text-primary-foreground p-4 md:p-6 rounded-xl shadow-xl">
                  <div className="text-3xl md:text-4xl font-bold">٦٠+</div>
                  <div className="text-xs md:text-sm">{language === "ar" ? "سنة من التميز" : "Years of Excellence"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 md:py-20 bg-primary/5" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === "ar" ? "قيمنا ورسالتنا" : "Our Values & Mission"}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {language === "ar"
                ? "نسعى لبناء جيل متميز يجمع بين العلم الشرعي والعلوم العصرية"
                : "We strive to build an outstanding generation combining Islamic and modern knowledge"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, index) => (
              <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card text-center">
                <CardContent className="p-6 md:p-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
                    <val.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-3">{val.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-16 md:py-20 bg-muted/50" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("academic_programs")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {language === "ar" 
                ? "المراحل الدراسية المتاحة في دار العلوم إسالكوتو"
                : "Academic levels available at Daru Ulum Isalekoto"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {programs.map((program, index) => (
              <Card key={index} className={`border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${program.color} overflow-hidden`}>
                <CardContent className="p-6 md:p-8">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-5 md:mb-6">
                    <program.icon className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{t(program.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{t(program.descKey)}</p>
                  <Button variant="link" className="px-0 mt-4" asChild>
                    <Link to="/programs">
                      {language === "ar" ? "اعرف المزيد" : "Learn More"} <ChevronRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* School Life Image Section */}
      <section className="py-16 md:py-20 bg-background" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12 items-center">
            <div>
              <img 
                src={studentsImage} 
                alt={language === "ar" ? "طلاب دار العلوم" : "Daru Ulum Students"} 
                className="rounded-2xl shadow-2xl w-full"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {language === "ar" ? "الحياة الدراسية" : "School Life"}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-6 leading-relaxed">
                {language === "ar"
                  ? "في دار العلوم إسالكوتو، نؤمن بأن التعليم يتجاوز الفصول الدراسية. نوفر بيئة غنية تدعم النمو الروحي والفكري والاجتماعي لكل طالب. من حلقات تحفيظ القرآن الكريم إلى الأنشطة الرياضية والثقافية، نسعى لتنمية شخصية الطالب من جميع الجوانب."
                  : "At Daru Ulum Isalekoto, we believe education goes beyond classrooms. We provide a rich environment that supports the spiritual, intellectual, and social growth of every student. From Quran memorization circles to sports and cultural activities, we strive to develop students holistically."}
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <BookMarked className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{language === "ar" ? "حفظ القرآن الكريم" : "Quran Memorization"}</h4>
                    <p className="text-sm text-muted-foreground">{language === "ar" ? "برنامج متكامل لحفظ وتجويد القرآن الكريم" : "Comprehensive program for Quran memorization and tajweed"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Star className="w-4 h-4 text-success" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{language === "ar" ? "العلوم الشرعية" : "Islamic Sciences"}</h4>
                    <p className="text-sm text-muted-foreground">{language === "ar" ? "دراسة الفقه والحديث والسيرة النبوية" : "Study of Fiqh, Hadith, and the Prophet's biography"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4 text-warning" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{language === "ar" ? "العلوم الحديثة" : "Modern Sciences"}</h4>
                    <p className="text-sm text-muted-foreground">{language === "ar" ? "الرياضيات والعلوم واللغة الإنجليزية" : "Mathematics, Sciences, and English Language"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-muted/30" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("why_choose_us")}
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              {t("why_choose_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-card">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-5 md:mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("access_your_portal")}
            </h2>
            <p className="text-primary-foreground/80 text-base md:text-lg">
              {t("portal_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            <Link to="/student-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <GraduationCap className="w-8 h-8 md:w-10 md:h-10 text-primary" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary-foreground mb-2">{t("student_portal")}</h3>
                  <p className="text-primary-foreground/70 text-xs md:text-sm mb-3 md:mb-4">{t("check_results")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <BookOpen className="w-8 h-8 md:w-10 md:h-10 text-success" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary-foreground mb-2">{t("teacher_portal")}</h3>
                  <p className="text-primary-foreground/70 text-xs md:text-sm mb-3 md:mb-4">{t("manage_classes")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-8 h-8 md:w-10 md:h-10 text-warning" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary-foreground mb-2">{t("admin_portal")}</h3>
                  <p className="text-primary-foreground/70 text-xs md:text-sm mb-3 md:mb-4">{t("manage_staff")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 md:p-8 text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Trophy className="w-8 h-8 md:w-10 md:h-10 text-destructive" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-primary-foreground mb-2">{t("super_admin")}</h3>
                  <p className="text-primary-foreground/70 text-xs md:text-sm mb-3 md:mb-4">{t("full_system_control")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-16 md:py-20 bg-background" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("latest_announcements")}
              </h2>
              <p className="text-muted-foreground text-base md:text-lg">
                {language === "ar" ? "ابق على اطلاع بآخر الأخبار والفعاليات" : "Stay updated with the latest news and events"}
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              {t("view_all")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-none bg-card">
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                    <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
                      item.category === "urgent" ? "bg-destructive/10 text-destructive" :
                      item.category === "events" ? "bg-success/10 text-success" :
                      "bg-primary/10 text-primary"
                    }`}>
                      {categoryTranslations[item.category] || item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {item.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 md:py-20 bg-foreground" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">{t("our_address")}</h3>
              <p className="text-background/70 text-sm md:text-base">
                {language === "ar" ? "إسالكوتو، إيلورين، ولاية كوارا، نيجيريا" : "Isalekoto, Ilorin, Kwara State, Nigeria"}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Phone className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">{t("phone_number")}</h3>
              <p className="text-background/70 text-sm md:text-base">+234 803 456 7890</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">{t("email_address")}</h3>
              <p className="text-background/70 text-sm md:text-base">info@daruulumisalekoto.edu.ng</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary to-primary/80" dir={direction}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("ready_to_join")}
          </h2>
          <p className="text-primary-foreground/80 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            {t("cta_description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Button size="xl" className="bg-white text-primary hover:bg-white/90 font-semibold" asChild>
              <Link to="/student-registration">
                {t("apply_now")} <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent" asChild>
              <Link to="/contact">
                {t("contact_us")}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;