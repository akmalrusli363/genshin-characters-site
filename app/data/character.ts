export interface CV {
  english: string;
  chinese: string;
  japanese: string;
  korean: string;
}

export interface CostItem {
  id: number;
  name: string;
  count: number;
}

export interface AvatarImages {
  image: string;
  card: string;
  portrait: string;
  "hoyolab-avatar": string;
  filename_icon: string;
  filename_iconCard: string;
  filename_sideIcon: string;
  filename_gachaSplash: string;
  filename_gachaSlice: string;
  mihoyo_icon: string;
  mihoyo_sideIcon: string;
}

export interface Url {
  fandom: string;
}

export default interface Character {
  id: number;
  name: string;
  title: string;
  description: string;
  weaponType: string;
  weaponText: string;
  bodyType: string;
  gender: string;
  qualityType: string;
  rarity: number;
  birthdaymmdd: string;
  birthday: string;
  elementType: string;
  elementText: string;
  affiliation: string;
  associationType: string;
  region: string;
  substatType: string;
  substatText: string;
  constellation: string;
  cv: CV;
  costs: Record<string, CostItem[]>;
  images: AvatarImages;
  url: Url;
  version: string;
}