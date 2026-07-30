import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useCartContext } from "@/shared/context/CartContext";
import useCheckoutForm, { type CheckoutFormValues } from "./useCheckoutForm";
import Modal from "@/shared/components/ui/Modal/Modal";
import styles from "./checkoutpage.module.css";
import cn from "@/shared/utils/cn";

export default function CheckoutPage() {
  const { state, clearCart } = useCartContext();
  const navigate = useNavigate();
  const { register, handleSubmit, errors, formState } = useCheckoutForm();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (state.items.length === 0 && !isSuccess) {
      navigate("/cart", { replace: true });
    }
  }, [state.items.length, isSuccess, navigate]);

  const userLocale =
    typeof navigator !== "undefined" ? navigator.language : "it-IT";
  const formattedTotal = new Intl.NumberFormat(userLocale, {
    style: "currency",
    currency: "EUR",
  }).format(state.totalPrice);

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsProcessing(true);
    // Simulazione di una chiamata API di checkout con delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Ordine inviato:", values, state.items);

    const finalizeOrder = () => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    };

    if (document.startViewTransition) {
      document.startViewTransition(() => {
        finalizeOrder();
      });
    } else {
      finalizeOrder();
    }
  };

  const handleFinish = () => {
    setIsSuccess(false);
    navigate("/");
  };

  if (state.items.length === 0 && !isSuccess) {
    return null; // Verrà reindirizzato dall'useEffect
  }

  return (
    <main className="container py-4">
      <h1 className="mb-4">Checkout</h1>

      <div className={styles.layout}>
        <div className={styles.formContainer}>
          <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <h2>Dati di Spedizione</h2>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="firstName">Nome</label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  aria-describedby={
                    errors.firstName ? "firstName-error" : undefined
                  }
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <span
                    id="firstName-error"
                    className={styles.error}
                    role="alert"
                  >
                    {errors.firstName.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Cognome</label>
                <input
                  id="lastName"
                  type="text"
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  aria-describedby={
                    errors.lastName ? "lastName-error" : undefined
                  }
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <span
                    id="lastName-error"
                    className={styles.error}
                    role="alert"
                  >
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="address">Indirizzo</label>
              <input
                id="address"
                type="text"
                autoComplete="street-address"
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? "address-error" : undefined}
                {...register("address")}
              />
              {errors.address && (
                <span id="address-error" className={styles.error} role="alert">
                  {errors.address.message}
                </span>
              )}
            </div>

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="city">Città</label>
                <input
                  id="city"
                  type="text"
                  autoComplete="address-level2"
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "city-error" : undefined}
                  {...register("city")}
                />
                {errors.city && (
                  <span id="city-error" className={styles.error} role="alert">
                    {errors.city.message}
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label htmlFor="zipCode">CAP</label>
                <input
                  id="zipCode"
                  type="text"
                  autoComplete="postal-code"
                  aria-invalid={!!errors.zipCode}
                  aria-describedby={
                    errors.zipCode ? "zipCode-error" : undefined
                  }
                  {...register("zipCode")}
                />
                {errors.zipCode && (
                  <span
                    id="zipCode-error"
                    className={styles.error}
                    role="alert"
                  >
                    {errors.zipCode.message}
                  </span>
                )}
              </div>
            </div>

            <h2 className={styles.paymentTitle}>Metodo di Pagamento</h2>
            <div className={styles.field}>
              <select
                id="paymentMethod"
                aria-invalid={!!errors.paymentMethod}
                aria-describedby={
                  errors.paymentMethod ? "paymentMethod-error" : undefined
                }
                {...register("paymentMethod")}
              >
                <option value="card">Carta di Credito</option>
                <option value="paypal">PayPal</option>
                <option value="transfer">Bonifico Bancario</option>
              </select>
              {errors.paymentMethod && (
                <span
                  id="paymentMethod-error"
                  className={styles.error}
                  role="alert"
                >
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={cn("btn-primary", styles.submitBtn)}
              disabled={formState.isSubmitting || isProcessing}
            >
              {formState.isSubmitting || isProcessing
                ? "Elaborazione..."
                : "Conferma Ordine"}
            </button>
          </form>
        </div>

        <div className={styles.summaryPanel}>
          <h2>Riepilogo Ordine</h2>
          <div className={styles.itemsList}>
            {state.items.map((item) => (
              <div key={item.id} className={styles.summaryItem}>
                <span className={styles.itemTitle}>
                  {item.quantity}x {item.title}
                </span>
                <span>
                  {new Intl.NumberFormat(userLocale, {
                    style: "currency",
                    currency: "EUR",
                  }).format(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <hr className={styles.divider} />
          <div className={styles.totalRow}>
            <span>Totale da Pagare</span>
            <output aria-label="Totale complessivo">
              <span className="visually-hidden">Totale da pagare: </span>
              {formattedTotal}
            </output>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isProcessing || isSuccess}
        onClose={isSuccess ? handleFinish : () => {}}
        title={isSuccess ? "Ordine Completato!" : "Elaborazione in corso"}
      >
        {isProcessing ? (
          <div className={styles.processingState}>
            <Loader2 className={styles.spinner} size={48} />
            <p className={styles.processingText}>
              Stiamo elaborando il tuo pagamento...
            </p>
          </div>
        ) : (
          <div className={styles.successState}>
            <div className={styles.successIconWrapper}>
              <CheckCircle2 size={48} className={styles.successIcon} />
            </div>
            <p className={styles.successText}>
              Grazie per il tuo acquisto. Il tuo ordine è stato processato con
              successo.
            </p>
            <div className={styles.modalActions} style={{ width: "100%" }}>
              <button
                type="button"
                className="btn-primary"
                onClick={handleFinish}
                style={{ width: "100%" }}
              >
                Torna alla Home
              </button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  );
}
