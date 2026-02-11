import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const BASE_URL = "https://id-preview--65e7c195-e4b6-4751-8bcd-4a11292ae758.lovable.app";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;
const SITE_NAME = "Daru Ulum Isalekoto";

const SEOHead = ({
  title = "Daru Ulum Isalekoto - Islamic & Western Education, Ilorin",
  description = "Daru Ulum Isalekoto is a leading Islamic and Western educational institution in Isalekoto, Ilorin, Kwara State, Nigeria. Founded under Jabhatil Ulanahi wal Ahimma with guidance from the 9th Emir of Ilorin and Sheikh Adam Abdullah Al-Ilory.",
  keywords = "Daru Ulum Isalekoto, Islamic school Ilorin, Arabic school Nigeria, Jabhatil Ulanahi, Sheikh Adam Al-Ilory, Kwara State school, Quran memorization, Hifz program, Islamic education Nigeria",
  image = DEFAULT_IMAGE,
  url,
  type = "website",
}: SEOHeadProps) => {
  useEffect(() => {
    // Title
    document.title = title;

    // Helper to set meta tags
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const pageUrl = url ? `${BASE_URL}${url}` : BASE_URL;

    // Standard meta
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", pageUrl);

    // Open Graph
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", image);
    setMeta("property", "og:url", pageUrl);
    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image:width", "1200");
    setMeta("property", "og:image:height", "630");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:site", "@DaruUlumSchool");
  }, [title, description, keywords, image, url, type]);

  return null;
};

export default SEOHead;
