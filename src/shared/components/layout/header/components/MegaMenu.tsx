import {
  useState,
  useRef,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { Link } from "react-router-dom";

import Dropdown from "../../../ui/Dropdown/Dropdown";
import Alert from "../../../ui/Alert/Alert";
import SkeletonMegaMenu from "./SkeletonMegaMenu";

import useCategories from "@/shared/hooks/useCategories";
import cn from "@/shared/utils/cn";
import { capitalize } from "@/shared/utils/capitalize";

import styles from "./megamenu.module.css";

export default function MegaMenu() {
  const { categories = [], isLoading, error } = useCategories();
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  let dropdownContent: ReactNode;

  if (isLoading) {
    dropdownContent = <SkeletonMegaMenu />;
  } else if (error) {
    dropdownContent = (
      <div className="col-12">
        <Alert type="error" message="Errore durante il caricamento delle categorie." />
      </div>
    );
  } else {
    dropdownContent = (
      <MegaMenuContent categories={categories || []} setIsOpen={setIsOpen} />
    );
  }

  return (
    <div
      className={styles.dropdownContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        Categorie
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
      >
        <div className="row g-3">{dropdownContent}</div>
      </Dropdown>
    </div>
  );
}

function MegaMenuContent({
  categories,
  setIsOpen,
}: {
  categories: string[];
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className={cn(styles.mainCategory, "col-12 col-md-6")}>
        <div className={styles.mainCategoryContent}>
          <h3>Nuova Collezione</h3>
          <p>Scopri i trend del momento.</p>
          {categories.length > 0 && (
            <Link
              to={`/?category=${encodeURIComponent(categories[0])}`}
              className="btn-primary"
              onClick={() => setIsOpen(false)}
            >
              Esplora {categories[0]}
            </Link>
          )}
        </div>
      </div>

      <div className={cn(styles.otherCategories, "col-12 col-md-6")}>
        <h4>Esplora</h4>
        <ul>
          {categories.slice(1).map((cat) => (
            <li key={cat}>
              <Link
                to={`/?category=${encodeURIComponent(cat)}`}
                onClick={() => setIsOpen(false)}
              >
                {capitalize(cat)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
