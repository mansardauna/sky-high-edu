import Layout from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Award, Target, Heart, Star, Clock } from "lucide-react";

const About = () => {
  const values = [
    { icon: BookOpen, title: "Islamic Excellence", description: "Combining Quranic education with modern academic curriculum" },
    { icon: Heart, title: "Character Building", description: "Nurturing morally upright and responsible citizens" },
    { icon: Target, title: "Academic Rigor", description: "Maintaining high standards in both Islamic and Western education" },
    { icon: Star, title: "Holistic Development", description: "Fostering intellectual, spiritual, and physical growth" },
  ];

  const milestones = [
    { year: "1985", event: "School Founded", description: "Daru Ulum Isalekoto was established in Ilorin, Kwara State" },
    { year: "1995", event: "Secondary Section Added", description: "Expanded to include junior and senior secondary education" },
    { year: "2005", event: "Modern Facilities", description: "New computer lab and science laboratories built" },
    { year: "2015", event: "Accreditation", description: "Received full accreditation from Ministry of Education" },
    { year: "2024", event: "Digital Transformation", description: "Launched modern school management system" },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4" />
              <span>Since 1985</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              About Daru Ulum Isalekoto
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              A leading Islamic educational institution in Ilorin, Kwara State, Nigeria, 
              dedicated to providing comprehensive Islamic and secular education that 
              nurtures the intellectual, spiritual, and moral potential of our students.
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
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide quality Islamic and Western education that develops students 
                  into well-rounded individuals who are academically excellent, morally 
                  upright, and spiritually grounded, prepared to contribute positively to 
                  society while maintaining their Islamic values.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-card bg-gradient-to-br from-accent/5 to-accent/10">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                  <Star className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading Islamic educational institution in Nigeria, recognized 
                  for producing graduates who excel in both religious knowledge and secular 
                  academics, becoming leaders and positive change-makers in their communities 
                  and beyond.
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at Daru Ulum Isalekoto
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <Card key={index} className="border-none shadow-card hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
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
            <h2 className="text-3xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Key milestones in the history of Daru Ulum Isalekoto
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
                      <h3 className="font-semibold text-foreground mb-2">{milestone.event}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
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
              <p className="text-primary-foreground/80">Years of Excellence</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">5000+</p>
              <p className="text-primary-foreground/80">Alumni Network</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">50+</p>
              <p className="text-primary-foreground/80">Qualified Teachers</p>
            </div>
            <div>
              <p className="text-4xl font-bold mb-2">95%</p>
              <p className="text-primary-foreground/80">Graduation Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">School Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dedicated leaders guiding our institution towards excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="border-none shadow-card">
              <CardContent className="p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mx-auto mb-4 text-primary-foreground text-2xl font-bold">
                  SI
                </div>
                <h3 className="font-semibold text-foreground mb-1">Sheikh Ibrahim</h3>
                <p className="text-sm text-primary mb-3">Principal / Chief Imam</p>
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
                <p className="text-sm text-success mb-3">Vice Principal (Academics)</p>
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
                <p className="text-sm text-warning mb-3">Vice Principal (Admin)</p>
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
