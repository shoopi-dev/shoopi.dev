import { externalProps } from "@/lib/link";
import { Pop } from "./animate";

type Props = {
  href: string;
  delay?: number;
  icon?: string;
  children: React.ReactNode;
};

/** glossy pill link: brand icon + label */
export function Pill({ href, delay = 0, icon, children }: Props) {
  return (
    <Pop
      as="a"
      href={href}
      {...externalProps(href)}
      delay={delay}
      className="liquid-glass relative isolate inline-flex items-center gap-2 rounded-full px-5 py-2 text-base font-semibold transition-transform duration-300 hover:scale-105 active:scale-[0.97]"
    >
      <span aria-hidden className="liquid-refract" />
      {icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" className="h-[1.15em] w-[1.15em]" />
      )}
      {children}
    </Pop>
  );
}
