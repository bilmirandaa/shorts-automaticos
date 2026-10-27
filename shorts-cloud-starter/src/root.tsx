import React from 'react';
import {Composition} from 'remotion';
import story from './story.json';
import {Shorts} from './shorts';
const FRAMES_PER_SCENE = 120;
export const Root: React.FC = () => (
  <Composition
    id="Shorts"
    component={Shorts}
    durationInFrames={story.scenes.length * FRAMES_PER_SCENE}
    fps={30}
    width={1080}
    height={1920}
  />
);
