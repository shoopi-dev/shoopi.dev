import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

type Props = {
  href: string;
  delay?: number;
  icon?: string;
  /** names an icon-only pill for screen readers */
  label?: string;
  /** the one main action on a screen: filled with the button blue */
  primary?: boolean;
  children?: React.ReactNode;
};

/** liquid glass link: icon + text, or a round icon button when there is no
    text. Pop springs in the wrapper, not the link: a finished pop holds
    `scale: 1` and would swallow the hover and press scale. */
export function Pill({ href, delay = 0, icon, label, primary = false, children }: Props) {
  const round = !children;
  return (
    <Pop as="span" delay={delay} className="inline-flex">
      <a
        href={href}
        {...externalProps(href)}
        aria-label={label}
        className={`glass-pill ${primary ? "primary" : ""} inline-flex items-center justify-center gap-2 rounded-full font-semibold ${
          round ? "h-12 w-12" : "px-5 py-2.5 text-base"
        }`}
      >
        {icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={icon}
            alt=""
            // ink glyphs: white on the blue fill, inverted to light ink on dark glass
            className={`${round ? "h-5 w-5 opacity-85" : "h-[1.15em] w-[1.15em]"} ${primary ? "brightness-0 invert" : "dark:invert"}`}
          />
        )}
        {children}
      </a>
    </Pop>
  );
}
