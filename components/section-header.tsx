import { Rise } from "./animate";

type Props = {
  title: string;
  subtitle?: string;
  delay?: number;
  small?: boolean;
};

export function SectionHeader({ title, subtitle, delay = 0, small = false }: Props) {
  return (
    <>
      <Rise
        as="h2"
        delay={delay}
        className={`font-display font-bold tracking-tight ${small ? "text-xl font-semibold" : "text-3xl"}`}
      >
        {title}
      </Rise>
      {subtitle && (
        <Rise as="p" delay={delay + 0.07} className="text-sm text-ink/60">
          {subtitle}
        </Rise>
      )}
    </>
  );
}
