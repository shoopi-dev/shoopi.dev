import { site } from "@/data/site";
import Link from "next/link";
import { externalProps } from "@/lib/link";
import { Rise } from "./animate";

export function Footer({ delay = 0 }: { delay?: number }) {
  return (
    <Rise
      as="footer"
      delay={delay}
      className="mt-16 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-ink/10 pt-6 text-xs text-ink/60"
    >
      <span>© {new Date().getFullYear()}</span>
      <Link
        href="/"
        className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
      >
        shoopi.dev
      </Link>
      <span aria-hidden>·</span>
      <Link
        href="/work"
        className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
      >
        work with me
      </Link>
      <span aria-hidden>·</span>
      <a
        href={site.repo}
        {...externalProps(site.repo)}
        className="underline decoration-dotted underline-offset-4 transition-colors hover:text-ink"
      >
        built in public
      </a>
    </Rise>
  );
}
