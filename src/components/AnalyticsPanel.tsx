import { useState, useEffect } from "react";
import {
  Eye,
  Users,
  Activity,
  AlertTriangle,
  X,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { AdminLogin } from "./AdminLogin";
import { Button } from "./ui/button";

interface AnalyticsData {
  eventType: string;
  data: any;
  timestamp: number;
}

export const AnalyticsPanel = () => {
  const { isAuthenticated, login, logout } = useAdminAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData[]>([]);
  const [stats, setStats] = useState({
    totalVisits: 0,
    suspiciousVisits: 0,
    averageTimeOnPage: 0,
    uniqueVisitors: 0,
  });

  useEffect(() => {
    if (isOpen) {
      loadAnalytics();
    }
  }, [isOpen]);

  const loadAnalytics = () => {
    const data = JSON.parse(localStorage.getItem("visitor_analytics") || "[]");
    setAnalytics(data);

    // Calcular estadísticas
    const visitorInits = data.filter(
      (d: AnalyticsData) => d.eventType === "visitor_init"
    );
    const behaviorUpdates = data.filter(
      (d: AnalyticsData) => d.eventType === "behavior_update"
    );

    const suspiciousCount = behaviorUpdates.filter(
      (d: AnalyticsData) => d.data.suspicionScore?.isSuspicious
    ).length;

    const uniqueSessionIds = new Set(
      visitorInits.map((d: AnalyticsData) => d.data.sessionId)
    );

    const avgTime =
      behaviorUpdates.length > 0
        ? behaviorUpdates.reduce(
            (sum: number, d: AnalyticsData) =>
              sum + (d.data.metrics?.timeOnPage || 0),
            0
          ) / behaviorUpdates.length
        : 0;

    setStats({
      totalVisits: visitorInits.length,
      suspiciousVisits: suspiciousCount,
      averageTimeOnPage: Math.round(avgTime),
      uniqueVisitors: uniqueSessionIds.size,
    });
  };

  const clearAnalytics = () => {
    if (confirm("¿Seguro que quieres borrar todos los datos?")) {
      localStorage.removeItem("visitor_analytics");
      setAnalytics([]);
      setStats({
        totalVisits: 0,
        suspiciousVisits: 0,
        averageTimeOnPage: 0,
        uniqueVisitors: 0,
      });
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(analytics, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Mostrar login si no está autenticado
  if (!isAuthenticated) {
    return isOpen ? (
      <AdminLogin onLogin={login} />
    ) : (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110 z-40"
        title="Admin Panel"
      >
        <Activity className="h-5 w-5" />
      </button>
    );
  }

  return (
    <>
      {/* Botón flotante para abrir el panel */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all hover:scale-110 z-40"
        title="Ver Analytics"
      >
        <Activity className="h-5 w-5" />
      </button>

      {/* Panel lateral */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />

          <div className="fixed right-0 top-0 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  Analytics Panel
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Datos almacenados localmente - 100% gratis
                </p>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="p-6 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-2">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm font-medium">Visitas Totales</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.totalVisits}
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 mb-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">Únicos</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.uniqueVisitors}
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="text-sm font-medium">Sospechosos</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.suspiciousVisits}
                </p>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
                  <TrendingUp className="h-5 w-5" />
                  <span className="text-sm font-medium">Tiempo Promedio</span>
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {stats.averageTimeOnPage}s
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-6 pb-4 flex gap-3">
              <button
                onClick={exportData}
                className="flex-1 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                📥 Exportar JSON
              </button>
              <button
                onClick={clearAnalytics}
                className="flex-1 py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                🗑️ Limpiar Datos
              </button>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>

            {/* Event Log */}
            <div className="px-6 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Últimos Eventos ({analytics.length})
              </h3>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {analytics
                  .slice()
                  .reverse()
                  .map((event, idx) => (
                    <div
                      key={idx}
                      className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-xs font-medium px-2 py-1 rounded ${
                              event.eventType === "visitor_init"
                                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                                : "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
                            }`}
                          >
                            {event.eventType}
                          </span>
                          {/* Badge VIP */}
                          {event.data.classification?.isVIP && (
                            <span className="text-xs font-bold px-2 py-1 rounded bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                              {event.data.classification.badge} VIP
                            </span>
                          )}
                          {/* Badge de origen */}
                          {event.data.classification && !event.data.classification.isVIP && (
                            <span className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                              {event.data.classification.badge} {event.data.classification.source}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(event.timestamp).toLocaleString("es-ES")}
                        </span>
                      </div>
                      
                      {/* Descripción de la clasificación */}
                      {event.data.classification && (
                        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                          {event.data.classification.description}
                        </div>
                      )}

                      {event.data.suspicionScore && (
                        <div className="mt-2 text-xs">
                          <span
                            className={`font-medium ${
                              event.data.suspicionScore.isSuspicious
                                ? "text-red-600 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            Score: {event.data.suspicionScore.score}
                          </span>
                          {event.data.suspicionScore.reasons.length > 0 && (
                            <span className="ml-2 text-gray-600 dark:text-gray-400">
                              • {event.data.suspicionScore.reasons.join(", ")}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
