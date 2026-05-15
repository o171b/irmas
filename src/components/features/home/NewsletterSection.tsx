"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="bg-muted/50 py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-light tracking-tight sm:text-3xl">Stay in the Loop</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Subscribe for exclusive access to new arrivals, sales, and style inspiration.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm font-medium text-primary">
            Thanks for subscribing! We&apos;ll be in touch.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        )}
      </div>
    </section>
  );
}
