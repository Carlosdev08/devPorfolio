import { useEffect, useState } from 'react';
import { Shield, CheckCircle2, AlertCircle } from 'lucide-react';

interface VisitorVerificationProps {
  suspicionScore: number;
  onVerified: () => void;
}

export const VisitorVerification = ({ 
  suspicionScore, 
  onVerified 
}: VisitorVerificationProps) => {
  const [showChallenge, setShowChallenge] = useState(false);
  const [verified, setVerified] = useState(false);
  const [challenge, setChallenge] = useState({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  // Genera desafío aleatorio
  const generateChallenge = () => {
    const challenges = [
      { question: '¿Cuánto es 7 + 5?', answer: 12 },
      { question: '¿Cuánto es 15 - 8?', answer: 7 },
      { question: '¿Cuánto es 6 × 3?', answer: 18 },
      { question: '¿Cuánto es 20 ÷ 4?', answer: 5 },
      { question: '¿Cuántas letras tiene la palabra "CASA"?', answer: 4 },
      { question: '¿Cuál es el siguiente número: 2, 4, 6, __?', answer: 8 },
    ];
    
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
    setChallenge(randomChallenge);
  };

  useEffect(() => {
    // Solo mostrar si el score de sospecha es alto
    if (suspicionScore >= 50 && !verified) {
      setShowChallenge(true);
      generateChallenge();
    }
  }, [suspicionScore, verified]);

  useEffect(() => {
    // Auto-verificar usuarios con bajo score después de 10 segundos
    if (suspicionScore < 50 && !verified) {
      const timer = setTimeout(() => {
        setVerified(true);
        onVerified();
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [suspicionScore, verified, onVerified]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (parseInt(userAnswer) === challenge.answer) {
      setVerified(true);
      setShowChallenge(false);
      onVerified();
      
      // Guardar verificación
      sessionStorage.setItem('verified', 'true');
    } else {
      setAttempts(prev => prev + 1);
      setError('Respuesta incorrecta, intenta de nuevo');
      setUserAnswer('');
      
      // Después de 3 intentos, generar nuevo desafío
      if (attempts >= 2) {
        generateChallenge();
        setAttempts(0);
      }
    }
  };

  // No mostrar nada si ya está verificado desde antes
  if (sessionStorage.getItem('verified') === 'true') {
    return null;
  }

  if (!showChallenge && !verified) return null;

  if (verified) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-500/10 border border-green-500 text-green-700 dark:text-green-400 px-4 py-3 rounded-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 z-50">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">Verificado ✓</span>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Verificación Rápida
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Solo toma 5 segundos
            </p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-start gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 dark:text-amber-300">
              Responde esta pregunta para confirmar que eres humano
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {challenge.question}
            </label>
            <input
              type="number"
              value={userAnswer}
              onChange={(e) => {
                setUserAnswer(e.target.value);
                setError('');
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Tu respuesta"
              autoFocus
              required
            />
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <Shield className="h-4 w-4" />
            Verificar
          </button>
        </form>

        <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
          🔒 100% gratis • Sin cookies de terceros • Sin tracking invasivo
        </p>
      </div>
    </div>
  );
};
