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

export const weaponItemCoordinates: Record<number, { x: number; y: number }> = {
  0: { x: 0, y: 0 },
  1: { x: -40, y: 0 },
  2: { x: -80, y: 0 },

  3: { x: 0, y: -40 },
  4: { x: -40, y: -40 },
  5: { x: -80, y: -40 },
  6: { x: -120, y: -40 },
  7: { x: -160, y: -40 },
  8: { x: -200, y: -40 },

  9: { x: 0, y: -80 },
  10: { x: -40, y: -80 },
  11: { x: -80, y: -80 },
  12: { x: -120, y: -80 },

  13: { x: 0, y: -120 },
  14: { x: -40, y: -120 },
  15: { x: -80, y: -120 },

  16: { x: 0, y: -160 },
  17: { x: -40, y: -160 },
  18: { x: -80, y: -160 },
  19: { x: -120, y: -160 },

  20: { x: 0, y: -200 },
  21: { x: -40, y: -200 },
  22: { x: -80, y: -200 },
  23: { x: -120, y: -200 },

  24: { x: 0, y: -240 },
  25: { x: -40, y: -240 },
  26: { x: -80, y: -240 },
  27: { x: -120, y: -240 },

  28: { x: 0, y: -280 }
};

export const projectileCoordinates: Record<number, { x: number; y: number }> = {
  0: { x: 0, y: 0 },
  1: { x: -40, y: 0 },
  2: { x: -80, y: 0 },
  3: { x: -120, y: 0 },
  4: { x: -160, y: 0 },
  5: { x: -200, y: 0 },
  6: { x: -240, y: 0 },
  7: { x: -280, y: 0 },

  8: { x: 0, y: -40 },
  9: { x: -40, y: -40 },
  10: { x: -80, y: -40 },
  11: { x: -120, y: -40 },
  12: { x: -160, y: -40 },
  13: { x: -200, y: -40 },
  14: { x: -240, y: -40 },
  15: { x: -280, y: -40 },

  16: { x: 0, y: -80 },
  17: { x: -40, y: -80 },
  18: { x: -80, y: -80 },
  19: { x: -120, y: -80 },
  20: { x: -160, y: -80 },
  21: { x: -200, y: -80 },
  22: { x: -240, y: -80 },
  23: { x: -280, y: -80 },

  24: { x: 0, y: -120 },
  25: { x: -40, y: -120 },
  26: { x: -80, y: -120 },

  27: { x: 0, y: -160 },
  28: { x: -40, y: -160 },
  29: { x: -80, y: -160 }
};
