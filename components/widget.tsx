import { Rise } from "./animate";

type Props = {
  label: string;
  delay?: number;
  /** counting down or happening now: a pulsing red dot and a red label */
  live?: boolean;
  children: React.ReactNode;
};

/** frosted glass widget with an eyebrow label, rises in on load */
export function Widget({ label, delay = 0, live = false, children }: Props) {
  return (
    <Rise delay={delay}>
      <section className="glass rounded-[22px] p-5 shadow-lg">
        <h2
          className={`mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide ${live ? "text-red-text" : "text-ink/70"}`}
        >
          {live && <span className="live-dot h-2 w-2 rounded-full bg-red" aria-hidden />}
          {label}
        </h2>
        {children}
      </section>
    </Rise>
  );
}
