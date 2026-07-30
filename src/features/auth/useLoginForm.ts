import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Inserisci il tuo username"),
  password: z.string().min(1, "Inserisci la tua password"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export default function useLoginForm() {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  return {
    register: form.register,
    handleSubmit: form.handleSubmit,
    setValue: form.setValue,
    errors: form.formState.errors,
    formState: form.formState,
  };
}
