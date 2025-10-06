import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAdminAuth } from "./useAdminAuth";

describe("useAdminAuth", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe("Autenticación inicial", () => {
    it("debería iniciar sin autenticar", () => {
      const { result } = renderHook(() => useAdminAuth());

      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it("debería verificar token existente válido al montar", async () => {
      // Simular token válido existente
      const futureExpiry = Date.now() + 1000000;
      localStorage.setItem("admin_auth_token", "test-token");
      localStorage.setItem("admin_token_expiry", futureExpiry.toString());

      const { result } = renderHook(() => useAdminAuth());

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });
    });

    it("debería rechazar token expirado", async () => {
      // Simular token expirado
      const pastExpiry = Date.now() - 1000;
      localStorage.setItem("admin_auth_token", "expired-token");
      localStorage.setItem("admin_token_expiry", pastExpiry.toString());

      const { result } = renderHook(() => useAdminAuth());

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
      });

      // Verificar que se limpiaron los tokens
      expect(localStorage.getItem("admin_auth_token")).toBeNull();
      expect(localStorage.getItem("admin_token_expiry")).toBeNull();
    });
  });

  describe("Login", () => {
    it("debería permitir login con contraseña correcta", async () => {
      const { result } = renderHook(() => useAdminAuth());

      let loginSuccess = false;
      await act(async () => {
        loginSuccess = await result.current.login("%Ww4Hk8SfaydVYd");
      });

      expect(loginSuccess).toBe(true);
      expect(result.current.isAuthenticated).toBe(true);

      // Verificar que se guardaron tokens
      expect(localStorage.getItem("admin_auth_token")).toBeTruthy();
      expect(localStorage.getItem("admin_token_expiry")).toBeTruthy();
    });

    it("debería rechazar contraseña incorrecta", async () => {
      const { result } = renderHook(() => useAdminAuth());

      let loginSuccess = false;
      await act(async () => {
        loginSuccess = await result.current.login("contraseña_incorrecta");
      });

      expect(loginSuccess).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);

      // No debería guardar tokens
      expect(localStorage.getItem("admin_auth_token")).toBeNull();
    });

    it("debería generar token único en cada login", async () => {
      const { result: result1 } = renderHook(() => useAdminAuth());

      await act(async () => {
        await result1.current.login("%Ww4Hk8SfaydVYd");
      });
      const token1 = localStorage.getItem("admin_auth_token");

      localStorage.clear();

      const { result: result2 } = renderHook(() => useAdminAuth());

      await act(async () => {
        await result2.current.login("%Ww4Hk8SfaydVYd");
      });
      const token2 = localStorage.getItem("admin_auth_token");

      expect(token1).not.toBe(token2);
    });
  });

  describe("Logout", () => {
    it("debería cerrar sesión correctamente", async () => {
      const { result } = renderHook(() => useAdminAuth());

      // Login primero
      await act(async () => {
        await result.current.login("%Ww4Hk8SfaydVYd");
      });

      expect(result.current.isAuthenticated).toBe(true);

      // Logout
      act(() => {
        result.current.logout();
      });

      expect(result.current.isAuthenticated).toBe(false);
      expect(localStorage.getItem("admin_auth_token")).toBeNull();
      expect(localStorage.getItem("admin_token_expiry")).toBeNull();
    });
  });

  describe("Seguridad", () => {
    it("debería tener tokens con longitud segura (>= 64 chars)", async () => {
      const { result } = renderHook(() => useAdminAuth());

      await act(async () => {
        await result.current.login("%Ww4Hk8SfaydVYd");
      });

      const token = localStorage.getItem("admin_auth_token");
      expect(token).toBeTruthy();
      expect(token!.length).toBeGreaterThanOrEqual(64);
    });

    it("debería establecer expiración de 24 horas", async () => {
      const { result } = renderHook(() => useAdminAuth());
      const beforeLogin = Date.now();

      await act(async () => {
        await result.current.login("%Ww4Hk8SfaydVYd");
      });

      const expiry = parseInt(localStorage.getItem("admin_token_expiry")!);
      const expectedExpiry = beforeLogin + 24 * 60 * 60 * 1000;

      // Permitir margen de error de 1 segundo
      expect(expiry).toBeGreaterThanOrEqual(expectedExpiry - 1000);
      expect(expiry).toBeLessThanOrEqual(expectedExpiry + 1000);
    });

    it("no debería exponer la contraseña en ningún momento", async () => {
      const { result } = renderHook(() => useAdminAuth());

      await act(async () => {
        await result.current.login("%Ww4Hk8SfaydVYd");
      });

      // Verificar que no hay referencias a la contraseña en localStorage
      const allStorageValues = Object.values(localStorage);
      allStorageValues.forEach((value) => {
        expect(value).not.toContain("%Ww4Hk8SfaydVYd");
      });
    });
  });
});
