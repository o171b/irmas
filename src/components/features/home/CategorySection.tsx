import Image from "next/image";
import Link from "next/link";
import { categories } from "@/constants/products";

export function CategorySection() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-light tracking-tight sm:text-3xl">Shop by Category</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Find exactly what you&apos;re looking for
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-lg"
            >
              <div className="relative aspect-square">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <h3 className="text-sm font-medium text-white">{cat.name}</h3>
                  <p className="text-xs text-white/70">{cat.count} items</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
