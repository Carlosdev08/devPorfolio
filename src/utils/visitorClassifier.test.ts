import { describe, it, expect } from 'vitest';
import { classifyVisitor, type VisitorClassification } from './visitorClassifier';

describe('visitorClassifier', () => {
  describe('Detección de Recruiters', () => {
    it('debería detectar LinkedIn como recruiter', () => {
      const result = classifyVisitor({
        referrer: 'https://www.linkedin.com/jobs/',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/New_York',
      });

      expect(result.type).toBe('recruiter');
      expect(result.source).toBe('LinkedIn');
      expect(result.isVIP).toBe(true);
      expect(result.badge).toBe('💼');
    });

    it('debería detectar Indeed como recruiter', () => {
      const result = classifyVisitor({
        referrer: 'https://www.indeed.com/viewjob',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/Los_Angeles',
      });

      expect(result.type).toBe('recruiter');
      expect(result.source).toBe('Indeed');
      expect(result.isVIP).toBe(true);
    });

    it('debería detectar Glassdoor como recruiter', () => {
      const result = classifyVisitor({
        referrer: 'https://www.glassdoor.com/Job/',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Europe/London',
      });

      expect(result.type).toBe('recruiter');
      expect(result.source).toBe('Glassdoor');
      expect(result.isVIP).toBe(true);
    });
  });

  describe('Detección de Developers', () => {
    it('debería detectar GitHub como developer', () => {
      const result = classifyVisitor({
        referrer: 'https://github.com/username/repo',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Europe/Berlin',
      });

      expect(result.type).toBe('developer');
      expect(result.source).toBe('GitHub');
      expect(result.isVIP).toBe(true);
      expect(result.badge).toBe('👨‍💻');
    });

    it('debería detectar Stack Overflow como developer', () => {
      const result = classifyVisitor({
        referrer: 'https://stackoverflow.com/users/123456',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Asia/Tokyo',
      });

      expect(result.type).toBe('developer');
      expect(result.source).toBe('Stack Overflow');
      expect(result.isVIP).toBe(true);
    });

    it('debería detectar Dev.to como developer', () => {
      const result = classifyVisitor({
        referrer: 'https://dev.to/article/something',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/Sao_Paulo',
      });

      expect(result.type).toBe('developer');
      expect(result.source).toBe('Dev.to');
      expect(result.isVIP).toBe(true);
    });
  });

  describe('Detección de Redes Sociales', () => {
    it('debería detectar Twitter/X', () => {
      const result = classifyVisitor({
        referrer: 'https://x.com/username/status/123',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Europe/Madrid',
      });

      expect(result.type).toBe('social');
      expect(result.source).toBe('Twitter/X');
      expect(result.isVIP).toBe(false);
      expect(result.badge).toBe('🐦');
    });

    it('debería detectar Facebook', () => {
      const result = classifyVisitor({
        referrer: 'https://www.facebook.com/groups/developers',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/New_York',
      });

      expect(result.type).toBe('social');
      expect(result.source).toBe('Facebook');
    });

    it('debería detectar Reddit', () => {
      const result = classifyVisitor({
        referrer: 'https://www.reddit.com/r/webdev/comments/',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/Chicago',
      });

      expect(result.type).toBe('social');
      expect(result.source).toBe('Reddit');
    });
  });

  describe('Tráfico Directo', () => {
    it('debería marcar referrer vacío como directo', () => {
      const result = classifyVisitor({
        referrer: '',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Europe/Paris',
      });

      expect(result.type).toBe('direct');
      expect(result.source).toBe('Direct');
      expect(result.isVIP).toBe(false);
      expect(result.badge).toBe('🔗');
    });
  });

  describe('Búsqueda Orgánica', () => {
    it('debería detectar Google', () => {
      const result = classifyVisitor({
        referrer: 'https://www.google.com/search?q=developer+portfolio',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/New_York',
      });

      expect(result.type).toBe('search');
      expect(result.source).toBe('Google');
      expect(result.badge).toBe('🔍');
    });

    it('debería detectar Bing', () => {
      const result = classifyVisitor({
        referrer: 'https://www.bing.com/search?q=fullstack+developer',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Europe/London',
      });

      expect(result.type).toBe('search');
      expect(result.source).toBe('Bing');
    });
  });

  describe('Otros casos', () => {
    it('debería clasificar dominios desconocidos como other', () => {
      const result = classifyVisitor({
        referrer: 'https://unknown-site.com/page',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Asia/Shanghai',
      });

      expect(result.type).toBe('other');
      expect(result.source).toBe('unknown-site.com');
      expect(result.isVIP).toBe(false);
      expect(result.badge).toBe('🌐');
    });

    it('debería manejar URLs malformadas', () => {
      const result = classifyVisitor({
        referrer: 'not-a-valid-url',
        userAgent: 'Mozilla/5.0...',
        timezone: 'UTC',
      });

      expect(result.type).toBe('other');
      expect(result.source).toBe('Unknown');
    });
  });

  describe('Detalles adicionales', () => {
    it('debería incluir descripción para recruiters', () => {
      const result = classifyVisitor({
        referrer: 'https://www.linkedin.com/jobs/',
        userAgent: 'Mozilla/5.0...',
        timezone: 'America/New_York',
      });

      expect(result.description).toContain('recruiter');
      expect(result.description).toContain('LinkedIn');
    });

    it('debería incluir información de timezone', () => {
      const result = classifyVisitor({
        referrer: 'https://github.com/',
        userAgent: 'Mozilla/5.0...',
        timezone: 'Europe/Madrid',
      });

      expect(result.timezone).toBe('Europe/Madrid');
    });
  });
});
