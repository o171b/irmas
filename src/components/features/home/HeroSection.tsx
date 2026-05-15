import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/fashion/1920/1080')] bg-cover bg-center opacity-5" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
          New Season Collection
        </span>
        <h1 className="mb-4 text-4xl font-light tracking-tight sm:text-5xl md:text-6xl">
          Elegance Redefined
        </h1>
        <p className="mx-auto mb-8 max-w-lg text-base text-muted-foreground sm:text-lg">
          Discover curated pieces that blend timeless sophistication with modern style.
          Your perfect look starts here.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className={cn(buttonVariants({ size: "lg" }), "min-w-[160px]")}
          >
            Shop Now
          </Link>
          <Link
            href="/categories/dresses"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-[160px]")}
          >
            View Dresses
          </Link>
        </div>
      </div>
    </section>
  );
}
