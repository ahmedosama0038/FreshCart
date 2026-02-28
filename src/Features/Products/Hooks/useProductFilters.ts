"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition } from "react";

export interface UseProductFiltersReturn {
  keyword: string;
  setKeyword: (value: string) => void;

  price: string;
  setPrice: (value: string) => void;
  applyPrice: () => void;

  category: string | null;
  brand: string | null;

  updateFilter: (key: string, value?: string) => void;
  clearAll: () => void;

  isPending: boolean;
}

export function useProductFilters(): UseProductFiltersReturn {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  //////////////////////////////////////////////////////
  // States synced with URL
  //////////////////////////////////////////////////////

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const [price, setPrice] = useState(searchParams.get("price[lte]") || "50000");

  //////////////////////////////////////////////////////
  // Derived values مباشرة من URL
  //////////////////////////////////////////////////////

  const category = searchParams.get("category");
  const brand = searchParams.get("brand");

  //////////////////////////////////////////////////////
  // Sync state when URL changes (back / forward)
  //////////////////////////////////////////////////////

  useEffect(() => {
    setKeyword(searchParams.get("keyword") || "");
    setPrice(searchParams.get("price[lte]") || "50000");
  }, [searchParams]);

  //////////////////////////////////////////////////////
  // Update single filter
  //////////////////////////////////////////////////////

  const updateFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // reset pagination
    params.delete("page");

    startTransition(() => {
      router.push(`?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  //////////////////////////////////////////////////////
  // Debounce keyword search
  //////////////////////////////////////////////////////

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateFilter("keyword", keyword);
    }, 400);

    return () => clearTimeout(timeout);
  }, [keyword]);

  //////////////////////////////////////////////////////
  // Apply price filter
  //////////////////////////////////////////////////////

  const applyPrice = () => {
    updateFilter("price[lte]", price);
  };

  //////////////////////////////////////////////////////
  // Clear all filters
  //////////////////////////////////////////////////////

  const clearAll = () => {
    setKeyword("");
    setPrice("50000");

    startTransition(() => {
      router.push("?", {
        scroll: false,
      });
    });
  };

  //////////////////////////////////////////////////////
  // Return API
  //////////////////////////////////////////////////////

  return {
    keyword,
    setKeyword,

    price,
    setPrice,
    applyPrice,

    category,
    brand,

    updateFilter,
    clearAll,

    isPending,
  };
}
