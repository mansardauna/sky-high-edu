import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "@/assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, direction } = useLanguage();

  const portalsComingSoon = (e?: React.MouseEvent) => {
    e?.preventDefault();
    toast(language === "ar" ? "البوابات قريباً" : "Portals — Coming Soon", {
      description:
        language === "ar"
          ? "نعمل على إطلاق بوابات الطلاب والموظفين قريباً إن شاء الله."
          : "Student and staff portals will be available soon, in shā’ Allāh.",
    });
    setIsOpen(false);
  };

  const navLink = "text-sm tracking-wide text-foreground/80 hover:text-primary transition-colors";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border" dir={direction}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white p-0.5 overflow-hidden border border-border">
              <img src={logoImage} alt={t("school_name")} className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-semibold text-lg text-foreground hidden sm:block">{t("school_name")}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={navLink}>{t("home")}</Link>
            <Link to="/about" className={navLink}>{t("about")}</Link>
            <Link to="/programs" className={navLink}>{t("programs")}</Link>
            <Link to="/gallery" className={navLink}>{language === "ar" ? "المعرض" : "Gallery"}</Link>
            <Link to="/contact" className={navLink}>{t("contact")}</Link>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="outline" size="sm" onClick={portalsComingSoon}>
              {language === "ar" ? "بوابة الموظفين" : "Staff Portal"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <Link to="/" className={`${navLink} px-2 py-1`} onClick={() => setIsOpen(false)}>{t("home")}</Link>
              <Link to="/about" className={`${navLink} px-2 py-1`} onClick={() => setIsOpen(false)}>{t("about")}</Link>
              <Link to="/programs" className={`${navLink} px-2 py-1`} onClick={() => setIsOpen(false)}>{t("programs")}</Link>
              <Link to="/gallery" className={`${navLink} px-2 py-1`} onClick={() => setIsOpen(false)}>{language === "ar" ? "المعرض" : "Gallery"}</Link>
              <Link to="/contact" className={`${navLink} px-2 py-1`} onClick={() => setIsOpen(false)}>{t("contact")}</Link>
              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full" onClick={portalsComingSoon}>
                  {language === "ar" ? "بوابة الموظفين" : "Staff Portal"}
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
