import { GameState, Player } from "../types";

const Players = ({ game }: { game: GameState }) => {
  if (!game) {
    return (<div>loading</div>);
  }

  return (
    <div>
      <fieldset className="fieldset">
        {
          game.players
            .toSorted((a: Player, b: Player) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))
            .map((player: Player) => {
              return (
                <label className="label" key={player.name}>
                  <input
                    checked={!!player.points}
                    className="checkbox checkbox-xs rounded-sm cursor-default checked:border-green-400 checked:bg-green-400"
                    id={player.name}
                    readOnly={true}
                    type="checkbox" />
                  {player.name}
                </label>
              );
            })
        }
      </fieldset>
    </div>
  );
};

export default Players;
