import { AlertCircle } from "lucide-react";
import cn from "@/shared/utils/cn";
import styles from "./alert.module.css";

type AlertType = "error";

const ICON_BY_TYPE: Record<AlertType, typeof AlertCircle> = {
  error: AlertCircle,
};

type AlertProps = {
  type: AlertType;
  message: string;
};

export default function Alert({ type, message }: AlertProps) {
  const Icon = ICON_BY_TYPE[type];

  return (
    <div className={cn(styles.alert, styles[type])} role="alert">
      <Icon size={18} />
      <p>{message}</p>
    </div>
  );
}
