import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
interface ScoreType {
  [key: string]: number;
}
export type Cells = (PlayerId | null)[];
export interface GameState {
  gameOver: number[] | null;
  playerIds: PlayerId[];
  scores: ScoreType;
}

type GameActions = {
  setScore: (modifier: number) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const scores : ScoreType = {};
    for (let playerId of allPlayerIds) {
      scores[playerId] = 0;
    }

    return { gameOver: null, playerIds: allPlayerIds, scores };
  },
  actions: {
    setScore: (modifier, { game, playerId }) => {
      game.scores[playerId] += modifier;
      game.playerIds.forEach((playerId) => {
        console.log(game.scores[playerId]);
      })
    },
  },
});
