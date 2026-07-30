import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "@/shared/hooks/useAuth";
import useLoginForm, { type LoginFormValues } from "./useLoginForm";
import cn from "@/shared/utils/cn";
import styles from "./loginpage.module.css";

export default function LoginPage() {
  const { isLogged, login, isLoading, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { register, handleSubmit, setValue, errors } = useLoginForm();

  const fillTestCredentials = () => {
    setValue("username", "mor_2314", { shouldValidate: true });
    setValue("password", "83r5^_", { shouldValidate: true });
  };

  if (isLogged) {
    const redirectTo =
      (location.state as { from?: string } | null)?.from ?? "/";
    return <Navigate to={redirectTo} replace />;
  }

  const onSubmit = async (values: LoginFormValues) => {
    const [err] = await login(values);
    if (!err) {
      const redirectTo =
        (location.state as { from?: string } | null)?.from ?? "/";
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <main className={cn("container", styles.page)}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <h1 className={styles.title}>Accedi</h1>

        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? "username-error" : undefined}
            {...register("username")}
          />
          {errors.username && (
            <span id="username-error" className={styles.error} role="alert">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            {...register("password")}
          />
          {errors.password && (
            <span id="password-error" className={styles.error} role="alert">
              {errors.password.message}
            </span>
          )}
        </div>

        {error && (
          <p className={styles.apiError} role="alert">
            Credenziali non valide. Riprova.
          </p>
        )}

        <button type="submit" className="btn-primary" disabled={isLoading}>
          {isLoading ? "Accesso in corso..." : "Accedi"}
        </button>

        <p className={styles.hint}>
          <button
            type="button"
            className={styles.hintButton}
            onClick={fillTestCredentials}
          >
            Compila automaticamente
          </button>
        </p>
      </form>
    </main>
  );
}
