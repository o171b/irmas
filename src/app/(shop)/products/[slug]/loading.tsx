export default function ProductDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-5 w-32 bg-muted animate-pulse rounded mb-6" />
      <div className="grid gap-8 md:grid-cols-2">
        <div className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
        <div className="space-y-4">
          <div className="h-5 w-20 bg-muted animate-pulse rounded" />
          <div className="h-9 w-3/4 bg-muted animate-pulse rounded" />
          <div className="h-5 w-32 bg-muted animate-pulse rounded" />
          <div className="h-9 w-40 bg-muted animate-pulse rounded" />
          <div className="h-24 bg-muted animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
