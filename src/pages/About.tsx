import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Target, Heart, Star, Users, Award, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import studentsQuran from "@/assets/students-quran.jpg";
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
    { year: "١٩٨٥", event: "تأسيس المدرسة", desc: "تأسست دار العلوم إسالكوتو على يد الشيخ عبد الباقي محمد كجزء من حركة الإصلاح الدين (إصلاح الدين) في إيلورين، ولاية كوارا، نيجيريا" },
    { year: "١٩٩٥", event: "إضافة القسم الإعدادي", desc: "توسع المعهد ليشمل المرحلة الإعدادية مع منهج متكامل يجمع بين العلوم الإسلامية والعلوم الحديثة" },
    { year: "٢٠٠٥", event: "مرافق حديثة", desc: "بناء معامل الكمبيوتر والمختبرات العلمية لتعزيز التعليم التطبيقي" },
    { year: "٢٠١٥", event: "الاعتماد الأكاديمي", desc: "حصول المعهد على الاعتماد الكامل من وزارة التربية والتعليم النيجيرية" },
    { year: "٢٠٢٤", event: "التحول الرقمي", desc: "إطلاق نظام إدارة المدرسة الإلكتروني الحديث لتسهيل التواصل بين الطلاب والمعلمين وأولياء الأمور" },
  ] : [
    { year: "1985", event: "School Founded", desc: "Daru Ulum Isalekoto was established by Sheikh Abdulbaaqi Muhammad as part of the Islahudeen (Religious Reform) movement in Ilorin, Kwara State, Nigeria" },
    { year: "1995", event: "Intermediate Section Added", desc: "The institute expanded to include the I'dadi level with an integrated curriculum combining Islamic and modern sciences" },
    { year: "2005", event: "Modern Facilities", desc: "Construction of computer labs and science laboratories to enhance practical education" },
    { year: "2015", event: "Academic Accreditation", desc: "Full accreditation received from the Nigerian Ministry of Education" },
    { year: "2024", event: "Digital Transformation", desc: "Launch of modern school management system to facilitate communication between students, teachers, and parents" },
  ];

  const founderInfo = language === "ar" ? {
    name: "الشيخ عبد الباقي محمد",
    title: "المؤسس والإمام الأكبر",
    bio: "الشيخ عبد الباقي محمد هو عالم إسلامي بارز ومؤسس دار العلوم إسالكوتو. ولد ونشأ في إيلورين، مدينة العلم والعلماء في نيجيريا. تلقى تعليمه الإسلامي على يد كبار علماء المنطقة وتخصص في الفقه الإسلامي والتفسير والحديث. أسس الشيخ حركة إصلاح الدين (الإصلاح الديني) التي تهدف إلى تجديد الفكر الإسلامي والجمع بين الأصالة والمعاصرة في التعليم. يؤمن الشيخ بأن التعليم الإسلامي الحقيقي لا يتعارض مع العلوم الحديثة، بل يكملها ويوجهها نحو خدمة الإنسانية.",
    movement: "حركة إصلاح الدين",
    movementDesc: "حركة إصلاح الدين هي حركة إصلاحية إسلامية أسسها الشيخ عبد الباقي محمد في إيلورين. تهدف الحركة إلى: تجديد الفهم الصحيح للإسلام، الجمع بين التعليم الإسلامي التقليدي والعلوم الحديثة، تربية جيل مسلم واعٍ قادر على مواجهة تحديات العصر، نشر قيم الوسطية والاعتدال في المجتمع."
  } : {
    name: "Sheikh Abdulbaaqi Muhammad",
    title: "Founder & Chief Imam",
    bio: "Sheikh Abdulbaaqi Muhammad is a prominent Islamic scholar and the founder of Daru Ulum Isalekoto. Born and raised in Ilorin, the city of knowledge and scholars in Nigeria, he received his Islamic education from the region's leading scholars, specializing in Islamic jurisprudence, Quranic exegesis, and Hadith sciences. Sheikh established the Islahudeen (Religious Reform) movement, which aims to renew Islamic thought while combining authenticity with contemporary approaches in education. The Sheikh believes that true Islamic education does not conflict with modern sciences but rather complements and guides them toward serving humanity.",
    movement: "The Islahudeen Movement",
    movementDesc: "Islahudeen is an Islamic reform movement founded by Sheikh Abdulbaaqi Muhammad in Ilorin. The movement aims to: Renew the correct understanding of Islam, Combine traditional Islamic education with modern sciences, Raise a conscious Muslim generation capable of facing contemporary challenges, and Spread the values of moderation in society."
  };

  return (
    <Layout>
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
              <span>{t("since")} {language === "ar" ? "١٩٨٥" : "1985"}</span>
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

      {/* Founder Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {language === "ar" ? "المؤسس والإمام الأكبر" : "The Founder & Chief Imam"}
              </h2>
            </div>
            
            <Card className="border-none shadow-xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                <div className="lg:col-span-1 bg-gradient-to-br from-primary to-primary/80 p-8 flex flex-col items-center justify-center text-center text-primary-foreground">
                  <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center mb-6 text-5xl font-bold">
                    {language === "ar" ? "ش.ع" : "SA"}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{founderInfo.name}</h3>
                  <p className="text-primary-foreground/80">{founderInfo.title}</p>
                </div>
                <div className="lg:col-span-2 p-8">
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {founderInfo.bio}
                  </p>
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5 text-primary" />
                      <h4 className="font-bold text-foreground">{founderInfo.movement}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {founderInfo.movementDesc}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
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

      {/* Image Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={studentsQuran} 
                alt={language === "ar" ? "طلاب دار العلوم" : "Daru Ulum Students"} 
                className="w-full h-80 object-cover"
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

      {/* Core Values */}
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
              <p className="text-4xl font-bold mb-2">{language === "ar" ? "٣٩+" : "39+"}</p>
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
            <Card className="border-none shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 text-primary-foreground text-2xl font-bold">
                  {language === "ar" ? "ش.ع" : "SA"}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {language === "ar" ? "الشيخ عبد الباقي محمد" : "Sheikh Abdulbaaqi Muhammad"}
                </h3>
                <p className="text-sm text-primary mb-3">{t("principal")}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar" 
                    ? "أكثر من ٤٠ عاماً من الخبرة في التعليم الإسلامي وإدارة المؤسسات التعليمية."
                    : "Over 40 years of experience in Islamic education and educational institution management."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center mx-auto mb-4 text-success-foreground text-2xl font-bold">
                  {language === "ar" ? "أ.أ" : "AA"}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {language === "ar" ? "الأستاذ عبد الله أحمد" : "Ustaz Abdullah Ahmed"}
                </h3>
                <p className="text-sm text-success mb-3">{t("vp_academics")}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? "خبير في تطوير المناهج والمبادرات الأكاديمية المتميزة."
                    : "Expert in curriculum development and academic excellence initiatives."}
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center mx-auto mb-4 text-warning-foreground text-2xl font-bold">
                  {language === "ar" ? "أ.ف" : "FM"}
                </div>
                <h3 className="font-semibold text-foreground mb-1">
                  {language === "ar" ? "الأستاذة فاطمة موسى" : "Ustaza Fatima Musa"}
                </h3>
                <p className="text-sm text-warning mb-3">{t("vp_admin")}</p>
                <p className="text-sm text-muted-foreground">
                  {language === "ar"
                    ? "متخصصة في رعاية الطلاب والتميز الإداري."
                    : "Specializes in student welfare and administrative excellence."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
