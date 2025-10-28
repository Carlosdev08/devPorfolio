/**
 * Sistema de logging profesional
 * - En desarrollo: muestra todos los logs
 * - En producción: silencioso (o envía a servicio de monitoreo)
 */

const isDev = import.meta.env.DEV;

export const logger = {
  log: (...args: any[]) => {
    if (isDev) console.log(...args);
  },
  
  info: (message: string, data?: any) => {
    if (isDev) console.log(`ℹ️ ${message}`, data);
  },
  
  success: (message: string, data?: any) => {
    if (isDev) console.log(`✅ ${message}`, data);
  },
  
  error: (message: string, error?: any) => {
    if (isDev) console.error(`❌ ${message}`, error);
    // En producción podrías enviar a Sentry, LogRocket, etc.
  },
  
  warn: (message: string, data?: any) => {
    if (isDev) console.warn(`⚠️ ${message}`, data);
  },
  
  debug: (label: string, data: any) => {
    if (isDev) {
      console.groupCollapsed(`🔍 ${label}`);
      console.log(data);
      console.groupEnd();
    }
  },

  // Para casos críticos que SÍ quieres ver en producción
  critical: (message: string, data?: any) => {
    console.error(`🚨 CRITICAL: ${message}`, data);
    // Aquí enviarías a tu servicio de monitoreo
  }
};
