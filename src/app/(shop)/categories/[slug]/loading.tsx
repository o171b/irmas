export default function CategoryLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-5 w-32 bg-muted animate-pulse rounded mb-6" />
      <div className="h-9 w-48 bg-muted animate-pulse rounded mb-2" />
      <div className="h-5 w-24 bg-muted animate-pulse rounded mb-8" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-[3/4] bg-muted animate-pulse rounded-lg" />
            <div className="mt-3 space-y-2">
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
              <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
