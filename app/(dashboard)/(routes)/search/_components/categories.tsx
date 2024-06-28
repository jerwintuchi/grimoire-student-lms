"use client";

import { Category } from "@prisma/client";
import {} from "react-icons/fc";
import {
  GiFireSpellCast,
  GiGhostAlly,
  GiAnimalHide,
  GiShieldReflect,
  GiTripleSkulls,
  GiMagicPalm,
  GiAnkh,
  GiMagicPortal,
  GiBurningBook,
} from "react-icons/gi";
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";
interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Elemental Magic": GiFireSpellCast,
  "Illusion Arts": GiGhostAlly,
  "Conjuration": GiAnimalHide,
  "Abjuration": GiShieldReflect,
  "Necromancy": GiTripleSkulls,
  "Forbidden Art": GiMagicPalm,
  "Ancient Magic": GiAnkh,
  "Arcane Studies": GiMagicPortal,
  "ᛟᚾᚡᛖᚱ": GiBurningBook,
};
/* eslint-enable */
export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-scroll scrollbar-hide pb-2 over">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
