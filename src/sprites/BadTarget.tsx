import { Sprite } from "@pixi/react";
import React, { useRef } from "react";
import img from "../assets/goodTarget.png";

interface TargetProps {
  x: number;
  y: number;
  ScoreUpdate?: (score: number) => void;
}

export function BadTarget({ x, y, ScoreUpdate }: TargetProps) {
  const spriteRef = useRef<Sprite>(null);
  let score = 0;
  const handleClick = () => {
    score -= 1;
    console.log("score -= 1");
    // if (ScoreUpdate){
    //   ScoreUpdate(score);
    // }
    if (spriteRef.current) {
      spriteRef.current.destroy();
    }
  };

  return (
    <Sprite
      image={img}
      x={100}
      y={50}
      interactive={true}
      onpointerdown={handleClick}
      ref={spriteRef}
    />
  );
}
export default BadTarget;
