import { HeroSection } from "@/components/features/home/HeroSection";
import { FeaturedProducts } from "@/components/features/home/FeaturedProducts";
import { CategorySection } from "@/components/features/home/CategorySection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
    </>
  );
}
