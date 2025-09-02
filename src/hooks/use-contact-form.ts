import { useState } from "react";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  botField: string; // honeypot
  privacyAccepted: boolean;
}

export interface UseContactFormOptions {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (reason?: string) => void;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

export function useContactForm({
  endpoint,
  onSuccess,
  onError,
}: UseContactFormOptions) {
  const [data, setData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
    botField: "",
    privacyAccepted: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setData((prev) => ({ ...prev, [name]: value as any }));
  };

  const valid =
    data.name.trim().length >= 2 &&
    isEmail(data.email) &&
    data.message.trim().length >= 10 &&
    data.privacyAccepted;

  const reset = () =>
    setData({
      name: "",
      email: "",
      message: "",
      botField: "",
      privacyAccepted: false,
    });

  const submit = async () => {
    if (data.botField) return; // bot
    if (!valid) {
      onError?.("Formulario inválido");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
          privacyAccepted: data.privacyAccepted,
          _subject: "Nuevo mensaje desde carlosjose.dev",
          _language: "es",
          consentAt: new Date().toISOString(),
        }),
      });
      const json = await res.json().catch(() => ({} as any));
      if (res.ok) {
        onSuccess?.();
        reset();
      } else {
        const reason = json?.errors?.map((e: any) => e.message).join(", ");
        onError?.(reason || "No se pudo enviar el mensaje.");
      }
    } catch {
      onError?.("Error de red");
    } finally {
      setSubmitting(false);
    }
  };

  return { data, handleChange, valid, submitting, submit };
}
