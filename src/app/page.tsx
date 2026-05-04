import { defineQuery } from "groq";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import TaglineSection from "./components/TaglineSection";
import AboutSection from "./components/AboutSection";
import PhotoBannerSection from "./components/PhotoBannerSection";
import ServicesSection from "./components/ServicesSection";
import SelectedWorkSection from "./components/SelectedWorkSection";
import TestimonialsSection from "./components/TestimonialsSection";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";

const portfolioQuery = defineQuery(
  `*[_type == "portfolioItem"] | order(order asc) {
    _id,
    title,
    coverImage,
    "categories": categories[]->{_id, title},
    link
  }`
);

export default async function Home() {
  const { data: portfolioItems } = await sanityFetch({ query: portfolioQuery });

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TaglineSection />
        <AboutSection />
        <PhotoBannerSection />
        <ServicesSection />
        <SelectedWorkSection projects={portfolioItems} />
        <TestimonialsSection />
        <NewsSection />
      </main>
      <Footer />
      <SanityLive />
    </>
  );
}
