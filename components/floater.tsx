import { Pop } from "./animate";

type Props = {
  emoji: string;
  delay?: number;
  className?: string; // position + rotation, e.g. "-left-1 top-2 -rotate-12"
};

/** tilted polaroid-style emoji card floating around the hero */
export function Floater({ emoji, delay = 0, className = "" }: Props) {
  return (
    <Pop
      delay={delay}
      className={`absolute hidden h-14 w-14 items-center justify-center rounded-xl bg-white text-2xl shadow-md sm:flex ${className}`}
    >
      {emoji}
    </Pop>
  );
}
