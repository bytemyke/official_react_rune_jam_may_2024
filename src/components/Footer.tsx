/**
+ * Renders a list of players with their avatars and scores.
+ * @param {Array<string>} props.playerIds - The array of player IDs.
+ * @param {string | undefined} props.yourPlayerId - The player ID of the current player.
+ * @returns {JSX.Element} - The rendered list.
+ */

//todo, make score dynamic variable instead of 0 and update with score
export function Footer({
  playerIds,
  yourPlayerId,
}: {
  playerIds: Array<string>;
  yourPlayerId: string | undefined;
}): JSX.Element {
  return (
    <ul id="playersSection" className="footer">
      {playerIds.map((playerId: string, index: number) => {
        const player = Rune.getPlayerInfo(playerId);
        return (
          <li key={playerId} data-player={index.toString()}>
            <span className="score">{0}</span>
            <img src={player.avatarUrl} />
            <span>
              {player.playerId === yourPlayerId ? (
                <span>(You)</span>
              ) : (
                player.displayName
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
