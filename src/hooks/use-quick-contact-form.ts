import { useState } from "react";
import { logger } from "@/utils/logger";

interface QuickContactFormData {
  name: string;
  email: string;
  message: string;
  botField: string;
  privacyAccepted: boolean;
}

interface UseQuickContactFormOptions {
  endpoint: string;
  onSuccess?: () => void;
  onError?: (reason?: string) => void;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export function useQuickContactForm({
  endpoint,
  onSuccess,
  onError,
}: UseQuickContactFormOptions) {
  const [data, setData] = useState<QuickContactFormData>({
    name: "",
    email: "",
    message: "",
    botField: "",
    privacyAccepted: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, type } = event.target;
    const value =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
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
    // Honeypot check
    if (data.botField.trim().length > 0) {
      logger.warn("Bot detectado - honeypot activado", { botField: data.botField });
      return;
    }
    
    if (!valid) {
      onError?.("Por favor completa todos los campos requeridos");
      return;
    }

    try {
      setSubmitting(true);
      
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
        privacyAccepted: data.privacyAccepted,
        _subject: `Nuevo mensaje general de ${data.name}`,
        _language: "es",
        intent: "general-contact",
        consentAt: new Date().toISOString(),
      };
      
      logger.info("📤 Enviando mensaje rápido", payload);
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      logger.info("📥 Respuesta", { status: response.status, statusText: response.statusText });

      if (response.ok) {
        logger.success("Mensaje enviado correctamente");
        onSuccess?.();
        reset();
      } else {
        const json = await response.json().catch(() => ({}));
        logger.error("Error del servidor", json);
        const reason = json?.errors?.map((err: any) => err.message).join(", ");
        onError?.(reason || "No se pudo enviar el mensaje.");
      }
    } catch (error) {
      logger.error("Error de red", error);
      onError?.("Error de red");
    } finally {
      setSubmitting(false);
    }
  };

  return { data, handleChange, valid, submitting, submit };
}
