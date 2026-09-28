import React from "react";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import HomeEventsPreview from "../components/HomeEventsPreview";
import HomeGalleryPreview from "../components/HomeGalleryPreview";
import Speakers from "../components/Speakers";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[#D1BE94] overflow-x-hidden text-[#0f1d38]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Parchment Scroll & Running Numbers */}
      <AboutSection />

      {/* 3. Dynamic Flagship Events Preview */}
      <HomeEventsPreview />

      {/* 4. Distinguished Speakers */}
      <Speakers />

      <HomeGalleryPreview />
    </div>
  );
}