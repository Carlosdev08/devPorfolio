import { useState, useEffect } from "react";
import bcrypt from "bcryptjs";

// 🔐 CONTRASEÑA HASHEADA CON BCRYPT
// Para cambiar la contraseña:
// 1. Edita el archivo: cambiar-password.js
// 2. Ejecuta: node cambiar-password.js
// 3. Copia el hash generado y pégalo aquí
const ADMIN_PASSWORD_HASH =
  "$2b$10$RJl4RouZNyq5dGfb7Ymr1ezbsMn2N9XuDxzBIRf.w3iELrPYTWusK";

const AUTH_TOKEN_KEY = "admin_auth_token";
const TOKEN_EXPIRY_KEY = "admin_token_expiry";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (token && expiry) {
      const expiryTime = parseInt(expiry);
      if (Date.now() < expiryTime) {
        setIsAuthenticated(true);
      } else {
        // Token expirado
        logout();
      }
    }
    setIsLoading(false);
  };

  const login = async (password: string): Promise<boolean> => {
    try {
      // Comparar password con el hash
      const isValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);

      if (isValid) {
        // Generar token de sesión
        const token = await generateSecureToken();
        const expiry = Date.now() + SESSION_DURATION;

        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(TOKEN_EXPIRY_KEY, expiry.toString());

        setIsAuthenticated(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};

// Generar token seguro
async function generateSecureToken(): Promise<string> {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

// 🛠️ UTILIDAD: Genera un hash para una nueva contraseña
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 10);
}
