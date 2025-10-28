import { useState } from "react";
import { logger } from "@/utils/logger";

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  serviceType: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  technologies: string[];
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
    company: "",
    phone: "",
    serviceType: "",
    budget: "",
    timeline: "",
    projectDescription: "",
    technologies: [],
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
    data.serviceType.length > 0 &&
    data.budget.length > 0 &&
    data.timeline.length > 0 &&
    data.projectDescription.trim().length >= 20 &&
    data.privacyAccepted;

  const reset = () =>
    setData({
      name: "",
      email: "",
      company: "",
      phone: "",
      serviceType: "",
      budget: "",
      timeline: "",
      projectDescription: "",
      technologies: [],
      botField: "",
      privacyAccepted: false,
    });

  const submit = async (overrideTechs?: string[]) => {
    // Honeypot check
    if (data.botField.trim().length > 0) {
      logger.warn("Bot detectado - honeypot activado", { botField: data.botField });
      return;
    }
    
    if (!valid) {
      onError?.("Formulario inválido. Completa todos los campos requeridos.");
      return;
    }

    try {
      setSubmitting(true);
      const techsToSend = overrideTechs || data.technologies;
      
      const payload = {
        name: data.name.trim(),
        email: data.email.trim(),
        company: data.company.trim() || "No especificada",
        phone: data.phone.trim() || "No especificado",
        serviceType: data.serviceType,
        budget: data.budget,
        timeline: data.timeline,
        projectDescription: data.projectDescription.trim(),
        technologies: techsToSend.length > 0 ? techsToSend.join(", ") : "No especificadas",
        privacyAccepted: data.privacyAccepted,
        _subject: `Nuevo proyecto: ${data.serviceType} - ${data.name}`,
        _language: "es",
        consentAt: new Date().toISOString(),
      };
      
      logger.info("📤 Enviando formulario", payload);
      
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      logger.info("📥 Respuesta", { status: res.status, statusText: res.statusText });
      
      if (res.ok) {
        logger.success("Formulario enviado correctamente");
        onSuccess?.();
        reset();
      } else {
        const json = await res.json().catch(() => ({}));
        logger.error("Error del servidor", json);
        const reason = json?.errors?.map((e: any) => e.message).join(", ");
        onError?.(reason || "No se pudo enviar el mensaje.");
      }
    } catch (err) {
      logger.error("Error al enviar formulario", err);
      onError?.("Error de red. Verifica tu conexión.");
    } finally {
      setSubmitting(false);
    }
  };

  const setTechnologies = (techs: string[]) => {
    setData(prev => ({ ...prev, technologies: techs }));
  };

  return { data, handleChange, valid, submitting, submit, setTechnologies };
}
