export type VisitorType = 'recruiter' | 'developer' | 'social' | 'search' | 'direct' | 'other';

export interface VisitorClassification {
  type: VisitorType;
  source: string;
  badge: string;
  isVIP: boolean;
  description: string;
  timezone: string;
}

interface VisitorInput {
  referrer: string;
  userAgent: string;
  timezone: string;
}

// Mapeo de dominios conocidos
const REFERRER_PATTERNS = {
  recruiter: [
    { pattern: 'linkedin.com', name: 'LinkedIn', badge: '💼' },
    { pattern: 'indeed.com', name: 'Indeed', badge: '💼' },
    { pattern: 'glassdoor.com', name: 'Glassdoor', badge: '💼' },
    { pattern: 'monster.com', name: 'Monster', badge: '💼' },
    { pattern: 'ziprecruiter.com', name: 'ZipRecruiter', badge: '💼' },
    { pattern: 'hired.com', name: 'Hired', badge: '💼' },
  ],
  developer: [
    { pattern: 'github.com', name: 'GitHub', badge: '👨‍💻' },
    { pattern: 'stackoverflow.com', name: 'Stack Overflow', badge: '👨‍💻' },
    { pattern: 'dev.to', name: 'Dev.to', badge: '👨‍💻' },
    { pattern: 'hashnode.com', name: 'Hashnode', badge: '👨‍💻' },
    { pattern: 'medium.com', name: 'Medium', badge: '👨‍💻' },
    { pattern: 'gitlab.com', name: 'GitLab', badge: '👨‍💻' },
  ],
  social: [
    { pattern: 'x.com', name: 'Twitter/X', badge: '🐦' },
    { pattern: 'twitter.com', name: 'Twitter/X', badge: '🐦' },
    { pattern: 'facebook.com', name: 'Facebook', badge: '📘' },
    { pattern: 'reddit.com', name: 'Reddit', badge: '🔴' },
    { pattern: 'instagram.com', name: 'Instagram', badge: '📸' },
    { pattern: 'tiktok.com', name: 'TikTok', badge: '🎵' },
  ],
  search: [
    { pattern: 'google.com', name: 'Google', badge: '🔍' },
    { pattern: 'bing.com', name: 'Bing', badge: '🔍' },
    { pattern: 'duckduckgo.com', name: 'DuckDuckGo', badge: '🔍' },
    { pattern: 'yahoo.com', name: 'Yahoo', badge: '🔍' },
  ],
};

export function classifyVisitor(input: VisitorInput): VisitorClassification {
  const { referrer, timezone } = input;

  // Caso 1: Tráfico directo (sin referrer)
  if (!referrer || referrer.trim() === '') {
    return {
      type: 'direct',
      source: 'Direct',
      badge: '🔗',
      isVIP: false,
      description: 'Entrada directa (marcador o URL directa)',
      timezone,
    };
  }

  // Intentar parsear la URL
  let hostname = '';
  try {
    const url = new URL(referrer);
    hostname = url.hostname.toLowerCase().replace('www.', '');
  } catch {
    // URL malformada
    return {
      type: 'other',
      source: 'Unknown',
      badge: '🌐',
      isVIP: false,
      description: 'Origen desconocido',
      timezone,
    };
  }

  // Buscar en patrones conocidos
  for (const [type, patterns] of Object.entries(REFERRER_PATTERNS)) {
    for (const { pattern, name, badge } of patterns) {
      if (hostname.includes(pattern)) {
        const isVIP = type === 'recruiter' || type === 'developer';
        
        let description = '';
        if (type === 'recruiter') {
          description = `🎯 Posible recruiter desde ${name}`;
        } else if (type === 'developer') {
          description = `👨‍💻 Developer/tech desde ${name}`;
        } else if (type === 'social') {
          description = `Red social: ${name}`;
        } else if (type === 'search') {
          description = `Búsqueda orgánica desde ${name}`;
        }

        return {
          type: type as VisitorType,
          source: name,
          badge,
          isVIP,
          description,
          timezone,
        };
      }
    }
  }

  // Caso por defecto: Otro dominio
  return {
    type: 'other',
    source: hostname,
    badge: '🌐',
    isVIP: false,
    description: `Referido desde ${hostname}`,
    timezone,
  };
}

// Función auxiliar para obtener el tipo en texto legible
export function getVisitorTypeLabel(type: VisitorType): string {
  const labels: Record<VisitorType, string> = {
    recruiter: 'Recruiter',
    developer: 'Developer',
    social: 'Red Social',
    search: 'Búsqueda',
    direct: 'Directo',
    other: 'Otro',
  };
  return labels[type];
}
