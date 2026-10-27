
import React from 'react';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from 'remotion';
import story from './story.json';

const FRAMES = 120;

const C = {
  navy: '#101d37',
  blue: '#203d67',
  yellow: '#ffce65',
  white: '#f7f6ef',
  skin: '#eab68f',
  dark: '#253148',
  red: '#e86d68',
};

const Investigator: React.FC<{frame: number}> = ({frame}) => {
  const hand = Math.sin(frame * 0.13) * 13;
  const light = Math.sin(frame * 0.07) * 0.12 + 0.35;

  return (
    <svg viewBox="0 0 800 950" width="100%" height="100%">
      <rect width="800" height="950" fill="#172947"/>
      <rect x="65" y="80" width="670" height="590" rx="24" fill="#263b5b"/>

      {/* Janela da delegacia */}
      <rect x="90" y="105" width="250" height="290" rx="12" fill="#567899"/>
      <path d="M215 105V395 M90 250H340" stroke="#142744" strokeWidth="18"/>
      <path d="M110 390L190 265L225 330L280 235L330 390" fill="#344f70"/>

      {/* Luminaria */}
      <path d="M555 100L535 280" stroke={C.dark} strokeWidth="17"/>
      <path d="M470 310L535 225L600 310Z" fill={C.yellow}/>
      <ellipse cx="535" cy="330" rx="125" ry="35" fill={C.yellow} opacity={light}/>

      {/* Mesa */}
      <rect x="65" y="680" width="670" height="46" rx="14" fill="#ad7554"/>
      <rect x="105" y="725" width="35" height="225" fill="#774b3d"/>
      <rect x="660" y="725" width="35" height="225" fill="#774b3d"/>

      {/* Documentos */}
      <g transform={`translate(${Math.sin(frame * 0.035) * 5},0)`}>
        <rect x="380" y="620" width="220" height="70" rx="5" fill="#e4e7ed" transform="rotate(-8 380 620)"/>
        <path d="M425 640h110M425 657h90M425 674h70" stroke="#8494aa" strokeWidth="6"/>
      </g>

      {/* Personagem ilustrado */}
      <path d="M170 490Q250 435 345 490L390 680H105Z" fill="#3b6079"/>
      <rect x="218" y="425" width="64" height="90" rx="21" fill={C.skin}/>
      <ellipse cx="250" cy="355" rx="90" ry="110" fill={C.skin}/>
      <path d="M160 350Q145 230 250 235Q355 230 340 345L310 307Q250 323 176 300Z" fill="#252c39"/>
      <circle cx="217" cy="363" r="6" fill="#273044"/>
      <circle cx="284" cy="363" r="6" fill="#273044"/>
      <path d="M225 413Q253 431 281 412" stroke="#a76f60" strokeWidth="5" fill="none"/>

      {/* Braco e lupa animada */}
      <g transform={`rotate(${hand} 370 550)`}>
        <path d="M323 515Q380 535 432 605" stroke="#3b6079" strokeWidth="52" strokeLinecap="round" fill="none"/>
        <circle cx="440" cy="616" r="25" fill={C.skin}/>
        <path d="M455 603L515 540" stroke="#293449" strokeWidth="18" strokeLinecap="round"/>
        <circle cx="545" cy="505" r="53" stroke={C.yellow} strokeWidth="14" fill="#a7d5e2" fillOpacity=".30"/>
      </g>
    </svg>
  );
};

