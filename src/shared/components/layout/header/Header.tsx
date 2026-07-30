import { useState } from "react";
import { Menu } from "lucide-react";
import styles from "./header.module.css";
import HeaderLogo from "./components/HeaderLogo";
import SearchBar from "@/shared/components/ui/SearchBar/SearchBar";
import MegaMenu from "./components/MegaMenu";
import ThemeToggle from "@/shared/components/ui/ThemeToggle/ThemeToggle";
import HeaderUserMenu from "./components/HeaderUserMenu";
import MobileMenu from "./components/MobileMenu";
import cn from "@/shared/utils/cn";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            <HeaderLogo height={25} />
          </div>

          <div className={styles.center}>
            <SearchBar className="d-none d-md-flex" />
          </div>

          <div className={styles.right}>
            <MegaMenu />
            <HeaderUserMenu />
            <ThemeToggle />
            <button
              className={cn(styles.hamburgerBtn, "d-block d-lg-none")}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Apri menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
