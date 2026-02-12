export interface ItemModel {
  id: number;
  name: string;
  description: string;
  tag: number;

  shootSound?: number;
  spritePath?: string;
  projectilePath?: string;
  projectileDegree?: number;
  minDamage?: number;
  maxDamage?: number;
  projectileCount?: number;
  rarity?: number;
  range?: number;
  projectileScale?: number;
  impactColor?: string;
  stats?: number[];
}
