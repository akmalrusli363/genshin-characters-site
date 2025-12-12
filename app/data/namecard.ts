export default interface Namecard {
  id: number;
  name: string;
  description: string;
  sortOrder: number;
  source: string[];
  images: NamecardImages;
  version: string;
}

export const namecardCategories = [
  "friendship",
  "reputation",
  "level",
  "quests",
  "achievements",
  "collaboration",
  "event",
  "battle-pass",
  "default",
  "others"
] as const;

export type NamecardCategory = (typeof namecardCategories)[number];

export interface NamecardImages {
  filename_icon: string;
  filename_banner: string;
  filename_background: string;
}

export interface NamecardResponse {
  name: string;
  namecards: Namecard[];
}
