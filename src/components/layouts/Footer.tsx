import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-3 text-sm font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">All Products</Link></li>
              <li><Link href="/categories/dresses" className="text-sm text-muted-foreground hover:text-foreground">Dresses</Link></li>
              <li><Link href="/categories/abayas" className="text-sm text-muted-foreground hover:text-foreground">Abayas</Link></li>
              <li><Link href="/categories/all" className="text-sm text-muted-foreground hover:text-foreground">All</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Shipping</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Returns</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">About</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Sustainability</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Instagram</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Pinterest</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">TikTok</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} IRMAS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
