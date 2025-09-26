export function mapCharacterCombatScalingData(scalingType: string) {
  switch (scalingType) {
    case "FIGHT_PROP_ATTACK_PERCENT": return "Attack (%)";
    case "FIGHT_PROP_ELEMENT_MASTERY": return "Elemental Mastery";
    case "FIGHT_PROP_CRITICAL": return "Critical Rate";
    case "FIGHT_PROP_CRITICAL_HURT": return "Critical Damage";
    case "FIGHT_PROP_HP_PERCENT": return "HP (%)";
    case "FIGHT_PROP_DEFENSE_PERCENT": return "Defense (%)";
    case "FIGHT_PROP_HEAL_ADD": return "Healing Bonus";
    case "FIGHT_PROP_CHARGE_EFFICIENCY": return "Energy Recharge";
    case "FIGHT_PROP_ROCK_ADD_HURT": return "Geo Damage Bonus";
    case "FIGHT_PROP_GRASS_ADD_HURT": return "Dendro Damage Bonus";
    case "FIGHT_PROP_ICE_ADD_HURT": return "Ice Damage Bonus";
    case "FIGHT_PROP_ELEC_ADD_HURT": return "Electro Damage Bonus";
    case "FIGHT_PROP_FIRE_ADD_HURT": return "Pyro Damage Bonus";
    case "FIGHT_PROP_WIND_ADD_HURT": return "Anemo Damage Bonus";
    case "FIGHT_PROP_PHYSICAL_ADD_HURT": return "Physical Damage Bonus";
    case "FIGHT_PROP_WATER_ADD_HURT": return "Hydro Damage Bonus";
  }
}