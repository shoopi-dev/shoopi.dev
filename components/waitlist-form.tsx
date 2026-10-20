"use client";

import { useActionState } from "react";
import { joinWaitlist, type WaitlistState } from "@/lib/waitlist";
import { Pop } from "./animate";

/** The email field of an Android waitlist (components/waitlist.tsx); once joined, the thanks takes its place. */
export function WaitlistForm({ app, date }: { app: string; date?: string }) {
  const [state, action, pending] = useActionState(joinWaitlist.bind(null, app), {} as WaitlistState);

  if (state.place) {
    return (
      <Pop role="status" className="glass flex flex-col items-center gap-1 rounded-[22px] px-8 py-5">
        <p className="font-display text-xl font-bold">Got it! See you {date || "soon"}.</p>
        <p className="text-sm text-ink/70">
          {"You're "}
          <span className="font-semibold tabular-nums text-ink">#{state.place}</span> on the list.
        </p>
      </Pop>
    );
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-2">
      <form action={action} className="flex w-full flex-col gap-2 sm:flex-row">
        <label htmlFor="waitlist-email" className="sr-only">
          Email
        </label>
        <input
          id="waitlist-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className="glass min-w-0 flex-1 rounded-full px-5 py-3 text-base text-ink placeholder:text-ink/60"
        />
        <button
          type="submit"
          disabled={pending}
          className="glass-pill primary rounded-full px-5 py-3 text-base font-semibold disabled:opacity-60"
        >
          {"Tell me when it's live"}
        </button>
      </form>
      {state.problem && (
        <p role="alert" className="text-xs text-red-text">
          {state.problem}
        </p>
      )}
    </div>
  );
}
