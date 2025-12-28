import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl">Daru Ulum</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              Nurturing minds, building futures. Excellence in education with Islamic values and modern standards.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className="text-background/70 hover:text-primary transition-colors text-sm">About Us</Link>
              <Link to="/programs" className="text-background/70 hover:text-primary transition-colors text-sm">Programs</Link>
              <Link to="/admissions" className="text-background/70 hover:text-primary transition-colors text-sm">Admissions</Link>
              <Link to="/news" className="text-background/70 hover:text-primary transition-colors text-sm">News & Events</Link>
              <Link to="/contact" className="text-background/70 hover:text-primary transition-colors text-sm">Contact Us</Link>
            </nav>
          </div>

          {/* Portals */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Portals</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/student-login" className="text-background/70 hover:text-primary transition-colors text-sm">Student Portal</Link>
              <Link to="/staff-login" className="text-background/70 hover:text-primary transition-colors text-sm">Teacher Portal</Link>
              <Link to="/staff-login" className="text-background/70 hover:text-primary transition-colors text-sm">Admin Portal</Link>
              <Link to="/staff-login" className="text-background/70 hover:text-primary transition-colors text-sm">Super Admin</Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">123 Education Street, Knowledge City, Nigeria</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">+234 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">info@daruulum.edu</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} Daru Ulum School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
