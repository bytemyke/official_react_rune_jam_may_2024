import { Sprite } from "@pixi/react";
import { setScoreOnClick } from "../logic/setScoreOnClick";
interface TargetProps {
  x: number;
  y: number;
  img: string;
}

export function BadTarget({ x, y, img }: TargetProps) {
  return (
    <Sprite
      eventMode="dynamic"
      image={img}
      x={x}
      y={y}
      onpointerdown={(e) => setScoreOnClick(e, -1)}
    />
  );
}
