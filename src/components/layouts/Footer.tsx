import Link from "next/link";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
      <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-10 sm:flex-row sm:gap-16">
          <Link
            href="https://wa.me/971501234567"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors group-hover:border-foreground">
              <WhatsAppIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">WhatsApp</span>
          </Link>
          <Link
            href="https://www.instagram.com/irmas_ae"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border transition-colors group-hover:border-foreground">
              <InstagramIcon className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium">Instagram</span>
          </Link>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IRMAS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
