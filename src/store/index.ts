import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartState = {
  itemsCount: number;
  items: { slug: string; amount: number; price: number }[];
};

export type CartActions = {
  addItem: (slug: string, amount: number) => void;
  removeItem: (slug: string) => void;
  reduceAmount: (slug: string) => void;
  clear: () => void;
};

export type CartStore = CartState & CartActions;

export const cartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      itemsCount: 0,
      addItem: (slug, price) => {
        const item = get().items.find((item) => item.slug == slug);
        if (item != undefined) {
          const items = [
            ...get().items.filter((it) => it != item),
            { ...item, amount: item.amount + 1 },
          ];
          set({ items });
        } else
          set({
            itemsCount: get().itemsCount + 1,
            items: [...get().items, { slug, amount: 1, price }],
          });
      },
      removeItem: (slug) =>
        set({
          itemsCount: get().itemsCount - 1,
          items: get().items.filter((elem) => elem.slug != slug),
        }),
      reduceAmount: (slug) => {
        const item = get().items.find((item) => item.slug == slug);
        if (item == undefined) return;
        const items = get().items.filter((it) => it.slug != slug);
        if (item.amount > 1) {
          items.push({ ...item, amount: item.amount - 1 });
          set({ items });
        } else
          set({
            items,
            itemsCount: get().itemsCount - 1,
          });
      },
      clear: () =>
        set({
          itemsCount: 0,
          items: [],
        }),
    }),
    {
      name: "cart",
      skipHydration: true,
    }
  )
);

export type Theme = "light" | "dark";

export type ThemeState = {
  theme: Theme;
};

export type ThemeActions = {
  switchTheme: () => void;
};

export type ThemeStore = ThemeState & ThemeActions;

export const themeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      theme: "light",
      switchTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "theme",
      skipHydration: true,
    }
  )
);
