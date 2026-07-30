import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { SearchBarProps } from "./searchbar.type";
import cn from "@/shared/utils/cn";
import styles from "./searchbar.module.css";

export default function SearchBar({
  searchPath = "/",
  queryParamName = "q",
  placeholder = "Cerca...",
  className,
}: SearchBarProps) {
  const [searchParams] = useSearchParams();
  const urlParamValue = searchParams.get(queryParamName) || "";
  const [term, setTerm] = useState(urlParamValue);
  const navigate = useNavigate();

  useEffect(() => {
    setTerm(urlParamValue);
  }, [urlParamValue]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      navigate(`${searchPath}?${queryParamName}=${encodeURIComponent(term)}`);
    } else {
      navigate(searchPath);
    }
  };

  return (
    <form className={cn(styles.form, className)} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Cerca
      </button>
    </form>
  );
}
