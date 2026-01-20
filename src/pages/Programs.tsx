import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  Globe, 
  Microscope, 
  Palette, 
  Trophy, 
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Programs = () => {
  const { t, translateSubject, language } = useLanguage();

  const programs = [
    {
      titleKey: "primary_education",
      level: language === "ar" ? "الابتدائي 1-6" : "Primary 1-6",
      age: language === "ar" ? "الأعمار 6-11" : "Ages 6-11",
      descriptionKey: "primary_education_desc",
      subjects: ["Quranic Studies", "Arabic", "English", "Mathematics", "Basic Science", "Social Studies", "Islamic Studies"],
      features: ["small_class_sizes", "qualified_teachers_feature", "safe_environment", "character_development"],
      icon: BookOpen,
      color: "primary"
    },
    {
      titleKey: "junior_secondary",
      level: language === "ar" ? "إعدادي 1-3" : "JSS 1-3",
      age: language === "ar" ? "الأعمار 12-14" : "Ages 12-14",
      descriptionKey: "junior_secondary_desc",
      subjects: ["Mathematics", "English", "Islamic Studies", "Arabic", "Basic Science", "Basic Technology", "Social Studies", "Computer Science", "Physical Education"],
      features: ["modern_laboratories", "extracurricular", "career_guidance", "exam_preparation"],
      icon: Calculator,
      color: "success"
    },
    {
      titleKey: "senior_secondary",
      level: language === "ar" ? "ثانوي 1-3" : "SSS 1-3",
      age: language === "ar" ? "الأعمار 15-17" : "Ages 15-17",
      descriptionKey: "senior_secondary_desc",
      subjects: ["Mathematics", "English", "Islamic Studies", "Arabic", "Physics", "Chemistry", "Biology", "Economics", "Government", "Computer Science"],
      features: ["waec_neco_prep", "university_counseling", "practical_sessions", "leadership_training"],
      icon: GraduationCap,
      color: "warning"
    }
  ];

  const islamicPrograms = [
    {
      titleKey: "hifz_program",
      descriptionKey: "hifz_program_desc",
      duration: language === "ar" ? "2-4 سنوات" : "2-4 years",
      icon: BookOpen
    },
    {
      titleKey: "arabic_language",
      descriptionKey: "arabic_language_desc",
      duration: t("continuous"),
      icon: Globe
    },
    {
      titleKey: "islamic_jurisprudence",
      descriptionKey: "islamic_jurisprudence_desc",
      duration: language === "ar" ? "3 سنوات" : "3 years",
      icon: BookOpen
    },
    {
      titleKey: "hadith_studies",
      descriptionKey: "hadith_studies_desc",
      duration: language === "ar" ? "سنتان" : "2 years",
      icon: BookOpen
    }
  ];

  const extracurricular = [
    { nameKey: "debate_club", icon: Globe },
    { nameKey: "science_club", icon: Microscope },
    { nameKey: "art_creativity", icon: Palette },
    { nameKey: "sports", icon: Trophy },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>{t("academic_excellence")}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {t("academic_programs")}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("programs_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Programs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="space-y-8 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <Card key={index} className="border-none shadow-card overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <div className={`bg-${program.color}/10 p-8 flex flex-col justify-center`}>
                    <div className={`w-16 h-16 rounded-xl bg-${program.color}/20 flex items-center justify-center mb-4`}>
                      <program.icon className={`w-8 h-8 text-${program.color}`} />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">{t(program.titleKey)}</h2>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary">{program.level}</Badge>
                      <Badge variant="outline">{program.age}</Badge>
                    </div>
                    <p className="text-muted-foreground">{t(program.descriptionKey)}</p>
                  </div>
                  <div className="lg:col-span-2 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          {t("core_subjects")}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {program.subjects.map((subject, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{translateSubject(subject)}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {t("key_features")}
                        </h3>
                        <ul className="space-y-2">
                          {program.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-success" />
                              {t(feature)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Islamic Programs */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">{t("islamic_studies_programs")}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t("programs_description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {islamicPrograms.map((program, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <program.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(program.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t(program.descriptionKey)}</p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Clock className="w-3 h-3" />
                    <span>{t("duration")}: {program.duration}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Extracurricular */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">{t("extracurricular")}</h2>
              <p className="text-muted-foreground">
                {t("extracurricular_desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {extracurricular.map((activity, index) => (
                <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                      <activity.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-sm">{t(activity.nameKey)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-primary-foreground mb-4">
              {t("ready_to_join")}
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              {t("take_first_step")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/student-registration">
                  {t("apply_now")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">{t("contact_us")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
