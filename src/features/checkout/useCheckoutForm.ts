import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "Il nome deve avere almeno 2 caratteri"),
  lastName: z.string().min(2, "Il cognome deve avere almeno 2 caratteri"),
  address: z.string().min(5, "Inserisci un indirizzo valido"),
  city: z.string().min(2, "Inserisci una città valida"),
  zipCode: z.string().regex(/^\d{5}$/, "Il CAP deve essere di 5 cifre"),
  paymentMethod: z.enum(["card", "paypal", "transfer"], {
    message: "Seleziona un metodo di pagamento"
  }),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function useCheckoutForm() {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "card",
    }
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    errors: form.formState.errors,
    formState: form.formState,
  };
}
