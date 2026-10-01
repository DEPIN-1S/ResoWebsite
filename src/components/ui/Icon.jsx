import React from 'react';
import {
  Armchair,
  BedDouble,
  Building2,
  DoorOpen,
  Factory,
  Layers,
  Leaf,
  Sparkles,
  Tv,
  UtensilsCrossed,
} from 'lucide-react';

const MAP = {
  wardrobe: DoorOpen,
  tv: Tv,
  bed: BedDouble,
  chair: Armchair,
  kitchen: UtensilsCrossed,
  building: Building2,
  layers: Layers,
  factory: Factory,
  leaf: Leaf,
  sparkle: Sparkles,
};

export default function Icon({ name, size = 24, ...rest }) {
  const Cmp = MAP[name] ?? Sparkles;
  return <Cmp size={size} strokeWidth={1.5} {...rest} />;
}
