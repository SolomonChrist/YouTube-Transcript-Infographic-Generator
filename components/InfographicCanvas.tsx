import React from 'react';
import { InfographicData, StylePreset } from '../types';

// Define detailed style objects for each preset
const styleThemes: Record<StylePreset, any> = {
  [StylePreset.Corporate]: {
    container: {
      backgroundColor: '#f8fafc',
      color: '#0f172a',
      fontFamily: "'Inter', sans-serif",
    },
    mainTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '88px',
      fontWeight: '700',
      color: '#1e3a8a',
      textAlign: 'center' as const,
      letterSpacing: '-2px',
      textTransform: 'uppercase' as const,
    },
    insight: {
      borderTop: '2px solid #e2e8f0',
    },
    insightTitle: {
      fontSize: '44px',
      fontWeight: '700',
      color: '#1e3a8a',
    },
    insightDescription: {
      fontSize: '30px',
      color: '#334155',
      lineHeight: '1.6',
    },
    icon: {
      border: '2px solid #dbeafe',
      borderRadius: '50%',
      backgroundColor: '#eff6ff',
    },
  },
  [StylePreset.ColorfulSocial]: {
    container: {
      background: 'linear-gradient(135deg, #6EE7B7 0%, #3B82F6 100%)',
      color: '#ffffff',
      fontFamily: "'Poppins', sans-serif",
    },
    mainTitle: {
      fontSize: '100px',
      fontWeight: '700',
      textAlign: 'center' as const,
      textShadow: '0 4px 6px rgba(0,0,0,0.1)',
    },
    insight: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '24px',
      paddingLeft: '20px',
      paddingRight: '20px',
    },
    insightTitle: {
      fontSize: '48px',
      fontWeight: '700',
    },
    insightDescription: {
      fontSize: '32px',
      lineHeight: '1.5',
      opacity: 0.9,
    },
    icon: {
      borderRadius: '16px',
      boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    },
  },
  [StylePreset.Minimalist]: {
    container: {
      backgroundColor: '#ffffff',
      color: '#111827',
      fontFamily: "'Source Serif 4', serif",
    },
    mainTitle: {
      fontSize: '92px',
      fontWeight: '700',
      textAlign: 'center' as const,
      letterSpacing: '1px',
    },
    insight: {
      borderTop: '1px solid #e5e7eb',
    },
    insightTitle: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '40px',
      fontWeight: '700',
      textTransform: 'uppercase' as const,
      letterSpacing: '2px',
    },
    insightDescription: {
      fontSize: '32px',
      lineHeight: '1.7',
      color: '#4b5563',
    },
    icon: {},
  },
  [StylePreset.ModernDark]: {
    container: {
      backgroundColor: '#111827',
      color: '#d1d5db',
      fontFamily: "'Inter', sans-serif",
    },
    mainTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '92px',
      fontWeight: '700',
      color: '#ffffff',
      textAlign: 'center' as const,
      letterSpacing: '-1.5px',
      textTransform: 'uppercase' as const,
    },
    insight: {
      borderTop: '1px solid #374151',
    },
    insightTitle: {
      fontSize: '44px',
      fontWeight: '700',
      color: '#22d3ee',
    },
    insightDescription: {
      fontSize: '30px',
      color: '#d1d5db',
      lineHeight: '1.6',
    },
    icon: {},
  },
  [StylePreset.FreshClean]: {
    container: {
      backgroundColor: '#f0fdf4',
      color: '#1f2937',
      fontFamily: "'Inter', sans-serif",
    },
    mainTitle: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '92px',
      fontWeight: '700',
      color: '#166534',
      textAlign: 'center' as const,
    },
    insight: {
      border: 'none',
    },
    insightTitle: {
      fontSize: '44px',
      fontWeight: '700',
      color: '#15803d',
    },
    insightDescription: {
      fontSize: '30px',
      color: '#374151',
      lineHeight: '1.6',
    },
    icon: {
      backgroundColor: '#ffffff',
      border: '2px solid #bbf7d0',
      borderRadius: '16px',
    },
  },
  [StylePreset.Geometric]: {
    container: {
      backgroundColor: '#fffbeb',
      color: '#1f2937',
      fontFamily: "'Poppins', sans-serif",
    },
    mainTitle: {
      fontSize: '96px',
      fontWeight: '900',
      color: '#000000',
      textAlign: 'center' as const,
      textTransform: 'uppercase' as const,
    },
    insight: {
      paddingLeft: '20px'
    },
    insightTitle: {
      fontSize: '44px',
      fontWeight: '700',
      color: '#be123c',
    },
    insightDescription: {
      fontFamily: "'Inter', sans-serif",
      fontSize: '30px',
      lineHeight: '1.5',
      color: '#374151',
    },
    icon: {
      backgroundColor: '#fecdd3',
      borderRadius: '0',
    },
  },
};

interface InfographicCanvasProps {
  data: InfographicData;
  style: StylePreset;
  icons: string[];
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const InfographicCanvas: React.FC<InfographicCanvasProps> = ({ data, style, icons, canvasRef }) => {
  const theme = styleThemes[style];

  return (
    <div
      ref={canvasRef}
      style={{
        width: 1080,
        height: 1920,
        display: 'flex',
        flexDirection: 'column',
        padding: '60px 80px',
        ...theme.container,
      }}
    >
      <header style={{ paddingBottom: '40px', flexShrink: 0 }}>
        <h1 style={theme.mainTitle}>{data.sourceData.title}</h1>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '30px', justifyContent: 'flex-start', overflow: 'hidden' }}>
        {data.insights.map((insight, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '40px',
              paddingTop: '20px',
              paddingBottom: '20px',
              ...theme.insight,
            }}
          >
            <div style={{ flexShrink: 0, padding: '20px', ...theme.icon }}>
              <img src={icons[index]} alt={insight.title} style={{ width: 128, height: 128, objectFit: 'contain' }} />
            </div>
            <div>
              <h2 style={theme.insightTitle}>{insight.title}</h2>
              <p style={theme.insightDescription}>{insight.description}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};