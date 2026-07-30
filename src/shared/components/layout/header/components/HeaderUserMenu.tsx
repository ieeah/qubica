import { useAuthContext } from "@/shared/context/AuthContext";
import { Link } from "react-router-dom";
import styles from "./headerusermenu.module.css";
import cn from "@/shared/utils/cn";

export default function HeaderUserMenu() {
  const { token, logout } = useAuthContext();

  return (
    <div className={cn(styles.userMenu, "d-none d-lg-flex")}>
      {token ? (
        <>
          <span>Benvenuto!</span>
          <button className="btn-primary" onClick={logout}>
            Esci
          </button>
        </>
      ) : (
        <Link
          to="/auth/login"
          className="btn-primary"
          style={{ textDecoration: "none" }}
        >
          Login / Profilo
        </Link>
      )}
    </div>
  );
}
