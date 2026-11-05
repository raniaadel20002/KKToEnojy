import { CategoriesSection } from "@/src/features/categories/components/categories-section";
import { FaqSection } from "@/src/features/faq/components/faq-section";
import { HeroSection } from "@/src/features/hero/components/hero-section";
import { HowItWorksSection } from "@/src/features/how-it-works/components/how-it-works-section";
import { ToursSection } from "@/src/features/tours/components/tours-section";
import { BlogsSection } from "@/src/features/blogs/components/blogs-section";
import { HomeGallerySection } from "@/src/features/gallery/components/home-gallery-section";
import { PopularDestinationsSection } from "@/src/features/destinations/components/popular-destinations-section";
import { ReviewsProjectSection } from "@/src/features/reviews-project/components/reviews-project-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KKToEnojy - Create Memories Together in Egypt",
  description:
    "Discover Egypt with KKToEnojy. Explore destinations, book tours, and create unforgettable memories. Your trusted partner for Egyptian adventures.",
  openGraph: {
    title: "KKToEnojy - Create Memories Together",
    description: "Discover Egypt's best tours and destinations. Start your adventure today.",
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <ToursSection />
      <HowItWorksSection />
      <PopularDestinationsSection />
      <HomeGallerySection />
      <BlogsSection />
      <FaqSection />
      <ReviewsProjectSection />
    </>
  );
}
