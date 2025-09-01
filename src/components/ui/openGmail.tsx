import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/enhanced-button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Mail, Copy, ExternalLink } from "lucide-react";

const EMAIL = "contacto@carlosjose.dev";
const SUBJECT = encodeURIComponent("Solicitud CV");
const BODY = encodeURIComponent(
  "Hola Carlos, me gustaría recibir tu currículum completo."
);

export function SolicitarCVButton() {
  const { toast } = useToast();

  const openGmail = () => {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${SUBJECT}&body=${BODY}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openOutlookWeb = () => {
    window.open(
      `https://outlook.live.com/mail/deeplink/compose?to=${EMAIL}&subject=${SUBJECT}&body=${BODY}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const openMailto = () => {
    window.location.href = `mailto:${EMAIL}?subject=${SUBJECT}&body=${BODY}`;
  };

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    toast({ title: "Email copiado", description: EMAIL });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="focus-ring">
          <Mail className="h-4 w-4 mr-2" />
          Solicitar CV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Enviar con</DropdownMenuLabel>
        <DropdownMenuItem onClick={openGmail}>
          <ExternalLink className="h-4 w-4 mr-2" /> Gmail (web)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openOutlookWeb}>
          <ExternalLink className="h-4 w-4 mr-2" /> Outlook (web)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={openMailto}>
          <Mail className="h-4 w-4 mr-2" /> Cliente del sistema (mailto)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyEmail}>
          <Copy className="h-4 w-4 mr-2" /> Copiar {EMAIL}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
