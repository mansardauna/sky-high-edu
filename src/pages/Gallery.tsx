import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-school-new.jpg";
import studentsGroup from "@/assets/students-group.jpg";
import studentsQuran from "@/assets/students-quran.jpg";
import { Camera } from "lucide-react";

const Gallery = () => {
  const { language, direction } = useLanguage();

  const photos = [
    { src: heroImage, caption: language === "ar" ? "المبنى الرئيسي" : "Main Campus" },
    { src: studentsGroup, caption: language === "ar" ? "طلابنا" : "Our Students" },
    { src: studentsQuran, caption: language === "ar" ? "حلقة القرآن" : "Quran Circle" },
    { src: heroImage, caption: language === "ar" ? "الفصول الدراسية" : "Classrooms" },
    { src: studentsGroup, caption: language === "ar" ? "الأنشطة" : "Activities" },
    { src: studentsQuran, caption: language === "ar" ? "حياة الطلاب" : "Student Life" },
  ];

  return (
    <Layout>
      <SEOHead
        title="Gallery — Daru Ulum Isalekoto"
        description="Photo gallery showcasing campus life, classrooms, Quran circles and student activities at Daru Ulum Isalekoto, Ilorin."
        url="/gallery"
      />

      <section className="py-20 bg-muted/30" dir={direction}>
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-border bg-background mb-6">
            <Camera className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-widest uppercase text-muted-foreground">
              {language === "ar" ? "المعرض" : "Gallery"}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-foreground mb-6">
            {language === "ar" ? "لحظات من حياتنا" : "Moments From Our Life"}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            {language === "ar"
              ? "نظرة بصرية على الحياة الدراسية والروحية في دار العلوم إسالكوتو."
              : "A visual glimpse into the academic and spiritual life at Daru Ulum Isalekoto."}
          </p>
        </div>
      </section>

      <section className="py-16" dir={direction}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
            {photos.map((p, i) => (
              <Card key={i} className="group relative overflow-hidden aspect-[4/3]">
                <img src={p.src} alt={p.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-colors flex items-end p-5">
                  <span className="text-background opacity-0 group-hover:opacity-100 transition-opacity font-display text-lg">
                    {p.caption}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
