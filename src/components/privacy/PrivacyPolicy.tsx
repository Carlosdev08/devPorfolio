import { Shield, Mail, Clock, Lock, Eye, FileText, Cookie } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      {/* Header */}
      <header className="space-y-4 border-b border-border pb-8">
        <h1 className="font-heading text-4xl font-bold text-foreground flex items-center gap-3">
          <Shield className="h-10 w-10 text-primary" />
          Política de Privacidad
        </h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>Última actualización: Octubre 2025</span>
        </p>
        <p className="text-foreground leading-relaxed">
          En cumplimiento con el Reglamento General de Protección de Datos (RGPD) y la Ley
          Orgánica de Protección de Datos (LOPD), te informamos sobre cómo tratamos tus datos
          personales.
        </p>
      </header>

      {/* Sección: Responsable */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          Responsable del Tratamiento
        </h2>
        <div className="bg-card border border-border rounded-lg p-6 space-y-2">
          <p className="text-foreground">
            <strong>Identidad:</strong> Carlos José
          </p>
          <p className="text-foreground flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <strong>Contacto:</strong>{' '}
            <a href="mailto:contact@carlosjose.dev" className="text-primary hover:underline">
              contact@carlosjose.dev
            </a>
          </p>
        </div>
      </section>

      {/* Sección: Datos recopilados */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <Eye className="h-6 w-6 text-primary" />
          ¿Qué Datos Recopilamos?
        </h2>
        <div className="space-y-3">
          <p className="text-foreground">
            Cuando utilizas el formulario de contacto, recopilamos la siguiente información:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
            <li>
              <strong>Nombre:</strong> Para personalizar nuestra comunicación contigo.
            </li>
            <li>
              <strong>Correo electrónico:</strong> Para poder responderte.
            </li>
            <li>
              <strong>Mensaje:</strong> El contenido de tu consulta o comentario.
            </li>
            <li>
              <strong>Datos de navegación:</strong> Información analítica anónima sobre tu visita
              (páginas visitadas, tiempo de permanencia, dispositivo usado).
            </li>
          </ul>
        </div>
      </section>

      {/* Sección: Finalidad */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <Lock className="h-6 w-6 text-primary" />
          Finalidad del Tratamiento
        </h2>
        <div className="space-y-3">
          <p className="text-foreground">Utilizamos tus datos para:</p>
          <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
            <li>Responder a tus consultas y mensajes.</li>
            <li>Mejorar la experiencia de usuario en el portfolio.</li>
            <li>Realizar análisis estadísticos anónimos sobre el tráfico web.</li>
            <li>Identificar visitantes relevantes (recruiters, developers, etc.).</li>
          </ul>
        </div>
      </section>

      {/* Sección: Legitimación */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Legitimación
        </h2>
        <p className="text-foreground">
          La base legal para el tratamiento de tus datos es tu{' '}
          <strong>consentimiento explícito</strong>, otorgado al aceptar esta política de
          privacidad al enviar el formulario de contacto.
        </p>
      </section>

      {/* Sección: Conservación */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Conservación de Datos
        </h2>
        <p className="text-foreground">
          Conservaremos tus datos personales durante el tiempo necesario para cumplir con la
          finalidad para la que fueron recopilados. Los datos de contacto se mantendrán hasta que
          solicites su eliminación. Los datos analíticos son anónimos y se conservan
          indefinidamente con fines estadísticos.
        </p>
      </section>

      {/* Sección: Derechos */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Tus Derechos (ARCO)
        </h2>
        <div className="space-y-3">
          <p className="text-foreground">
            Tienes derecho a ejercer los siguientes derechos en cualquier momento:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
            <li>
              <strong>Acceso:</strong> Conocer qué datos tenemos sobre ti.
            </li>
            <li>
              <strong>Rectificación:</strong> Corregir datos inexactos o incompletos.
            </li>
            <li>
              <strong>Cancelación:</strong> Solicitar la eliminación de tus datos.
            </li>
            <li>
              <strong>Oposición:</strong> Oponerte al tratamiento de tus datos.
            </li>
            <li>
              <strong>Portabilidad:</strong> Recibir tus datos en formato estructurado.
            </li>
            <li>
              <strong>Limitación:</strong> Solicitar la limitación del tratamiento.
            </li>
          </ul>
          <p className="text-foreground mt-4">
            Para ejercer estos derechos, envía un email a{' '}
            <a href="mailto:contact@carlosjose.dev" className="text-primary hover:underline">
              contact@carlosjose.dev
            </a>
            .
          </p>
        </div>
      </section>

      {/* Sección: Terceros */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Servicios de Terceros
        </h2>
        <div className="space-y-3">
          <p className="text-foreground">
            Utilizamos los siguientes servicios de terceros que pueden procesar tus datos:
          </p>
          <div className="bg-card border border-border rounded-lg p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Formspree</h3>
              <p className="text-muted-foreground text-sm">
                Servicio de gestión de formularios. Los datos enviados a través del formulario de
                contacto son procesados por Formspree.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Sistema Propio de Analytics</h3>
              <p className="text-muted-foreground text-sm">
                Recopilamos datos de navegación anónimos para análisis estadísticos internos, sin
                usar herramientas de terceros como Google Analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Cookies */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground flex items-center gap-2">
          <Cookie className="h-6 w-6 text-primary" />
          Cookies y Tecnologías Similares
        </h2>
        <div className="space-y-3">
          <p className="text-foreground">
            Este sitio web utiliza cookies analíticas propias para:
          </p>
          <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
            <li>Registrar visitas y comportamiento de navegación.</li>
            <li>Identificar tipos de visitantes (recruiters, developers, etc.).</li>
            <li>Detectar bots y tráfico automatizado.</li>
            <li>Mejorar la experiencia del usuario.</li>
          </ul>
          <p className="text-foreground mt-4">
            Estas cookies son técnicas y analíticas, no se comparten con terceros, y no se usan
            para publicidad.
          </p>
        </div>
      </section>

      {/* Sección: Seguridad */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Seguridad de los Datos
        </h2>
        <p className="text-foreground">
          Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos contra
          acceso no autorizado, pérdida, destrucción o alteración. El acceso al panel de analytics
          está protegido mediante autenticación segura con contraseñas hasheadas.
        </p>
      </section>

      {/* Sección: Cambios */}
      <section className="space-y-4">
        <h2 className="font-heading text-2xl font-semibold text-foreground">
          Cambios en la Política
        </h2>
        <p className="text-foreground">
          Nos reservamos el derecho de modificar esta política en cualquier momento. Los cambios
          serán notificados mediante la actualización de la fecha en la parte superior de este
          documento.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-8 mt-12">
        <p className="text-muted-foreground text-sm text-center">
          Si tienes dudas sobre esta política, contáctame en{' '}
          <a href="mailto:contact@carlosjose.dev" className="text-primary hover:underline">
            contact@carlosjose.dev
          </a>
        </p>
      </footer>
    </article>
  );
}
