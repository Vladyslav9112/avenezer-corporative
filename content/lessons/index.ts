import { LESSONS_EN } from "./en";
import { LESSONS_FR } from "./fr";
import { LESSONS_UK } from "./uk";
import type { LessonContent } from "./types";

export function getLessonsByLocale(locale: string): LessonContent[] {
  if (locale === "en") return LESSONS_EN;
  if (locale === "fr") return LESSONS_FR;
  return LESSONS_UK;
}
