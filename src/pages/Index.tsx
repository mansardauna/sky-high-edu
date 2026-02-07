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
  Award
} from "lucide-react";
import heroImage from "@/assets/hero-school-new.jpg";
import studentsQuranImage from "@/assets/students-group.jpg";
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

  const categoryTranslations: Record<string, string> = {
    admissions: t("admissions_cat"),
    events: t("events"),
    notice: t("notice"),
    academic: t("academic"),
    urgent: t("urgent")
  };

  return (
    <Layout>
      {/* Hero Section - Reference Style */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden" dir={direction}>
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt={t("school_name")} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/70" />
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 bg-white rounded-2xl p-4 shadow-2xl animate-fade-in">
                <img src={logoImage} alt={t("school_name")} className="w-full h-full object-contain" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              {t("school_name")}
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-4 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              {language === "ar" ? "مدرسة إصلاح الدين العربية - أوباتيدو، إيوو" : "Islahudeen Arabic School - Obatedo, Iwo"}
            </p>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t("hero_description")}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <Button 
                size="xl" 
                className="bg-white text-primary hover:bg-white/90 shadow-xl"
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

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-foreground/95 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/20">
              {stats.map((stat, index) => (
                <div key={index} className="py-6 px-4 text-center">
                  <div className="flex items-center justify-center gap-3">
                    <stat.icon className="w-6 h-6 text-primary hidden md:block" />
                    <div>
                      <div className="text-2xl md:text-3xl font-bold text-background">{stat.value}</div>
                      <div className="text-background/70 text-sm">{t(stat.labelKey)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Star className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">{t("about")}</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                {language === "ar" ? "عن دار العلوم إسالكوتو" : "About Daru Ulum Isalekoto"}
              </h2>
              
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                {language === "ar" 
                  ? "تأسست مدرسة دار العلوم إسالكوتو (مدرسة إصلاح الدين العربية) في أوباتيدو، إيوو، ولاية أوسون، نيجيريا، على يد الشيخ الراحل عبد الباقي محمد في أوائل الستينيات. نحن مؤسسة تعليمية إسلامية رائدة مكرسة لتوفير تعليم شامل يجمع بين الدراسات الإسلامية والعلوم الحديثة."
                  : "Daru Ulum Isalekoto (Islahudeen Arabic School) was established in Obatedo, Iwo, Osun State, Nigeria, by the late Sheikh Abdulbaaqi Muhammad in the early 1960s. We are a leading Islamic educational institution dedicated to providing comprehensive education combining Islamic studies with modern academics."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">{t("islamic_education")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-success" />
                  </div>
                  <span className="font-medium text-foreground">{t("western_education")}</span>
                </div>
              </div>
              
              <Button asChild>
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
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-xl">
                  <div className="text-4xl font-bold">٦٠+</div>
                  <div className="text-sm">{language === "ar" ? "سنة من التميز" : "Years of Excellence"}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("academic_programs")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {language === "ar" 
                ? "المراحل الدراسية المتاحة في دار العلوم إسالكوتو"
                : "Academic levels available at Daru Ulum Isalekoto"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className={`border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br ${program.color} overflow-hidden`}>
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6">
                    <program.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">{t(program.titleKey)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{t(program.descKey)}</p>
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

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t("why_choose_us")}
            </h2>
            <p className="text-muted-foreground text-lg">
              {t("why_choose_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-card">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{t(feature.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm">{t(feature.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              {t("access_your_portal")}
            </h2>
            <p className="text-primary-foreground/80 text-lg">
              {t("portal_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/student-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <GraduationCap className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">{t("student_portal")}</h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">{t("check_results")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <BookOpen className="w-10 h-10 text-success" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">{t("teacher_portal")}</h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">{t("manage_classes")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-10 h-10 text-warning" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">{t("admin_portal")}</h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">{t("manage_staff")}</p>
                  <span className="inline-flex items-center gap-1 text-white font-medium text-sm">
                    {t("login")} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg">
                    <Trophy className="w-10 h-10 text-destructive" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-foreground mb-2">{t("super_admin")}</h3>
                  <p className="text-primary-foreground/70 text-sm mb-4">{t("full_system_control")}</p>
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t("latest_announcements")}
              </h2>
              <p className="text-muted-foreground text-lg">
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
                <CardContent className="p-6">
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
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">{t("our_address")}</h3>
              <p className="text-background/70">
                {language === "ar" ? "أوباتيدو، إيوو، ولاية أوسون، نيجيريا" : "Obatedo, Iwo, Osun State, Nigeria"}
              </p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">{t("phone_number")}</h3>
              <p className="text-background/70">+234 803 456 7890</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-background mb-2">{t("email_address")}</h3>
              <p className="text-background/70">info@daruulumisalekoto.edu.ng</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {t("ready_to_join")}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            {t("cta_description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="xl" className="bg-white text-primary hover:bg-white/90" asChild>
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
