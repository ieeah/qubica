import logo from "@/assets/Q-store.svg";

import type { HeaderLogoProps } from "@/shared/components/layout/header/types/HeaderLogo.type";
import { Link } from "react-router-dom";

export default function HeaderLogo({ width, height }: HeaderLogoProps) {
  return (
    <Link to="/">
      <img src={logo} width={width} height={height} alt="Q-store logo" />
    </Link>
  );
}
