import { useState } from "react";
import { Menu } from "lucide-react";
import styles from "./header.module.css";
import HeaderLogo from "./components/HeaderLogo";
import SearchBar from "@/shared/components/ui/SearchBar/SearchBar";
import MegaMenu from "./components/MegaMenu";
import ThemeToggle from "@/shared/components/ui/ThemeToggle/ThemeToggle";
import HeaderUserMenu from "./components/HeaderUserMenu";
import HeaderCartButton from "./components/HeaderCartButton";
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
            <div className="d-flex d-lg-none w-100 justify-content-center">
              <MegaMenu />
            </div>
            <SearchBar className="d-none d-lg-flex" />
          </div>

          <div className={styles.right}>
            <div className="d-none d-lg-block">
              <MegaMenu />
            </div>
            <HeaderUserMenu />
            <HeaderCartButton />
            <div className="d-none d-lg-flex">
              <ThemeToggle />
            </div>
            <button
              className={cn(styles.hamburgerBtn, "d-block d-lg-none")}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Apri menu"
              aria-expanded={isMobileMenuOpen}
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
