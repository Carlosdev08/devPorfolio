import { useEffect, useRef, useState } from 'react';

interface VisitorData {
  sessionId: string;
  timestamp: number;
  userAgent: string;
  screen: {
    width: number;
    height: number;
  };
  language: string;
  timezone: string;
  referrer: string;
  platform: string;
}

interface BehaviorMetrics {
  mouseMovements: number;
  clicks: number;
  keystrokes: number;
  timeOnPage: number;
  scrollDepth: number;
  interactionRate: number;
}

interface SuspicionScore {
  score: number; // 0-100, where 100 is most suspicious
  reasons: string[];
  isSuspicious: boolean;
}

export const useVisitorTracking = () => {
  const [visitorData, setVisitorData] = useState<VisitorData | null>(null);
  const [behaviorMetrics, setBehaviorMetrics] = useState<BehaviorMetrics>({
    mouseMovements: 0,
    clicks: 0,
    keystrokes: 0,
    timeOnPage: 0,
    scrollDepth: 0,
    interactionRate: 0,
  });
  const [suspicionScore, setSuspicionScore] = useState<SuspicionScore>({
    score: 0,
    reasons: [],
    isSuspicious: false,
  });

  const startTime = useRef(Date.now());
  const lastMouseMove = useRef(0);
  const mouseMovements = useRef(0);
  const clicks = useRef(0);
  const keystrokes = useRef(0);

  // Generate or retrieve session ID
  const getSessionId = (): string => {
    let sessionId = sessionStorage.getItem('visitor_session_id');
    if (!sessionId) {
      sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('visitor_session_id', sessionId);
    }
    return sessionId;
  };

  // Collect initial visitor data
  useEffect(() => {
    const data: VisitorData = {
      sessionId: getSessionId(),
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      screen: {
        width: window.screen.width,
        height: window.screen.height,
      },
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer,
      platform: navigator.platform,
    };

    setVisitorData(data);

    // Send to your analytics endpoint (silently)
    sendToAnalytics('visitor_init', data);
  }, []);

  // Track mouse movements
  useEffect(() => {
    const handleMouseMove = () => {
      const now = Date.now();
      if (now - lastMouseMove.current > 100) {
        mouseMovements.current++;
        lastMouseMove.current = now;
      }
    };

    const handleClick = () => {
      clicks.current++;
    };

    const handleKeyDown = () => {
      keystrokes.current++;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const depth = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      
      setBehaviorMetrics(prev => ({ ...prev, scrollDepth: Math.max(prev.scrollDepth, depth) }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update metrics every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
      const interactionRate = (mouseMovements.current + clicks.current + keystrokes.current) / Math.max(timeOnPage, 1);

      const metrics: BehaviorMetrics = {
        mouseMovements: mouseMovements.current,
        clicks: clicks.current,
        keystrokes: keystrokes.current,
        timeOnPage,
        scrollDepth: behaviorMetrics.scrollDepth,
        interactionRate,
      };

      setBehaviorMetrics(metrics);

      // Calculate suspicion score
      const score = calculateSuspicionScore(metrics, visitorData);
      setSuspicionScore(score);

      // Send periodic update
      sendToAnalytics('behavior_update', { metrics, suspicionScore: score });
    }, 2000);

    return () => clearInterval(interval);
  }, [behaviorMetrics.scrollDepth, visitorData]);

  return {
    visitorData,
    behaviorMetrics,
    suspicionScore,
  };
};

// Calculate how suspicious the visitor behavior is
const calculateSuspicionScore = (
  metrics: BehaviorMetrics,
  visitorData: VisitorData | null
): SuspicionScore => {
  let score = 0;
  const reasons: string[] = [];

  // Check 1: Zero mouse movement after some time
  if (metrics.timeOnPage > 5 && metrics.mouseMovements === 0) {
    score += 30;
    reasons.push('No mouse movement detected');
  }

  // Check 2: Extremely fast interactions (bot-like)
  if (metrics.interactionRate > 10) {
    score += 25;
    reasons.push('Abnormally high interaction rate');
  }

  // Check 3: No interactions at all after reasonable time
  if (metrics.timeOnPage > 10 && metrics.clicks === 0 && metrics.keystrokes === 0) {
    score += 20;
    reasons.push('No user interactions');
  }

  // Check 4: Suspicious user agent
  if (visitorData?.userAgent) {
    const suspiciousAgents = ['bot', 'crawler', 'spider', 'scraper', 'headless'];
    const isSuspiciousAgent = suspiciousAgents.some(agent => 
      visitorData.userAgent.toLowerCase().includes(agent)
    );
    if (isSuspiciousAgent) {
      score += 40;
      reasons.push('Suspicious user agent');
    }
  }

  // Check 5: Very short visit (hit and run)
  if (metrics.timeOnPage < 2 && metrics.clicks > 5) {
    score += 15;
    reasons.push('Abnormally fast clicks');
  }

  // Check 6: Screen size suspicious (common bot screen sizes)
  if (visitorData?.screen.width === 1920 && visitorData?.screen.height === 1080) {
    // This is actually common, so low score
    score += 5;
  }

  // Check 7: Missing or suspicious timezone
  if (!visitorData?.timezone || visitorData.timezone === 'UTC') {
    score += 10;
    reasons.push('Suspicious timezone');
  }

  return {
    score: Math.min(score, 100),
    reasons,
    isSuspicious: score >= 50,
  };
};

// Send data to your analytics endpoint
const sendToAnalytics = async (eventType: string, data: any) => {
  try {
    // Store locally for now (you can replace with API call)
    let existingData = JSON.parse(localStorage.getItem('visitor_analytics') || '[]');
    existingData.push({
      eventType,
      data,
      timestamp: Date.now(),
    });
    
    // Keep only last 100 events - remover elementos viejos hasta que queden 100
    while (existingData.length > 100) {
      existingData.shift();
    }
    
    localStorage.setItem('visitor_analytics', JSON.stringify(existingData));

    // TODO: Send to your backend API
    // await fetch('/api/analytics', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ eventType, data }),
    // });
  } catch (error) {
    console.error('Analytics error:', error);
  }
};
