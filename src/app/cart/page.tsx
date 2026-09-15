import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your SLAEGA cart.",
};

export default function Page() {
  return <CartPage />;
}
