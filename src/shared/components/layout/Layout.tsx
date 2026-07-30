import { Outlet } from "react-router-dom";
import Header from "@/shared/components/layout/header/Header";
import Footer from "@/shared/components/layout/footer/Footer";
import cn from "@/shared/utils/cn";
import styles from "./layout.module.css";

export default function Layout() {
  const layoutClassnames = cn(styles.layout, "col-12");

  return (
    <div className={layoutClassnames}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
