import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

type Props = {
  href: string;
  delay?: number;
  icon?: string;
  /** names an icon-only pill for screen readers */
  label?: string;
  children?: React.ReactNode;
};

/** liquid glass link: icon + text, or a round icon button when there is no
    text. Pop springs in the wrapper, not the link: a finished pop holds
    `scale: 1` and would swallow the hover and press scale. */
export function Pill({ href, delay = 0, icon, label, children }: Props) {
  const round = !children;
  return (
    <Pop as="span" delay={delay} className="inline-flex">
      <a
        href={href}
        {...externalProps(href)}
        aria-label={label}
        className={`glass-pill inline-flex items-center justify-center gap-2 rounded-full font-semibold ${
          round ? "h-12 w-12" : "px-5 py-2.5 text-base"
        }`}
      >
        {icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt=""
            className={round ? "h-5 w-5 opacity-85" : "h-[1.15em] w-[1.15em]"}
          />
        )}
        {children}
      </a>
    </Pop>
  );
}
