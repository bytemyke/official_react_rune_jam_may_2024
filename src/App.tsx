import { Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";
import { PlayerId } from "rune-games-sdk/multiplayer";
import { Stage, useApp, useTick, Sprite } from "@pixi/react";
import shootScoreAudio from "./assets/select.wav";
import { GameState } from "./logic.ts";
import { Footer } from "./components/Footer.tsx";
import { Game } from "./components/Game.tsx";

const shootScore = new Audio(shootScoreAudio);

function App() {
  const [game, setGame] = useState<GameState>();
  const [yourPlayerId, setYourPlayerId] = useState<PlayerId | undefined>();
  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, action, yourPlayerId }) => {
        setGame(game);
        setYourPlayerId(yourPlayerId);
        if (action && action.name === "setScore") shootScore.play();
      },
    });
  }, []);

  if (!game) {
    // Rune only shows your game after an onChange() so no need for loading screen
    return;
  }

  const { playerIds } = game;

  return (
    <>
      <div id="board">
        <Stage options={{ backgroundAlpha: 0 }}>
          <Game game={game} />
        </Stage>
      </div>
      <Footer playerIds={playerIds} yourPlayerId={yourPlayerId} />
    </>
  );
}

export type BoardProps = {
  game?: GameState;
};

export default App;

/*Commented out for reference. Will be removed in future.*/

// function Grid() {
//   const app = useApp();

//   const width = app.view.width / devicePixelRatio;

//   return (
//     <Graphics
//       draw={(g) => {
//         g.lineStyle(4, 0x555555);

//         for (let i = 1; i < 6; i++) {
//           g.moveTo(i * (width / 6), 0);
//           g.lineTo(i * (width / 6), width);
//           g.moveTo(0, i * (width / 6));
//           g.lineTo(width, i * (width / 6));
//         }
//       }}
//     />
//   );
// }

// function OccupiedSpace({
//   x,
//   y,
//   side,
// }: {
//   x: number;
//   y: number;
//   side: "x" | "o";
// }) {
//   const app = useApp();
//   const spriteRef = useRef<PixiRef<typeof Sprite>>(null);
//   const width = app.view.width / devicePixelRatio / 3;

//   useTick((delta) => {
//     if (spriteRef.current) {
//       if (spriteRef.current.width < width - 20) {
//         spriteRef.current.width += delta * 5;
//         spriteRef.current.height += delta * 5;
//       }
//     }
//   });

//   return (
//     <Sprite
//       ref={spriteRef}
//       image={`${side}.svg`}
//       width={0}
//       height={0}
//       x={width * x + width / 2}
//       y={width * y + width / 2}
//       anchor={0.5}
//     />
//   );
// }

// function EmptySpace({
//   x,
//   y,
//   canClaim,
//   onpointerdown,
// }: {
//   x: number;
//   y: number;
//   canClaim: boolean;
//   onpointerdown: () => void;
// }) {
//   const [hovering, setHovering] = useState(false);
//   const app = useApp();
//   const width = app.view.width / devicePixelRatio / 3;

//   if (!canClaim) {
//     return null;
//   }

//   return (
//     <Container x={width * x} y={width * y}>
//       {hovering && <Dot />}
//       <Sprite
//         interactive={true}
//         texture={Texture.EMPTY}
//         width={width}
//         height={width}
//         onpointerover={() => setHovering(true)}
//         onpointerout={() => setHovering(false)}
//         onpointerdown={onpointerdown}
//       />
//     </Container>
//   );
// }

// function Dot() {
//   const app = useApp();
//   const width = app.view.width / devicePixelRatio / 3;

//   return (
//     <Graphics
//       anchor={0.5}
//       draw={(g) => {
//         g.beginFill(0xffffff);
//         g.drawCircle(width / 2, width / 2, 10);
//       }}
//     />
//   );
// }
