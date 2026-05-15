import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-light tracking-tight">404</h1>
      <p className="text-muted-foreground">Page not found</p>
      <Link href="/" className={cn(buttonVariants())}>
        Go Home
      </Link>
    </div>
  );
}
