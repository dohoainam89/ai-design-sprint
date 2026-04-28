import HeroSection from "./components/HeroSection";
import TaglineSection from "./components/TaglineSection";
import AboutSection from "./components/AboutSection";
import PhotoBannerSection from "./components/PhotoBannerSection";
import ServicesSection from "./components/ServicesSection";
import SelectedWorkSection from "./components/SelectedWorkSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TaglineSection />
      <AboutSection />
      <PhotoBannerSection />
      <ServicesSection />
      <SelectedWorkSection />
    </main>
  );
}
