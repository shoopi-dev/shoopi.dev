import { Pop } from "./animate";

type Props = {
  src: string;
  alt: string;
  delay?: number;
  className?: string; // position + rotation, e.g. "-left-1 top-2 -rotate-12"
};

/** tilted polaroid-style photo floating around the hero */
export function Floater({ src, alt, delay = 0, className = "" }: Props) {
  return (
    <Pop
      delay={delay}
      className={`absolute hidden h-24 w-24 overflow-hidden rounded-2xl bg-white p-1.5 shadow-lg transition-transform duration-300 hover:rotate-0 hover:scale-105 lg:block xl:h-28 xl:w-28 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full rounded-xl object-cover" />
    </Pop>
  );
}
