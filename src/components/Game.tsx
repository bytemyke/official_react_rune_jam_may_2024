import { Texture } from "pixi.js";
import { BoardProps } from "../App";
import { useEffect, useRef, useState } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import { Stage, Container, useApp, useTick, Sprite } from "@pixi/react";

export function Game({ yourPlayerId, game }: BoardProps) {
  console.log(Texture);
  const app = useApp();
  app.resizeTo = document.getElementById("board") as HTMLElement;

  if (!game) {
    return null;
  }
  const { playerIds } = game;

  return (
    <Sprite
      interactive={true}
      x={0}
      y={0}
      width={app.view.width}
      height={app.view.height}
      onpointerdown={(e) => {
        console.log("clicked");
        console.log(e);
      }}
      texture={Texture.EMPTY}
    ></Sprite>
  );
}
