import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import story from './story.json';

const SCENE_FRAMES = 120;
const palette = {line: '#ffffff', accent: '#f6c94c'};
const icon = (kind: string) => {
  const common = {fill:'none',stroke:palette.line,strokeWidth:15,strokeLinecap:'round' as const,strokeLinejoin:'round' as const};
  if (kind === 'document') return <><rect x="240" y="120" width="320" height="450" rx="22" {...common}/>{[240,315,390].map(y=><line key={y} x1="290" y1={y} x2="510" y2={y} {...common}/>)}</>;
  if (kind === 'search') return <><circle cx="370" cy="310" r="150" {...common}/><line x1="480" y1="420" x2="650" y2="600" {...common}/><circle cx="370" cy="310" r="65" stroke={palette.accent} strokeWidth="12" fill="none"/></>;
  if (kind === 'scale') return <><line x1="400" y1="150" x2="400" y2="600" {...common}/><line x1="220" y1="260" x2="580" y2="260" {...common}/><path d="M240 270 L170 430 Q245 505 320 430 Z M490 270 L420 430 Q495 505 570 430 Z" {...common}/><line x1="270" y1="600" x2="530" y2="600" {...common}/></>;
  return <><path d="M160 290 L400 130 L640 290" {...common}/>{[240,340,440,540].map(x=><rect key={x} x={x} y="320" width="35" height="250" rx="8" fill={palette.line}/>)}<line x1="160" y1="600" x2="640" y2="600" {...common}/></>;
};

export const Shorts: React.FC = () => {
  const frame = useCurrentFrame();
  const index = Math.min(story.scenes.length - 1, Math.floor(frame / SCENE_FRAMES));
  const scene = story.scenes[index];
  const local = frame % SCENE_FRAMES;
  const fadeIn = interpolate(local, [0, 14], [0, 1], {extrapolateRight:'clamp'});
  const fadeOut = interpolate(local, [SCENE_FRAMES - 14, SCENE_FRAMES], [1, 0], {extrapolateLeft:'clamp'});
  const opacity = Math.min(fadeIn, fadeOut);
  const scale = interpolate(local, [0, SCENE_FRAMES], [0.94, 1.08]);
  const y = interpolate(local, [0, SCENE_FRAMES], [18, -18]);
  return <AbsoluteFill style={{backgroundColor:scene.background, color:'white', fontFamily:'Arial, sans-serif', overflow:'hidden'}}>
    <AbsoluteFill style={{opacity: 0.11, background:'radial-gradient(circle at 50% 38%, #91cfff 0%, transparent 57%)'}}/>
    <div style={{position:'absolute',top:110,left:80,right:80,color:palette.accent,fontSize:34,fontWeight:800,letterSpacing:7}}>EXPLICADO EM 1 MINUTO</div>
    <div style={{position:'absolute',top:260,left:80,right:80,fontSize:66,fontWeight:850,lineHeight:1.12}}>{story.title}</div>
    <svg viewBox="0 0 800 800" style={{position:'absolute',left:105,top:580,width:870,height:870,opacity,transform:`scale(${scale}) translateY(${y}px)`}}>
      <circle cx="400" cy="370" r="325" fill="#ffffff" opacity="0.055"/>
      <circle cx="400" cy="370" r="270" fill="none" stroke="#f6c94c" strokeWidth="4" strokeDasharray="15 24" opacity="0.5"/>
      {icon(scene.visual)}
    </svg>
    <div style={{position:'absolute',bottom:230,left:75,right:75,textAlign:'center',fontSize:60,fontWeight:800,lineHeight:1.23,opacity,textShadow:'0 5px 10px #0008'}}>{scene.caption}</div>
    <div style={{position:'absolute',bottom:75,left:75,right:75,height:8,background:'#ffffff30',borderRadius:4}}><div style={{height:'100%',width:`${(frame / (story.scenes.length * SCENE_FRAMES))*100}%`,background:palette.accent,borderRadius:4}}/></div>
  </AbsoluteFill>;
};
