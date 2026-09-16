"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from "react";
import { getProductById } from "@/lib/data/catalogue";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT } from "@/lib/currency";
import type { CartLine, Product } from "@/lib/data/types";

/* ============================================================
   Cart + wishlist state.
   ------------------------------------------------------------
   Deliberately a reducer over plain data: the same actions map
   onto a real cart API later, and nothing in the UI reaches for
   storage directly. Persistence is localStorage for now — one
   swap point, in `persist` below.
   ============================================================ */

const STORAGE_KEY = "slaega.store.v1";

interface StoreState {
  lines: CartLine[];
  wishlist: string[];
}

type Action =
  | { type: "hydrate"; state: StoreState }
  | { type: "add"; productId: string; colorId: string; size: string; quantity: number }
  | { type: "setQuantity"; key: string; quantity: number }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "toggleWishlist"; productId: string };

const lineKey = (productId: string, colorId: string, size: string) =>
  `${productId}:${colorId}:${size}`;

function reducer(state: StoreState, action: Action): StoreState {
  switch (action.type) {
    case "hydrate":
      return action.state;

    case "add": {
      const key = lineKey(action.productId, action.colorId, action.size);
      const existing = state.lines.find((l) => l.key === key);
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.key === key ? { ...l, quantity: Math.min(l.quantity + action.quantity, 99) } : l,
          ),
        };
      }
      return {
        ...state,
        lines: [
          ...state.lines,
          {
            key,
            productId: action.productId,
            colorId: action.colorId,
            size: action.size,
            quantity: action.quantity,
          },
        ],
      };
    }

    case "setQuantity":
      return {
        ...state,
        lines:
          action.quantity <= 0
            ? state.lines.filter((l) => l.key !== action.key)
            : state.lines.map((l) =>
                l.key === action.key ? { ...l, quantity: Math.min(action.quantity, 99) } : l,
              ),
      };

    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };

    case "clear":
      return { ...state, lines: [] };

    case "toggleWishlist":
      return {
        ...state,
        wishlist: state.wishlist.includes(action.productId)
          ? state.wishlist.filter((id) => id !== action.productId)
          : [...state.wishlist, action.productId],
      };

    default:
      return state;
  }
}

const EMPTY: StoreState = { lines: [], wishlist: [] };

export interface ResolvedLine extends CartLine {
  product: Product;
  colorName: string;
  colorHex: string;
  lineTotal: number;
}

interface StoreValue {
  lines: ResolvedLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingRemaining: number;
  wishlist: string[];
  wishlistCount: number;
  ready: boolean;
  addToCart: (productId: string, colorId: string, size: string, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  /* UI surfaces — the drawer and the search panel live at the root. */
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function persist(state: StoreState) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* Private mode or a full quota — the session simply isn't persisted. */
  }
}

function restore(): StoreState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoreState>;
    return {
      lines: Array.isArray(parsed.lines) ? parsed.lines : [],
      wishlist: Array.isArray(parsed.wishlist) ? parsed.wishlist : [],
    };
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, EMPTY);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const saved = restore();
    if (saved) dispatch({ type: "hydrate", state: saved });
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) persist(state);
  }, [state, ready]);

  /* One panel at a time. */
  const closeCart = useCallback(() => setCartOpen(false), []);
  const openCart = useCallback(() => {
    setSearchOpen(false);
    setMenuOpen(false);
    setCartOpen(true);
  }, []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);
  const openSearch = useCallback(() => {
    setCartOpen(false);
    setMenuOpen(false);
    setSearchOpen(true);
  }, []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(false);
    setMenuOpen((v) => !v);
  }, []);

  const anyPanelOpen = cartOpen || searchOpen || menuOpen;

  useEffect(() => {
    document.body.dataset.locked = String(anyPanelOpen);
    return () => {
      document.body.dataset.locked = "false";
    };
  }, [anyPanelOpen]);

  useEffect(() => {
    if (!anyPanelOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyPanelOpen]);

  const value = useMemo<StoreValue>(() => {
    const lines: ResolvedLine[] = state.lines.flatMap((line) => {
      const product = getProductById(line.productId);
      if (!product) return [];
      const color = product.colors.find((c) => c.id === line.colorId) ?? product.colors[0];
      return [
        {
          ...line,
          product,
          colorName: color.name,
          colorHex: color.hex,
          lineTotal: product.price * line.quantity,
        },
      ];
    });

    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const shipping =
      subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;

    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      freeShippingRemaining: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      wishlist: state.wishlist,
      wishlistCount: state.wishlist.length,
      ready,
      addToCart: (productId, colorId, size, quantity = 1) => {
        dispatch({ type: "add", productId, colorId, size, quantity });
        setSearchOpen(false);
        setMenuOpen(false);
        setCartOpen(true);
      },
      setQuantity: (key, quantity) => dispatch({ type: "setQuantity", key, quantity }),
      removeLine: (key) => dispatch({ type: "remove", key }),
      clearCart: () => dispatch({ type: "clear" }),
      toggleWishlist: (productId) => dispatch({ type: "toggleWishlist", productId }),
      isWishlisted: (productId) => state.wishlist.includes(productId),
      cartOpen,
      openCart,
      closeCart,
      searchOpen,
      openSearch,
      closeSearch,
      menuOpen,
      toggleMenu,
      closeMenu,
    };
  }, [
    state,
    ready,
    cartOpen,
    searchOpen,
    menuOpen,
    openCart,
    closeCart,
    openSearch,
    closeSearch,
    toggleMenu,
    closeMenu,
  ]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}

