import type { Metadata } from "next";
import { Rise, Pop } from "@/components/animate";
import { Pill } from "@/components/pill";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 pb-24 text-center">
      <Pop delay={0.05}>
        <div className="tile-glossy flex h-24 w-24 items-center justify-center rounded-[27%] text-5xl shadow-lg">
          🤷
        </div>
      </Pop>
      <Rise as="h1" delay={0.2} className="font-display text-5xl font-bold tracking-tight">
        404
      </Rise>
      <Rise as="p" delay={0.3} className="max-w-sm text-balance text-ink/70">
        This page is one of the things I haven&apos;t built yet.
      </Rise>
      <Pill href="/" delay={0.4}>
        Back to the journey
      </Pill>
    </main>
  );
}
