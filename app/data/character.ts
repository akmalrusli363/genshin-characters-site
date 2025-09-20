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

export interface Costs {
  ascend1: CostItem[];
  ascend2: CostItem[];
  ascend3: CostItem[];
  ascend4: CostItem[];
  ascend5: CostItem[];
  ascend6: CostItem[];
}

export interface Images {
  image: string;
  card: string;
  portrait: string;
  "hoyolab-avatar": string;
  filename_icon: string;
  filename_iconCard: string;
  filename_sideIcon: string;
  mihoyo_icon: string;
  mihoyo_sideIcon: string;
}

export interface Url {
  fandom: string;
}

export interface Character {
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
  costs: Costs;
  images: Images;
  url: Url;
  version: string;
}