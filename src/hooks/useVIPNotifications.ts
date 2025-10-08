import { useState, useCallback, useEffect } from 'react';
import type { VisitorClassification } from '@/utils/visitorClassifier';

interface NotificationHistoryItem {
  source: string;
  type: string;
  timestamp: number;
  timezone: string;
}

const SPAM_PREVENTION_MS = 5 * 60 * 1000; // 5 minutos
const MAX_HISTORY = 50;

export const useVIPNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [enabled, setEnabled] = useState(true);
  const [notificationHistory, setNotificationHistory] = useState<NotificationHistoryItem[]>([]);

  // Verificar soporte al montar
  useEffect(() => {
    setIsSupported('Notification' in window);
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  // Solicitar permisos
  const requestPermission = useCallback(async () => {
    if (!isSupported) return;

    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, [isSupported]);

  // Verificar si ya se notificó recientemente (anti-spam)
  const wasRecentlyNotified = useCallback(
    (source: string, type: string): boolean => {
      const now = Date.now();
      return notificationHistory.some(
        (item) =>
          item.source === source &&
          item.type === type &&
          now - item.timestamp < SPAM_PREVENTION_MS
      );
    },
    [notificationHistory]
  );

  // Notificar VIP
  const notifyVIPVisit = useCallback(
    (classification: Partial<VisitorClassification>) => {
      // Verificar si es VIP
      const isVIP = classification.type === 'recruiter' || classification.type === 'developer';
      if (!isVIP) return;

      // Verificar condiciones
      if (!isSupported || !enabled || permission !== 'granted') return;

      // Anti-spam: No notificar si ya se notificó recientemente
      if (wasRecentlyNotified(classification.source!, classification.type!)) {
        return;
      }

      // Crear notificación
      const title = `${classification.badge} VIP: ${
        classification.type === 'recruiter' ? 'Recruiter' : 'Developer'
      } detectado!`;

      const body = `Alguien acaba de entrar desde ${classification.source}!\n📍 ${classification.timezone}`;

      const options: NotificationOptions = {
        body,
        icon: '/favicon.ico', // Tu logo
        badge: classification.badge,
        tag: 'vip-notification',
        requireInteraction: false,
        silent: false,
      };

      new Notification(title, options);

      // Agregar al historial
      const newItem: NotificationHistoryItem = {
        source: classification.source!,
        type: classification.type!,
        timestamp: Date.now(),
        timezone: classification.timezone!,
      };

      setNotificationHistory((prev) => {
        const updated = [newItem, ...prev];
        // Limitar a MAX_HISTORY
        return updated.slice(0, MAX_HISTORY);
      });
    },
    [isSupported, enabled, permission, wasRecentlyNotified]
  );

  return {
    isSupported,
    permission,
    enabled,
    notificationHistory,
    requestPermission,
    notifyVIPVisit,
    setEnabled,
  };
};
