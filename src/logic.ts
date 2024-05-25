import type { PlayerId, RuneClient } from "rune-games-sdk/multiplayer";
// import { targetMap } from "./logic/targetMap";
interface ScoreType {
  [key: string]: number;
}
export interface GameState {
  gameOver: boolean;
  playerIds: PlayerId[];
  scores: ScoreType;
  targetMapData: Target[];
}
type TargetSize = "large" | "medium" | "small";
type TargetType = "good" | "bad";
interface Target {
  x: number;
  y: number;
  type: TargetType;
  size: TargetSize;
  spawnTime: number;
  points: number;
  hitTime: any;
}
type GameActions = {
  setScore: (modifier: number) => void;
};

declare global {
  const Rune: RuneClient<GameState, GameActions>;
  const gameTime: 8000;
}

Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const gameTime = 8000;
    const scores: ScoreType = {};
    for (let playerId of allPlayerIds) {
      scores[playerId] = 0;
    }
    function targetMap(gameLength: number): Target[] {
      const targetMap: Target[] = [];
      const totalTargets = Math.floor(gameLength / (gameLength / 50)); // Ensures totalTargets * (gameLength / 60) = gameLength

      // Difficulty progression factor (increases spawn rate of harder targets over time)
      const difficultyFactor = Math.min(gameLength / 10000, 1); // Maxes out at 1

      // Function to generate a random target object
      const generateTarget = (
        type: TargetType,
        size: TargetSize,
        spawnTime: number
      ): Target => ({
        x: Math.random() * window.innerWidth, // Random X position (assuming window access)
        y: Math.random() * window.innerHeight, // Random Y position
        size,
        type,
        spawnTime,
        hitTime: {
          large: 3,
          medium: 2,
          small: 1,
        }[size], // Use object lookup for hit time based on size
        points: {
          good: {
            large: 1,
            medium: 2,
            small: 3,
          },
          bad: {
            large: -1,
            medium: -2,
            small: -3,
          },
        }[type][size], // Use nested object lookup for points based on type and size
      });

      // Function to determine target type (good or bad) based on difficulty factor
      const getTargetType = (): TargetType =>
        Math.random() < 0.6 + difficultyFactor * 0.4 ? "good" : "bad";

      // Spawn targets in phases (first 30 seconds, remaining time)
      const phase1Length = 30; // First 30 seconds
      const phase2Length = gameLength - phase1Length;

      const numLargeTargets = totalTargets * 0.3;
      const numMediumTargets = totalTargets * 0.3;
      const numSmallTargets = totalTargets * 0.4;

      // Spawn guaranteed large targets
      for (let i = 0; i < numLargeTargets; i++) {
        targetMap.push(
          generateTarget(getTargetType(), "large", Math.random() * phase1Length)
        );
      }

      // Spawn medium targets
      for (let i = 0; i < numMediumTargets; i++) {
        targetMap.push(
          generateTarget(
            getTargetType(),
            "medium",
            Math.random() * phase1Length
          )
        );
      }

      // Spawn small targets
      for (let i = 0; i < numSmallTargets; i++) {
        targetMap.push(
          generateTarget(getTargetType(), "small", Math.random() * phase1Length)
        );
      }
      // Phase 2: Spawn targets randomly with adjusted difficulty
      for (let i = 0; i < totalTargets * 0.5; i++) {
        targetMap.push(
          generateTarget(
            getTargetType(),
            Math.random() < 0.8 + difficultyFactor * 0.2
              ? "large"
              : Math.random() < 0.5
              ? "medium"
              : "small",
            phase1Length + Math.random() * phase2Length
          )
        );
      }

      // Log the generated target map
      targetMap.sort(
        (targetA, targetB) => targetA.spawnTime - targetB.spawnTime
      );

      // Log the generated target map (now sorted by spawn time)
      return targetMap;
    }

    return {
      gameOver: false,
      playerIds: allPlayerIds,
      scores,
      targetMapData: targetMap(8000),
    };
  },
  actions: {
    setScore: (modifier, { game, playerId }) => {
      game.scores[playerId] += modifier;
      game.playerIds.forEach((playerId) => {
        console.log(game.scores[playerId]);
      });
    },
  },
});
