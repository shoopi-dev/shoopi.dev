/*
 * The round of WordLah the landing page plays, and the words and people its pieces show, all as the app has them
 * (~/Dev/Wordlah: words/words.json, ui/theme/Color.kt): the day is KIASU, found in three tries as the App Store
 * screenshots play it.
 */

/** A mark per letter: r the right spot, m in the word elsewhere, o not in the word. */
export type Marks = string;

export const ANSWER = "KIASU";
export const PUZZLE = 7;

/** The demo day's guesses and their marks, as the game scores them. */
export const DAY: [string, Marks][] = [
  ["HOIST", "oomro"],
  ["AISLE", "mrmoo"],
  ["KIASU", "rrrrr"],
];

/** The Merlion's face after each of the demo day's guesses. */
export const DAY_FACES = ["laugh", "surprised", "delighted"];

/** His twelve faces (public/wordlah/art/merlion_<face>.webp). */
export const FACES = ["happy", "keen", "laugh", "delighted", "surprised", "puzzled", "thinking", "wink", "cheeky", "love", "sad", "angry"];

export type Origin = "Hokkien" | "Malay" | "English" | "Mandarin" | "Cantonese" | "Tamil" | "Teochew";

/** A word as its card shows it. */
export type Word = { word: string; part: string; origin: Origin; literally: string; sentence: string; meaning: string };

/** Words as words/words.json has them: all approved, none rude. */
export const WORDS: Record<string, Word> = {
  KIASU: { word: "KIASU", part: "adjective", origin: "Hokkien", literally: "afraid to lose (惊输)", sentence: "Set alarm for midnight just to play WORDLAH first? So KIASU!", meaning: "So scared of missing out that you queue first, grab extra and never let anyone get ahead." },
  SHIOK: { word: "SHIOK", part: "adjective", origin: "Malay", literally: "fun; enjoyable", sentence: "Hot day, cold kopi peng, first try guess correct. SHIOK!", meaning: "Fantastic, so satisfying. Great food, a cold drink on a hot day, a good win." },
  CHOPE: { word: "CHOPE", part: "verb", origin: "Malay", literally: "stop! hold on!", sentence: "Lunch time, one tissue packet CHOPE the whole table for six.", meaning: "To reserve a seat or table, usually with a tissue packet. Also shouted to call dibs." },
};

/** The cards the page cycles through. */
export const CARD_WORDS = ["KIASU", "SHIOK", "CHOPE"];

/** Today's leaderboard: names the server makes up ("Singlish, food or creature"), fewest tries first, then fastest. */
export const BOARD: [name: string, tries: number, time: string][] = [
  ["Kaypoh Rojak 86", 2, "1:12"],
  ["Steady Otter 27", 3, "0:58"],
  ["Shiok Sea Horse 43", 3, "1:41"],
  ["Kancheong Hornbill 55", 3, "2:05"],
  ["Solid Youtiao 44", 4, "1:30"],
];
/** The visitor, on the board. */
export const YOU = "Steady Otter 27";
