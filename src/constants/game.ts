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
