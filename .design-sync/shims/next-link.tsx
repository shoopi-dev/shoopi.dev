// design-sync shim: `next/link` resolves here inside the DS bundle (via the
// paths alias in .design-sync/tsconfig.json). Outside Next.js there is no
// client router, so a plain anchor is the truthful equivalent - it keeps the
// bundle free of Next internals (which reference `process` and crash in the
// browser).
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type LinkProps = {
  href: string | { pathname?: string };
  children?: ReactNode;
} & Omit<ComponentPropsWithoutRef<"a">, "href">;

export default function Link({ href, children, ...rest }: LinkProps) {
  const url = typeof href === "string" ? href : (href?.pathname ?? "#");
  return (
    <a href={url} {...rest}>
      {children}
    </a>
  );
}
