import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import logoImage from "@/assets/logo.png";

const Footer = () => {
  const { t, direction, language } = useLanguage();

  const comingSoon = (e: React.MouseEvent) => {
    e.preventDefault();
    toast(language === "ar" ? "قريباً" : "Coming Soon", {
      description:
        language === "ar"
          ? "هذه البوابة قيد التطوير."
          : "This portal is under development.",
    });
  };

  const linkCls = "text-background/70 hover:text-primary transition-colors text-sm";

  return (
    <footer className="bg-foreground text-background" dir={direction}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white p-1 overflow-hidden">
                <img src={logoImage} alt={t("school_name")} className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-semibold text-xl">{t("school_name")}</span>
            </Link>
            <p className="text-background/70 text-sm leading-relaxed">
              {t("footer_description")}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 border border-background/20 flex items-center justify-center hover:bg-primary hover:border-primary transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">{t("quick_links")}</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/about" className={linkCls}>{t("about")}</Link>
              <Link to="/programs" className={linkCls}>{t("programs")}</Link>
              <Link to="/gallery" className={linkCls}>{language === "ar" ? "المعرض" : "Gallery"}</Link>
              <Link to="/contact" className={linkCls}>{t("contact")}</Link>
            </nav>
          </div>

          {/* Portals */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">{t("portals")}</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" onClick={comingSoon} className={linkCls}>
                {t("student_portal")} <span className="text-xs text-background/40 ml-1">({language === "ar" ? "قريباً" : "Coming Soon"})</span>
              </a>
              <a href="#" onClick={comingSoon} className={linkCls}>
                {t("teacher_portal")} <span className="text-xs text-background/40 ml-1">({language === "ar" ? "قريباً" : "Coming Soon"})</span>
              </a>
              <a href="#" onClick={comingSoon} className={linkCls}>
                {t("admin_portal")} <span className="text-xs text-background/40 ml-1">({language === "ar" ? "قريباً" : "Coming Soon"})</span>
              </a>
              <a href="#" onClick={comingSoon} className={linkCls}>
                {t("super_admin")} <span className="text-xs text-background/40 ml-1">({language === "ar" ? "قريباً" : "Coming Soon"})</span>
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-lg">{t("contact")}</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/70 text-sm">{language === "ar" ? "إسالكوتو، إلورن، ولاية كوارا، نيجيريا" : "Isalekoto, Ilorin, Kwara State, Nigeria"}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">+234 800 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-background/70 text-sm">info@daruulum.edu.ng</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-12 pt-8 text-center">
          <p className="text-background/50 text-sm">
            © {new Date().getFullYear()} {t("school_name")}. {t("all_rights_reserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
