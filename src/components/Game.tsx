import { Texture } from "pixi.js";
import { BoardProps } from "../App";
import { useEffect, useRef, useState } from "react";
// import { PlayerId } from "rune-games-sdk/multiplayer";
import { Stage, Container, useApp, useTick, Sprite } from "@pixi/react";
import { GoodTarget } from "../sprites/GoodTarget.tsx";
import img from "../assets/goodTarget.png";
import { BadTarget } from "../sprites/BadTarget.tsx";

export function Game({ game }: BoardProps) {
  console.log(Texture)
  const app = useApp();
  app.resizeTo = document.getElementById("board") as HTMLElement;
  if (!game) {
    return null;
  }
  // const { playerIds } = game;
  let maxWidth = app.view.width;
  let maxHeight = app.view.height;
  console.log(maxWidth, maxHeight);
  return (
    <>
      <GoodTarget x={100} y={300} img={img} />
      <BadTarget x={200} y={-50} img={img} />
    </>
  );
}
