import { generateSpriteCoordinates } from "@/helpers/misc";

export const ItemTagEnum = {
  None: 1,
  Weapon: 2,
  Ability: 3,
  Armor: 4,
  Accessory: 5,
  Misc: 6,
  Consumable: 7
};

export const ItemRarityEnum = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Epic: 4,
  Legendary: 5
};

export const Stats = {
  MGT: 0,
  ARM: 1,
  WIS: 2,
  STR: 3,
  AGI: 4,
  SWF: 5
};

export const StatusEffects = {
  Energized: 1,
  Slowed: 2,
  Silenced: 3,
  Damaging: 4,
  ArmorBroken: 5,
  Healing: 6,
  Poisoned: 7,
  Bleeding: 8,
  Armored: 9,
  Invincible: 10,
  Weak: 11,
  Stunned: 12,
  Berserk: 13,
  Paralyzed: 14,
  Burning: 15,
  Radiance: 16,
  Sick: 17,
  Frostbite: 18
};

export const StatusEffectData: Record<number, { name: string }> = Object.fromEntries(
  Object.entries(StatusEffects).map(([key, value]) => [
    value,
    { name: key.replace(/([A-Z])/g, " $1").trim() }
  ])
);

export const ItemTagName = {
  [ItemTagEnum.None]: "None",
  [ItemTagEnum.Weapon]: "Weapon",
  [ItemTagEnum.Ability]: "Ability",
  [ItemTagEnum.Armor]: "Armor",
  [ItemTagEnum.Accessory]: "Accessory",
  [ItemTagEnum.Misc]: "Misc",
  [ItemTagEnum.Consumable]: "Consumable"
};

export const ItemRarityData: Record<number, { color: string; name: string }> = {
  [ItemRarityEnum.Common]: { color: "#fff", name: "Common" },
  [ItemRarityEnum.Uncommon]: { color: "#31cd31", name: "Uncommon" },
  [ItemRarityEnum.Rare]: { color: "#1e90ff", name: "Rare" },
  [ItemRarityEnum.Epic]: { color: "#a020f0", name: "Epic" },
  [ItemRarityEnum.Legendary]: { color: "#ff8b00", name: "Legendary" }
};

export const StatsData: Record<number, { color: string }> = {
  [Stats.MGT]: { color: "#b04183" },
  [Stats.ARM]: { color: "#7d6d6d" },
  [Stats.WIS]: { color: "#6488c3" },
  [Stats.STR]: { color: "#c54646" },
  [Stats.AGI]: { color: "#dd8457" },
  [Stats.SWF]: { color: "#3bab3b" }
};

export const weaponItemCoordinates = generateSpriteCoordinates([3, 6, 4, 3, 4, 4, 4, 1]);

export const accessoryItemCoordinates = generateSpriteCoordinates([8, 8, 8, 8, 3, 6, 2, 2]);

export const armorItemCoordinates = generateSpriteCoordinates([5, 2, 5]);

export const projectileCoordinates = generateSpriteCoordinates([8, 8, 8, 3, 3]);
