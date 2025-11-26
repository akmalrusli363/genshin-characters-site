import ItemData from "./items";

export default interface Talents {
  id: number;
  name: string;
  combat1: CombatData;
  combat2: CombatData;
  combat3: CombatData;
  passive1: CombatData;
  passive2: CombatData;
  passive3: CombatData | undefined;
  passive4: CombatData | undefined;
  costs: Map<string, ItemData[]>;
  images: CombatImageData;
  version: string;
}

export interface CombatData {
  name: string;
  descriptionRaw: string;
  description: string;
  flavorText: string | undefined;
}

interface CombatImageData {
  filename_combat1: string;
  filename_combat2: string;
  filename_combat3: string;
  filename_passive1: string;
  filename_passive2: string;
  filename_passive3: string | undefined;
  filename_passive4: string | undefined;
}