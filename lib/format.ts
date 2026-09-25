export const fmtMoney = (n: number, cents = false) =>
  n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents ? 2 : 0,
    minimumFractionDigits: cents ? 2 : 0,
  });

export const fmtDate = (iso: string, year = true) =>
  new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: year ? "numeric" : undefined,
  });

/** 1-based day of the challenge, counting from startDate */
export const dayOfChallenge = (startDate: string) =>
  Math.floor((Date.now() - new Date(startDate).getTime()) / 86_400_000) + 1;
