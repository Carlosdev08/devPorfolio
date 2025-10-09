import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('should render brand section correctly', () => {
    render(<Footer />);
    
    expect(screen.getByText('CarlosDev')).toBeInTheDocument();
    expect(screen.getByText(/Desarrollador Full Stack & Pentester Web/i)).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Navegación')).toBeInTheDocument();
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Sobre mí')).toBeInTheDocument();
    expect(screen.getByText('Habilidades')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
  });

  it('should render useful resources section', () => {
    render(<Footer />);
    
    // Nueva sección de recursos útiles
    expect(screen.getByText('Recursos Útiles')).toBeInTheDocument();
    expect(screen.getByText('Documentación')).toBeInTheDocument();
    expect(screen.getByText('Herramientas')).toBeInTheDocument();
    expect(screen.getByText('Templates')).toBeInTheDocument();
    expect(screen.getByText('Cheat Sheets')).toBeInTheDocument();
    expect(screen.getByText('TDD Guide')).toBeInTheDocument();
    expect(screen.getByText('Testing Tools')).toBeInTheDocument();
  });

  it('should render contact section', () => {
    render(<Footer />);
    
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Experiencia')).toBeInTheDocument();
    expect(screen.getByText('Contactar')).toBeInTheDocument();
  });

  it('should render social media links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Sígueme:')).toBeInTheDocument();
    expect(screen.getByLabelText('Seguir en GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('Seguir en LinkedIn')).toBeInTheDocument();
  });

  it('should render copyright and source code link', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} Carlos José. Todos los derechos reservados`)).toBeInTheDocument();
    expect(screen.getByText('Ver código')).toBeInTheDocument();
  });
});