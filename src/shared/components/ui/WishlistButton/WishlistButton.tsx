import { Heart } from "lucide-react";
import { useWishlistContext } from "@/shared/context/WishlistContext";
import useRequireAuth from "@/shared/hooks/useRequireAuth";
import LoginPromptModal from "@/shared/components/ui/LoginPromptModal/LoginPromptModal";
import cn from "@/shared/utils/cn";
import type { WishlistButtonProps } from "./wishlistbutton.type";
import styles from "./wishlistbutton.module.css";

export default function WishlistButton({
  product,
  className,
}: WishlistButtonProps) {
  const { isInWishlist, toggleItem } = useWishlistContext();
  const { requireAuth, isLoginPromptOpen, closeLoginPrompt } = useRequireAuth();
  const active = isInWishlist(product.id);

  return (
    <>
      <button
        type="button"
        className={cn(styles.button, active && styles.active, className)}
        onClick={() => requireAuth(() => toggleItem(product))}
        aria-pressed={active}
        aria-label={active ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      >
        <Heart size={20} fill={active ? "currentColor" : "none"} />
      </button>
      <LoginPromptModal isOpen={isLoginPromptOpen} onClose={closeLoginPrompt} />
    </>
  );
}
