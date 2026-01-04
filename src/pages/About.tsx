import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Target, Heart, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t, direction } = useLanguage();

  const values = [
    { icon: BookOpen, titleKey: "islamic_excellence", descKey: "islamic_excellence_desc" },
    { icon: Heart, titleKey: "character_building", descKey: "character_building_desc" },
    { icon: Target, titleKey: "academic_rigor", descKey: "academic_rigor_desc" },
    { icon: Star, titleKey: "holistic_development", descKey: "holistic_development_desc" },
  ];

  const milestones = [
    { year: "1985", eventKey: "school_founded", descKey: "school_founded_desc" },
    { year: "1995", eventKey: "secondary_added", descKey: "secondary_added_desc" },
    { year: "2005", eventKey: "modern_facilities", descKey: "modern_facilities_desc" },
    { year: "2015", eventKey: "accreditation", descKey: "accreditation_desc" },
    { year: "2024", eventKey: "digital_transformation", descKey: "digital_transformation_desc" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5" dir={direction}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>{t("since")} 1985</span>
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
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />
              
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-6 pb-8 last:pb-0">
                  <div className="relative z-10 w-16 h-16 rounded-full bg-primary/10 border-4 border-background flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-primary">{milestone.year}</span>
                  </div>
                  <Card className="flex-1 border-none shadow-card">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{t(milestone.eventKey)}</h3>
                      <p className="text-sm text-muted-foreground">{t(milestone.descKey)}</p>
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
              <p className="text-4xl font-bold mb-2">39+</p>
              <p className="text-primary-foreground/80">{t("years_of_excellence")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5000+</p>
              <p className="text-primary-foreground/80">{t("alumni_network")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-primary-foreground/80">{t("qualified_teachers")}</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">95%</p>
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
                  SI
                </div>
                <h3 className="font-semibold text-foreground mb-1">Sheikh Ibrahim</h3>
                <p className="text-sm text-primary mb-3">{t("principal")}</p>
                <p className="text-sm text-muted-foreground">
                  Over 25 years of experience in Islamic education and school administration.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-success to-success/80 flex items-center justify-center mx-auto mb-4 text-success-foreground text-2xl font-bold">
                  AA
                </div>
                <h3 className="font-semibold text-foreground mb-1">Mr. Abdullahi Ahmed</h3>
                <p className="text-sm text-success mb-3">{t("vp_academics")}</p>
                <p className="text-sm text-muted-foreground">
                  Expert in curriculum development and academic excellence initiatives.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-warning to-warning/80 flex items-center justify-center mx-auto mb-4 text-warning-foreground text-2xl font-bold">
                  FM
                </div>
                <h3 className="font-semibold text-foreground mb-1">Mrs. Fatima Musa</h3>
                <p className="text-sm text-warning mb-3">{t("vp_admin")}</p>
                <p className="text-sm text-muted-foreground">
                  Specializes in student welfare and administrative excellence.
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
