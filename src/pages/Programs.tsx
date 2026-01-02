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

const Programs = () => {
  const programs = [
    {
      title: "Primary Education",
      level: "Primary 1-6",
      age: "Ages 6-11",
      description: "Foundation education combining Islamic values with core academic subjects.",
      subjects: ["Quranic Studies", "Arabic", "English", "Mathematics", "Basic Science", "Social Studies", "Islamic Studies"],
      features: ["Small class sizes", "Qualified teachers", "Safe learning environment", "Character development"],
      icon: BookOpen,
      color: "primary"
    },
    {
      title: "Junior Secondary",
      level: "JSS 1-3",
      age: "Ages 12-14",
      description: "Comprehensive curriculum preparing students for senior secondary education.",
      subjects: ["Mathematics", "English Language", "Islamic Studies", "Arabic", "Basic Science", "Basic Technology", "Social Studies", "Computer Science", "Physical Education"],
      features: ["Modern laboratories", "Extracurricular activities", "Career guidance", "Exam preparation"],
      icon: Calculator,
      color: "success"
    },
    {
      title: "Senior Secondary",
      level: "SSS 1-3",
      age: "Ages 15-17",
      description: "Specialized tracks preparing students for higher education and professional careers.",
      subjects: ["Mathematics", "English", "Islamic Studies", "Arabic", "Physics", "Chemistry", "Biology", "Economics", "Government", "Computer Science"],
      features: ["WAEC/NECO preparation", "University counseling", "Practical sessions", "Leadership training"],
      icon: GraduationCap,
      color: "warning"
    }
  ];

  const islamicPrograms = [
    {
      title: "Hifz Program",
      description: "Complete Quran memorization program with tajweed certification",
      duration: "2-4 years",
      icon: BookOpen
    },
    {
      title: "Arabic Language",
      description: "Comprehensive Arabic language studies from beginner to advanced",
      duration: "Continuous",
      icon: Globe
    },
    {
      title: "Islamic Jurisprudence",
      description: "Fiqh studies covering various schools of Islamic thought",
      duration: "3 years",
      icon: BookOpen
    },
    {
      title: "Hadith Studies",
      description: "Study of Prophetic traditions and their applications",
      duration: "2 years",
      icon: BookOpen
    }
  ];

  const extracurricular = [
    { name: "Debate Club", icon: Globe },
    { name: "Science Club", icon: Microscope },
    { name: "Art & Creativity", icon: Palette },
    { name: "Sports", icon: Trophy },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Excellence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our Academic Programs
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive education combining Islamic knowledge with modern academics, 
              preparing students for success in this life and the hereafter.
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
                    <h2 className="text-2xl font-bold text-foreground mb-2">{program.title}</h2>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="secondary">{program.level}</Badge>
                      <Badge variant="outline">{program.age}</Badge>
                    </div>
                    <p className="text-muted-foreground">{program.description}</p>
                  </div>
                  <div className="lg:col-span-2 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          Core Subjects
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {program.subjects.map((subject, i) => (
                            <Badge key={i} variant="outline" className="text-xs">{subject}</Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-success" />
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {program.features.map((feature, i) => (
                            <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-3 h-3 text-success" />
                              {feature}
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Islamic Studies Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Specialized programs for deep Islamic knowledge and Quranic education
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {islamicPrograms.map((program, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <program.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{program.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{program.description}</p>
                  <div className="flex items-center gap-2 text-xs text-primary">
                    <Clock className="w-3 h-3" />
                    <span>Duration: {program.duration}</span>
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
              <h2 className="text-3xl font-bold text-foreground mb-4">Extracurricular Activities</h2>
              <p className="text-muted-foreground">
                Beyond academics, we offer various activities for holistic development
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {extracurricular.map((activity, index) => (
                <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mx-auto mb-3">
                      <activity.icon className="w-6 h-6 text-primary" />
                    </div>
                    <p className="font-medium text-foreground text-sm">{activity.name}</p>
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
              Ready to Join Daru Ulum?
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              Take the first step towards a quality Islamic and academic education for your child.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/student-registration">
                  Apply Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Programs;
