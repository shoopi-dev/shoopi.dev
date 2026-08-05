import { Rise } from "./animate";

type Props = {
  label: string;
  delay?: number;
  children: React.ReactNode;
};

/** frosted glass widget with an eyebrow label, rises in on load */
export function Widget({ label, delay = 0, children }: Props) {
  return (
    <Rise delay={delay}>
      <section className="glass rounded-[22px] p-5 shadow-lg">
        <h2 className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink/70">
          {label}
        </h2>
        {children}
      </section>
    </Rise>
  );
}