const Government: React.FC<{frame: number}> = ({frame}) => {
  const rise = interpolate(frame, [0, 50], [85, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <svg viewBox="0 0 800 950" width="100%" height="100%">
      <rect width="800" height="950" fill="#203b60"/>
      <circle cx="650" cy="180" r="110" fill="#f9ca74" opacity=".8"/>
      <path d="M0 670Q240 550 400 640T800 590V950H0Z" fill="#294d68"/>
      <g transform={`translate(0 ${rise})`}>
        <rect x="85" y="490" width="630" height="260" fill="#e4e3db"/>
        <path d="M70 490L400 320L730 490Z" fill="#efeee7"/>
        {Array.from({length: 6}, (_, i) => (
          <g key={i}>
            <rect x={120+i*105} y="505" width="55" height="215" fill="#f8f6ee"/>
            <rect x={135+i*105} y="505" width="24" height="215" fill="#b3b8bc"/>
          </g>
        ))}
        <rect x="60" y="720" width="680" height="35" fill="#d6d6d0"/>
        <rect x="25" y="755" width="750" height="25" fill="#aab4bd"/>
        <rect x="385" y="370" width="14" height="110" fill="#6e7c80"/>
        <path d="M399 370H465L399 412Z" fill="#64b56f"/>
      </g>
    </svg>
  );
};

const Evidence: React.FC<{frame: number}> = ({frame}) => {
  const zoom = interpolate(frame, [0, 119], [0.9, 1.1]);

  return (
    <svg viewBox="0 0 800 950" width="100%" height="100%">
      <rect width="800" height="950" fill="#192943"/>
      <g transform={`translate(400 475) scale(${zoom}) translate(-400 -475)`}>
        <rect x="105" y="150" width="590" height="610" rx="24" fill="#9a7157"/>
        <rect x="145" y="185" width="510" height="540" rx="12" fill="#e9dfca"/>
        {Array.from({length: 5}, (_, i) => (
          <g key={i}>
            <rect x={190} y={260+i*78} width={260+i%2*90} height="10" rx="5" fill="#8794a0"/>
            <rect x={190} y={282+i*78} width="205" height="7" rx="4" fill="#b4b9b4"/>
          </g>
        ))}
        <circle cx="548" cy="550" r="88" fill="#e86d68" opacity=".2"/>
        <circle cx="548" cy="550" r="70" stroke="#d65b5b" strokeWidth="13" fill="none"/>
        <path d="M495 550L530 580L600 510" stroke="#d65b5b" strokeWidth="15" fill="none" strokeLinecap="round"/>
      </g>
    </svg>
  );
};

const Graphics = [
  Investigator,
  Evidence,
  Government,
  Investigator,
];

export const Shorts: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const index = Math.min(
    story.scenes.length - 1,
    Math.floor(frame / FRAMES)
  );

  const scene = story.scenes[index];
  const local = frame % FRAMES;

  const appear = spring({
    frame: local,
    fps,
    config: {damping: 18},
  });

  const opacity = interpolate(local, [0, 12, 110, 119], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const Visual = Graphics[index % Graphics.length];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.navy,
        color: C.white,
        fontFamily: 'Arial, sans-serif',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 75,
          fontSize: 29,
          fontWeight: 800,
          letterSpacing: 5,
          color: C.yellow,
        }}
      >
        ENTENDA A HISTÓRIA
      </div>

      <div
        style={{
          position: 'absolute',
          top: 270,
          left: -20,
          width: 1120,
          height: 1280,
          opacity,
          transform: `scale(${1 + local * 0.0003})`,
        }}
      >
        <Visual frame={local}/>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 175,
          left: 60,
          right: 60,
          padding: '35px 30px',
          borderRadius: 24,
          background: 'rgba(13,27,48,0.91)',
          borderLeft: `9px solid ${C.yellow}`,
          fontSize: 52,
          lineHeight: 1.2,
          fontWeight: 800,
          textAlign: 'center',
          opacity,
          transform: `translateY(${(1-appear)*60}px)`,
        }}
      >
        {scene.caption}
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: 65,
          width: 950,
          height: 8,
          backgroundColor: '#ffffff35',
          borderRadius: 10,
        }}
      >
        <div
          style={{
            width: `${((frame+1)/(story.scenes.length*FRAMES))*100}%`,
            height: '100%',
            background: C.yellow,
            borderRadius: 10,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
