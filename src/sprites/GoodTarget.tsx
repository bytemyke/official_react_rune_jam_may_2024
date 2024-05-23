import { Sprite } from "@pixi/react";
import img from "../assets/goodTarget.png";

interface TargetProps {
  x: number;
  y: number;
  score: number;
  ScoreUpdate?: (score: number) => void;
}

export function GoodTarget({ x, y, ScoreUpdate }: TargetProps) {
  let score = 0;
  const handleClick = (e: any) => {
    score += 1;
    e.currentTarget.destroy();
  };

  return (
    <Sprite
      image={img}
      x={100}
      y={50}
      interactive={true}
      onpointerdown={(e) => handleClick(e)}
    />
  );
}
export default GoodTarget;
