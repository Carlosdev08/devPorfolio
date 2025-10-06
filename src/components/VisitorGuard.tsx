import { createContext, useContext, useState, ReactNode } from 'react';
import { useVisitorTracking } from '@/hooks/useVisitorTracking';
import { VisitorVerification } from './VisitorVerification';

interface VisitorGuardContextType {
  isVerified: boolean;
  suspicionScore: number;
  visitorId: string | null;
}

const VisitorGuardContext = createContext<VisitorGuardContextType | undefined>(undefined);

export const useVisitorGuard = () => {
  const context = useContext(VisitorGuardContext);
  if (!context) {
    throw new Error('useVisitorGuard must be used within VisitorGuardProvider');
  }
  return context;
};

interface VisitorGuardProviderProps {
  children: ReactNode;
  /** Si true, bloquea el contenido hasta verificar. Si false, solo registra */
  strictMode?: boolean;
}

export const VisitorGuardProvider = ({ 
  children, 
  strictMode = false 
}: VisitorGuardProviderProps) => {
  const [isVerified, setIsVerified] = useState(false);
  const { visitorData, suspicionScore } = useVisitorTracking();

  const handleVerified = () => {
    setIsVerified(true);
  };

  const contextValue: VisitorGuardContextType = {
    isVerified,
    suspicionScore: suspicionScore.score,
    visitorId: visitorData?.sessionId || null,
  };

  return (
    <VisitorGuardContext.Provider value={contextValue}>
      {/* Mostrar verificación si es sospechoso */}
      <VisitorVerification
        suspicionScore={suspicionScore.score}
        onVerified={handleVerified}
      />

      {/* En modo estricto, solo mostrar contenido si está verificado o score bajo */}
      {strictMode && suspicionScore.isSuspicious && !isVerified ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Verificando...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </VisitorGuardContext.Provider>
  );
};
