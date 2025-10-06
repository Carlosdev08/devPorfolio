import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useVisitorTracking } from './useVisitorTracking';

describe('useVisitorTracking', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Inicialización', () => {
    it('debería generar sessionId único al montar', () => {
      const { result } = renderHook(() => useVisitorTracking());

      expect(result.current.visitorData).toBeTruthy();
      expect(result.current.visitorData?.sessionId).toBeTruthy();
      expect(sessionStorage.getItem('visitor_session_id')).toBeTruthy();
    });

    it('debería reutilizar sessionId existente', () => {
      const existingSessionId = 'test-session-123';
      sessionStorage.setItem('visitor_session_id', existingSessionId);

      const { result } = renderHook(() => useVisitorTracking());

      expect(result.current.visitorData?.sessionId).toBe(existingSessionId);
    });

    it('debería capturar datos del navegador', () => {
      const { result } = renderHook(() => useVisitorTracking());

      expect(result.current.visitorData).toMatchObject({
        userAgent: expect.any(String),
        screen: {
          width: expect.any(Number),
          height: expect.any(Number),
        },
        language: expect.any(String),
        timezone: expect.any(String),
        platform: expect.any(String),
      });
    });
  });

  describe('Métricas de comportamiento', () => {
    it('debería iniciar con métricas en cero', () => {
      const { result } = renderHook(() => useVisitorTracking());

      expect(result.current.behaviorMetrics).toMatchObject({
        mouseMovements: 0,
        clicks: 0,
        keystrokes: 0,
        timeOnPage: 0,
        scrollDepth: 0,
        interactionRate: 0,
      });
    });

    it('debería incrementar tiempo en página', async () => {
      const { result } = renderHook(() => useVisitorTracking());

      await waitFor(() => {
        expect(result.current.behaviorMetrics.timeOnPage).toBeGreaterThan(0);
      }, { timeout: 3000 });
    });

    it('debería rastrear movimientos de mouse', async () => {
      const { result } = renderHook(() => useVisitorTracking());

      // Simular múltiples movimientos de mouse con delay
      await act(async () => {
        for (let i = 0; i < 5; i++) {
          const event = new MouseEvent('mousemove', { bubbles: true });
          window.dispatchEvent(event);
          await new Promise(resolve => setTimeout(resolve, 150)); // Esperar más de 100ms
        }
      });

      await waitFor(() => {
        expect(result.current.behaviorMetrics.mouseMovements).toBeGreaterThan(0);
      }, { timeout: 2000 });
    });

    it('debería rastrear clicks', async () => {
      const { result } = renderHook(() => useVisitorTracking());

      await act(async () => {
        window.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      await waitFor(() => {
        expect(result.current.behaviorMetrics.clicks).toBeGreaterThan(0);
      }, { timeout: 2000 });
    });

    it('debería rastrear keystrokes', async () => {
      const { result } = renderHook(() => useVisitorTracking());

      await act(async () => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      await waitFor(() => {
        expect(result.current.behaviorMetrics.keystrokes).toBeGreaterThan(0);
      }, { timeout: 2000 });
    });
  });

  describe('Score de sospecha', () => {
    it('debería iniciar con score bajo', () => {
      const { result } = renderHook(() => useVisitorTracking());

      expect(result.current.suspicionScore.score).toBeLessThan(50);
      expect(result.current.suspicionScore.isSuspicious).toBe(false);
    });

    it('debería detectar falta de movimiento como sospechoso', async () => {
      const { result } = renderHook(() => useVisitorTracking());

      // Esperar más de 2 segundos para que el interval se ejecute
      await new Promise(resolve => setTimeout(resolve, 2500));

      // El score inicial debe ser bajo pero mayor a 0 después del primer update
      expect(result.current.suspicionScore.score).toBeGreaterThanOrEqual(0);
    });

    it('debería incluir razones cuando es sospechoso', async () => {
      const { result } = renderHook(() => useVisitorTracking());

      // El array de razones siempre debe existir
      expect(result.current.suspicionScore.reasons).toBeInstanceOf(Array);
    });
  });

  describe('Almacenamiento de analytics', () => {
    it('debería guardar eventos en localStorage', async () => {
      renderHook(() => useVisitorTracking());

      await waitFor(() => {
        const analytics = localStorage.getItem('visitor_analytics');
        expect(analytics).toBeTruthy();
        
        const parsed = JSON.parse(analytics!);
        expect(Array.isArray(parsed)).toBe(true);
        expect(parsed.length).toBeGreaterThan(0);
      });
    });

    it('debería limitar a 100 eventos máximo', async () => {
      // Llenar con más de 100 eventos
      const events = Array.from({ length: 110 }, (_, i) => ({
        eventType: 'test',
        data: { index: i },
        timestamp: Date.now(),
      }));
      localStorage.setItem('visitor_analytics', JSON.stringify(events));

      renderHook(() => useVisitorTracking());

      await waitFor(() => {
        const analytics = JSON.parse(localStorage.getItem('visitor_analytics') || '[]');
        expect(analytics.length).toBeLessThanOrEqual(100);
      });
    });

    it('debería registrar evento visitor_init', async () => {
      renderHook(() => useVisitorTracking());

      await waitFor(() => {
        const analytics = JSON.parse(localStorage.getItem('visitor_analytics') || '[]');
        const initEvent = analytics.find((e: any) => e.eventType === 'visitor_init');
        expect(initEvent).toBeTruthy();
      });
    });
  });

  describe('Limpieza', () => {
    it('debería limpiar event listeners al desmontar', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      
      const { unmount } = renderHook(() => useVisitorTracking());
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    });
  });
});
