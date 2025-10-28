import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PrivacyPolicy } from './PrivacyPolicy';

describe('PrivacyPolicy', () => {
  it('should render the main title', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByRole('heading', { name: /política de privacidad/i })).toBeInTheDocument();
  });

  it('should display the last updated date', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/última actualización/i)).toBeInTheDocument();
  });

  it('should render all main sections', () => {
    render(<PrivacyPolicy />);
    
    // Secciones principales esperadas
    expect(screen.getByRole('heading', { name: /responsable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /datos.*recopilamos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /finalidad/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /legitimación/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /conservación/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /derechos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cookies/i })).toBeInTheDocument();
  });

  it('should display contact information for the data controller', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/Carlos José/i)).toBeInTheDocument();
  });

  it('should list the types of data collected', () => {
    render(<PrivacyPolicy />);
    
    // Datos que se recopilan - usar getAllByText porque aparecen múltiples veces
    expect(screen.getAllByText(/nombre/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getAllByText(/mensaje/i).length).toBeGreaterThan(0);
  });

  it('should explain user rights (ARCO)', () => {
    render(<PrivacyPolicy />);
    
    // Derechos ARCO - verificar que existen
    expect(screen.getAllByText(/acceso/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/rectificación/i)).toBeInTheDocument();
    expect(screen.getByText(/cancelación/i)).toBeInTheDocument();
    expect(screen.getByText(/oposición/i)).toBeInTheDocument();
  });

  it('should mention analytics and cookies usage', () => {
    render(<PrivacyPolicy />);
    expect(screen.getAllByText(/analíticas/i).length).toBeGreaterThan(0);
  });

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<PrivacyPolicy />);
    
    // Debe tener una estructura semántica
    const article = container.querySelector('article');
    expect(article).toBeInTheDocument();
  });

  it('should be accessible with proper heading hierarchy', () => {
    const { container } = render(<PrivacyPolicy />);
    
    // Debe haber un h1 principal
    const h1 = container.querySelector('h1');
    expect(h1).toBeInTheDocument();
    
    // Debe haber h2 para las secciones
    const h2Elements = container.querySelectorAll('h2');
    expect(h2Elements.length).toBeGreaterThan(0);
  });

  it('should display information about data retention', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/conservaremos/i)).toBeInTheDocument();
  });

  it('should explain the legal basis for processing', () => {
    render(<PrivacyPolicy />);
    expect(screen.getByText(/consentimiento/i)).toBeInTheDocument();
  });

  it('should provide information about third-party services', () => {
    render(<PrivacyPolicy />);
    // Formspree es el servicio de terceros que usamos
    expect(screen.getAllByText(/formspree/i).length).toBeGreaterThan(0);
  });

  it('should include contact method for exercising rights', () => {
    render(<PrivacyPolicy />);
    // Debe haber un email de contacto - aparece múltiples veces
    expect(screen.getAllByText(/contact@/i).length).toBeGreaterThan(0);
  });
});
