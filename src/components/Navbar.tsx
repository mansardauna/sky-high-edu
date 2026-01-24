import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, direction } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border" dir={direction}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-white p-1 shadow-md overflow-hidden">
              <img src={logoImage} alt={t("school_name")} className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:block">{t("school_name")}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              {t("home")}
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              {t("about")}
            </Link>
            <Link to="/programs" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              {t("programs")}
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium">
              {t("contact")}
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" asChild>
              <Link to="/student-login">{t("student_portal")}</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/staff-login">{t("staff_login")}</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
                {t("home")}
              </Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
                {t("about")}
              </Link>
              <Link to="/programs" className="text-muted-foreground hover:text-primary transition-colors font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
                {t("programs")}
              </Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-medium px-2 py-1" onClick={() => setIsOpen(false)}>
                {t("contact")}
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Button variant="ghost" asChild className="justify-start" onClick={() => setIsOpen(false)}>
                  <Link to="/student-login">{t("student_portal")}</Link>
                </Button>
                <Button variant="default" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/staff-login">{t("staff_login")}</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
