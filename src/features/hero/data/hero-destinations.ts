export interface HeroDestination {
  id: string;
  image: string;
  labelKey: string;
  /** The slide index this card activates when clicked */
  slideIndex: number;
}

// Fixed 3 cards — each maps to a specific background slide
// Red Sea  -> index 0 (boat.webp)
// Luxor    -> index 1 (sunset.webp)
// Giza     -> index 2 (prim.webp)
export const heroDestinations: HeroDestination[] = [
  {
    id: "red-sea",
    image: "/Hero/RedSea.png",
    labelKey: "redSea",
    slideIndex: 0,
  },
  {
    id: "luxor",
    image: "/Hero/Luxor.png",
    labelKey: "luxor",
    slideIndex: 1,
  },
  {
    id: "giza",
    image: "/Hero/Giza.png",
    labelKey: "giza",
    slideIndex: 2,
  },
];
