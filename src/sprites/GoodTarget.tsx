import { Sprite } from "@pixi/react";
interface TargetProps {
  x: number;
  y: number;
  img: string;
  score: number;
}

export function GoodTarget({ x, y, img, score }: TargetProps) {
  const handleClick = (e: any) => {
    score += 1;
    e.currentTarget.destroy();
  };

  return (
    <Sprite
      image={img}
      x={x}
      y={y}
      interactive={true}
      onpointerdown={(e) => handleClick(e)}
    />
  );
}
