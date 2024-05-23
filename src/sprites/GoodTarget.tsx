import { Sprite } from "@pixi/react";
import { setScoreOnClick } from "../logic/setScoreOnClick";

interface TargetProps {
  x: number;
  y: number;
  img: string;
}

export function GoodTarget({ x, y, img }: TargetProps) {
  return (
    <Sprite
      image={img}
      x={x}
      y={y}
      eventMode="dynamic"
      onpointerdown={(e) => setScoreOnClick(e, 1)}
    />
  );
}
