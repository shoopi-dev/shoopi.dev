// Self-check for the waitlists, on the in-memory list next dev uses: bun lib/waitlist.check.ts
import assert from "node:assert/strict";
import { joinWaitlist } from "./waitlist";

const join = (app: string, email: string) => {
  const form = new FormData();
  form.set("email", email);
  return joinWaitlist(app, {}, form);
};

assert.deepEqual(await join("eureka", "a@example.com"), { place: 1 });
assert.deepEqual(await join("eureka", "b@example.com"), { place: 2 });
// the same email, however it is typed, keeps its place
assert.deepEqual(await join("eureka", "  A@Example.com "), { place: 1 });
// each app has a list of its own
assert.deepEqual(await join("stampstory", "b@example.com"), { place: 1 });
assert.ok((await join("eureka", "not an email")).problem);
assert.ok((await join("eureka", `${"a".repeat(250)}@example.com`)).problem);
assert.ok((await join("nope", "c@example.com")).problem);
console.log("waitlist: ok");
