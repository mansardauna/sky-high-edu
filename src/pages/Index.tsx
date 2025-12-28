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
  CheckCircle,
  Calendar,
  Clock,
  ChevronRight
} from "lucide-react";
import heroImage from "@/assets/hero-school.jpg";

const Index = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Quality Education",
      description: "World-class curriculum combining Islamic studies with modern academics"
    },
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Dedicated and qualified educators committed to student success"
    },
    {
      icon: BookOpen,
      title: "Digital Learning",
      description: "State-of-the-art facilities with integrated technology"
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "Proven track record of outstanding academic achievements"
    }
  ];

  const stats = [
    { value: "2,500+", label: "Students" },
    { value: "150+", label: "Teachers" },
    { value: "25+", label: "Years" },
    { value: "98%", label: "Success Rate" }
  ];

  const announcements = [
    {
      date: "Dec 28, 2024",
      title: "New Term Registration Open",
      category: "Admissions"
    },
    {
      date: "Dec 25, 2024",
      title: "Annual Sports Day Results",
      category: "Events"
    },
    {
      date: "Dec 20, 2024",
      title: "Holiday Break Schedule",
      category: "Notice"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Daru Ulum School Campus" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-background">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6 animate-fade-in">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Excellence in Education</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight animate-slide-up">
              Welcome to <span className="text-primary">Daru Ulum</span> School
            </h1>
            
            <p className="text-lg md:text-xl text-background/80 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              Nurturing minds, building futures. We provide world-class education rooted in Islamic values and modern academic excellence.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <Button variant="hero" size="xl" asChild>
                <Link to="/student-login">
                  Student Portal <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="heroOutline" size="xl" asChild>
                <Link to="/staff-login">
                  Staff Login
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 -mb-16">
              {stats.map((stat, index) => (
                <Card key={index} className="bg-card/95 backdrop-blur-sm border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-muted-foreground text-sm font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Daru Ulum?
            </h2>
            <p className="text-muted-foreground text-lg">
              We combine traditional Islamic values with modern education to prepare students for success in this world and the hereafter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none bg-card">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Access Your Portal
            </h2>
            <p className="text-muted-foreground text-lg">
              Login to your personalized dashboard for grades, assignments, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/student-login" className="group">
              <Card className="h-full border-2 border-transparent hover:border-primary/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/30">
                    <GraduationCap className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Student Portal</h3>
                  <p className="text-muted-foreground text-sm mb-4">Check results, attendance & more</p>
                  <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                    Login <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full border-2 border-transparent hover:border-success/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-success to-success/70 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-success/30">
                    <BookOpen className="w-10 h-10 text-success-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Teacher Portal</h3>
                  <p className="text-muted-foreground text-sm mb-4">Manage classes & upload results</p>
                  <span className="inline-flex items-center gap-1 text-success font-medium text-sm">
                    Login <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full border-2 border-transparent hover:border-warning/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-warning to-warning/70 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-warning/30">
                    <Users className="w-10 h-10 text-warning-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Admin Portal</h3>
                  <p className="text-muted-foreground text-sm mb-4">Manage staff & operations</p>
                  <span className="inline-flex items-center gap-1 text-warning font-medium text-sm">
                    Login <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>

            <Link to="/staff-login" className="group">
              <Card className="h-full border-2 border-transparent hover:border-destructive/50 hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-destructive to-destructive/70 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-destructive/30">
                    <Trophy className="w-10 h-10 text-destructive-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Super Admin</h3>
                  <p className="text-muted-foreground text-sm mb-4">Full system control</p>
                  <span className="inline-flex items-center gap-1 text-destructive font-medium text-sm">
                    Login <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Announcements Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Latest Announcements
              </h2>
              <p className="text-muted-foreground text-lg">
                Stay updated with the latest news and events
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {announcements.map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                    <span className="ml-auto px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Join Daru Ulum?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Enroll your child today and give them the gift of quality education combined with strong moral values.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="heroOutline" size="xl">
              Apply Now <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="xl" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/20">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
