import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Target, Heart, Star, Users, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import SEOHead from "@/components/SEOHead";
import studentsGroup from "@/assets/students-group.jpg";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
import logo from "@/assets/logo.png";

const About = () => {
  const { t, language, direction } = useLanguage();

  const values = [
    { icon: BookOpen, titleKey: "islamic_excellence", descKey: "islamic_excellence_desc" },
    { icon: Heart, titleKey: "character_building", descKey: "character_building_desc" },
    { icon: Target, titleKey: "academic_rigor", descKey: "academic_rigor_desc" },
    { icon: Star, titleKey: "holistic_development", descKey: "holistic_development_desc" },
  ];

  const milestones = language === "ar" ? [
    { year: "١٩٦٠", event: "تأسيس المدرسة", desc: "تأسست دار العلوم إسالكوتو تحت مظلة جبهة العلماء والأئمة بمبادرة من الأمير التاسع لإلورن، ألحاج ذوالقنين غمبيري، بمساعدة الشيخ آدم عبد الله الإلوري" },
    { year: "١٩٧٥", event: "إضافة القسم الإعدادي", desc: "توسع المعهد ليشمل المرحلة الإعدادية مع منهج متكامل يجمع بين العلوم الإسلامية والعلوم الحديثة" },
    { year: "١٩٩٥", event: "مرافق حديثة", desc: "بناء معامل الكمبيوتر والمختبرات العلمية لتعزيز التعليم التطبيقي" },
    { year: "٢٠١٠", event: "الاعتماد الأكاديمي", desc: "حصول المعهد على الاعتماد الكامل من وزارة التربية والتعليم النيجيرية" },
    { year: "٢٠٢٤", event: "التحول الرقمي", desc: "إطلاق نظام إدارة المدرسة الإلكتروني الحديث لتسهيل التواصل بين الطلاب والمعلمين وأولياء الأمور" },
  ] : [
    { year: "1960s", event: "School Founded", desc: "Daru Ulum Isalekoto was established under the umbrella of Jabhatil Ulanahi wal Ahimma through the initiative of the 9th Emir of Ilorin, Alhaji Zulkarnayni Gambari, with the support of Sheikh Adam Abdullah Al-Ilory" },
    { year: "1975", event: "Intermediate Section Added", desc: "The institute expanded to include the I'dadi level with an integrated curriculum combining Islamic and modern sciences" },
    { year: "1995", event: "Modern Facilities", desc: "Construction of computer labs and science laboratories to enhance practical education" },
    { year: "2010", event: "Academic Accreditation", desc: "Full accreditation received from the Nigerian Ministry of Education" },
    { year: "2024", event: "Digital Transformation", desc: "Launch of modern school management system to facilitate communication between students, teachers, and parents" },
  ];

  const teamMembers = [
    {
      image: teamMember1,
      name: language === "ar" ? "الأستاذ عبد الله أحمد" : "Ustaz Abdullah Ahmed",
      role: language === "ar" ? "نائب المدير للشؤون الأكاديمية" : "Vice Principal, Academics",
      desc: language === "ar" ? "خبير في تطوير المناهج والمبادرات الأكاديمية المتميزة." : "Expert in curriculum development and academic excellence initiatives."
    },
    {
      image: teamMember2,
      name: language === "ar" ? "الأستاذ يوسف إبراهيم" : "Ustaz Yusuf Ibrahim",
      role: language === "ar" ? "رئيس قسم الدراسات الإسلامية" : "Head of Islamic Studies",
      desc: language === "ar" ? "متخصص في العلوم الإسلامية والفقه والتفسير." : "Specialist in Islamic sciences, jurisprudence, and Quranic exegesis."
    },
    {
      image: teamMember3,
      name: language === "ar" ? "الأستاذ سليمان محمد" : "Ustaz Sulaiman Muhammad",
      role: language === "ar" ? "نائب المدير للشؤون الإدارية" : "Vice Principal, Administration",
      desc: language === "ar" ? "متخصص في رعاية الطلاب والتميز الإداري." : "Specializes in student welfare and administrative excellence."
    }
  ];

  return (
    <Layout>
      <SEOHead
        title="About Daru Ulum Isalekoto - History & Mission"
        description="Learn about Daru Ulum Isalekoto's rich history, founded under Jabhatil Ulanahi wal Ahimma by the 9th Emir of Ilorin and Sheikh Adam Abdullah Al-Ilory."
        url="/about"
      />
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden" dir={direction}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <img src={logo} alt="Daru Ulum Logo" className="w-24 h-24 object-contain" />
            </div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>{t("since")} {language === "ar" ? "١٩٦٠" : "1960s"}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("about_hero_title")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("about_hero_description")}
            </p>
          </div>
        </div>
      </section>


      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={studentsGroup} 
                alt={language === "ar" ? "طلاب دار العلوم" : "Daru Ulum Students"} 
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {language === "ar" ? "طلابنا مستقبل الأمة" : "Our Students, the Future of the Ummah"}
                  </h3>
                  <p className="text-white/80">
                    {language === "ar" ? "نرعى العقول ونبني الأجيال على أسس إسلامية راسخة" : "Nurturing minds and building generations on solid Islamic foundations"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-card bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t("our_mission")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("mission_description")}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card bg-gradient-to-br from-accent/5 to-accent/10">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t("our_vision")}</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {t("vision_description")}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("our_core_values")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("values_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(value.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(value.descKey)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("our_journey")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("journey_description")}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className={`absolute ${direction === "rtl" ? "right-8" : "left-8"} top-0 bottom-0 w-0.5 bg-border`} />
              
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex gap-6 pb-8 last:pb-0 ${direction === "rtl" ? "flex-row-reverse" : ""}`}>
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  </div>
                  <Card className="flex-1 border-none shadow-card">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{milestone.event}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <p className="text-4xl font-bold mb-2">{language === "ar" ? "٦٠+" : "60+"}</p>
              <p className="text-primary-foreground/80">{t("years_of_excellence")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{language === "ar" ? "٥٠٠٠+" : "5000+"}</p>
              <p className="text-primary-foreground/80">{t("alumni_network")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{language === "ar" ? "٥٠+" : "50+"}</p>
              <p className="text-primary-foreground/80">{t("qualified_teachers")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">{language === "ar" ? "٩٥٪" : "95%"}</p>
              <p className="text-primary-foreground/80">{t("graduation_rate")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("school_leadership")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("leadership_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-none shadow-card overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-sm text-primary mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
