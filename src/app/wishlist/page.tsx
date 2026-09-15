import type { Metadata } from "next";
import { WishlistView } from "@/components/account/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Pieces you have saved.",
};

export default function Page() {
  return <WishlistView />;
}
