import type { Wish } from "../types/Wish";

export function sortWishes(
  wishes: Wish[],
  sortByDate: "newest" | "oldest" | "",
  sortByPrice: "high" | "low" | ""
) {
  return [...wishes].sort((a, b) => {
    if (sortByDate) {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      if (sortByDate === "newest") return dateB - dateA;
      if (sortByDate === "oldest") return dateA - dateB;
    }
    if (sortByPrice) {
      if (sortByPrice === "high") return b.price - a.price;
      if (sortByPrice === "low") return a.price - b.price;
    }
    return 0;
  });
}
