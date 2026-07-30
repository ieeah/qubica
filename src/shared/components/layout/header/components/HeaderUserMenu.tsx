import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "@/shared/context/AuthContext";
import Dropdown from "@/shared/components/ui/Dropdown/Dropdown";
import AccountMenuContent from "./AccountMenuContent";
import styles from "./headerusermenu.module.css";
import cn from "@/shared/utils/cn";

export default function HeaderUserMenu() {
  const { token } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  if (!token) {
    return (
      <div className={cn(styles.userMenu, "d-none d-lg-flex")}>
        <Link
          to="/auth/login"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          Login / Profilo
        </Link>
      </div>
    );
  }

  return (
    <div className={cn(styles.userMenu, "d-none d-lg-flex")}>
      <button
        ref={triggerRef}
        className={styles.avatarButton}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Apri menu profilo"
      >
        U
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        className={styles.profileMenu}
      >
        <AccountMenuContent
          onNavigate={() => setIsOpen(false)}
          variant="dropdown"
        />
      </Dropdown>
    </div>
  );
}
