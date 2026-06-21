"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ErrorItem } from "@/types/learning";

type ErrorBookState = {
  errors: ErrorItem[];
  addError: (item: Omit<ErrorItem, "createdAt">) => void;
  clearErrors: () => void;
  removeError: (id: string) => void;
};

export const useErrorBookStore = create<ErrorBookState>()(
  persist(
    (set) => ({
      errors: [],
      addError: (item) =>
        set((state) => {
          const key = `${item.type}-${item.id}-${item.userAnswer ?? ""}`;
          const exists = state.errors.some(
            (error) => `${error.type}-${error.id}-${error.userAnswer ?? ""}` === key,
          );

          if (exists) {
            return state;
          }

          return {
            errors: [{ ...item, createdAt: Date.now() }, ...state.errors].slice(0, 50),
          };
        }),
      clearErrors: () => set({ errors: [] }),
      removeError: (id) =>
        set((state) => ({
          errors: state.errors.filter((item) => item.id !== id),
        })),
    }),
    {
      name: "shima-english-error-book",
    },
  ),
);
