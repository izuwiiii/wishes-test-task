import { createContext, useContext, useEffect, useState } from "react";
import { type Wish } from "../types/Wish";
import { useApi } from "../api/useApi";

const WishesContext = createContext<any>(null);
export const useWishes = () => useContext(WishesContext);

const API_URL = "https://db-wishes.onrender.com/wishes";

export const WishesProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const { request } = useApi();

  const getWishes = async () => {
    const data = await request(API_URL);
    if (data) setWishes(data);
  };

  const addWish = async (wish: Omit<Wish, "id" | "createdAt">) => {
    const newWish = {
      ...wish,
      image:
        wish.image ||
        "https://sleepreviewmag.com/wp-content/uploads/2024/01/man-dreaming-bed.jpg",
      createdAt: new Date().toISOString(),
    };
    const data = await request(API_URL, {
      method: "POST",
      body: JSON.stringify(newWish),
    });
    if (data) setWishes([...wishes, data]);
  };

  const deleteWish = async (id: string) => {
    await request(`${API_URL}/${id}`, { method: "DELETE" });
    setWishes(wishes.filter((w) => w.id !== id));
  };

  const updateWish = async (id: string, updated: Partial<Wish>) => {
    const data = await request(`${API_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(updated),
    });
    if (data) setWishes(wishes.map((w) => (w.id === id ? data : w)));
  };

  useEffect(() => {
    getWishes();
  }, []);

  return (
    <WishesContext.Provider
      value={{ wishes, addWish, deleteWish, updateWish, getWishes }}
    >
      {children}
    </WishesContext.Provider>
  );
};
