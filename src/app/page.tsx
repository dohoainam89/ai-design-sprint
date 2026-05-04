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
    link,
    "slug": slug.current
  }`
);

export default async function Home() {
  const { data: portfolioItems } = await sanityFetch({ query: portfolioQuery });

  return (
    <>
      <Navbar />
      <main>
        {/* data-navbar-theme tells the Navbar which colour scheme to use */}
        <HeroSection />
        <div data-navbar-theme="light"><TaglineSection /></div>
        <div data-navbar-theme="light"><AboutSection /></div>
        <div data-navbar-theme="dark"><PhotoBannerSection /></div>
        <div data-navbar-theme="dark"><ServicesSection /></div>
        <div data-navbar-theme="light"><SelectedWorkSection projects={portfolioItems} /></div>
        <div data-navbar-theme="light"><TestimonialsSection /></div>
        <div data-navbar-theme="light"><NewsSection /></div>
        <div data-navbar-theme="dark"><Footer /></div>
      </main>
      <SanityLive />
    </>
  );
}
