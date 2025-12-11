import Namecard, { NamecardCategory } from "../data/namecard";

export function getNamecardCategory(card: Namecard): NamecardCategory {
  const source = card.source.map(s => s.toLowerCase());
  const categoryRules: Record<NamecardCategory, string> = {
    friendship: "friendship",
    reputation: "reputation|offerings",
    level: "level|lv",
    quests: "quests",
    achievements: "achievements",
    collaboration: "collaboration",
    event: "event",
    "battle-pass": "bp reward",
    default: "first log in",
    others: "",
  };

  // check source keywords
  for (const [category, keywords] of Object.entries(categoryRules)) {
    if (source.some(s => keywords.split('|').some(keyword => s.includes(keyword)))) {
      return category as NamecardCategory;
    }
  }

  return "others";
}