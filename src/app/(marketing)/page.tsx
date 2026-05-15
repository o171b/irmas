import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturedProducts } from "@/components/features/home/FeaturedProducts";
import { CategorySection } from "@/components/features/home/CategorySection";
import { NewsletterSection } from "@/components/features/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <NewsletterSection />
    </>
  );
}
