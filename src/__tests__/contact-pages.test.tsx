
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "@/App";
import { Header } from "@/components/Header";
import ContactSection from "@/components/sections/Contact";

describe("navegación y páginas de contacto", () => {
  it("incluye un enlace de navegación para proyectos en mente", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const navLink = screen.getByRole("link", { name: /proyectos en mente/i });
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute("href", "/proyectos-en-mente");
  });

  it("renderiza la página dedicada a proyectos en mente en la ruta correspondiente", () => {
    window.history.pushState({}, "", "/proyectos-en-mente");
    render(<App />);

    expect(
      screen.getByRole("heading", { level: 1, name: /proyectos en mente/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /cuéntame sobre tu proyecto/i,
      }),
    ).toBeInTheDocument();
  });

  it("mantiene un formulario de contacto rápido en la sección de contacto del home", () => {
    render(
      <MemoryRouter>
        <ContactSection />
      </MemoryRouter>,
    );

    expect(screen.getByLabelText(/tu nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tu correo/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/(tu mensaje|mensaje)/i),
    ).toBeInTheDocument();

    // El formulario rápido no debe mostrar los campos específicos del formulario de proyectos.
    expect(screen.queryByLabelText(/tipo de servicio/i)).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/presupuesto/i)).not.toBeInTheDocument();
  });
});
