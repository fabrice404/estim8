import { PieChart } from 'react-minimal-pie-chart';
import { GameState, Player, Result } from '../types';
import { BaseDataEntry } from 'react-minimal-pie-chart/dist/commonTypes';

const Results = ({ game, roundReset }: { game: GameState, roundReset: () => void }) => {
  if (!game) {
    return (<div>loading</div>);
  }

  const colors = ['#ffc907', '#ec018c', '#2488c9', '#e03d26', '#2488c9', '#20abdb', '#2d3485'];

  const results: Result[] = game.players
    .filter((p) => !!p.points)
    .reduce((acc: Result[], player: Player) => {
      let item = acc.find((i) => i.points === player.points);
      if (!item) {
        item = { points: player.points!, players: [] };
        acc.push(item);
      }
      item.players.push(player.name);
      return acc;
    }, []);

  const donutData: BaseDataEntry[] = results
    .toSorted((a, b) => (a.points > b.points ? 1 : -1))
    .map((res) => ({
      title: res.points,
      value: res.players.length,
      color: colors.shift() || '#000000',
    }));

  return (
    <div>
      <div className="text-2xl mb-4">
        <span>{game.title}</span>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/3 align-middle">
          <table className="table-auto w-full divide-y">
            <thead>
              <tr>
                <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase">
                  Pts
                </th>
                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Players
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {
                results.toSorted((a: Result, b: Result) => (a.points > b.points ? 1 : -1))
                  .map((result: Result) => (
                    <tr key={`result:${result.points}`}>
                      <td className="px-4 py-2 text-center whitespace-nowrap">
                        {result.points}
                      </td>
                      <td className="px-4 py-2">
                        {result.players.sort().map((p) => p).join(', ')}
                      </td>
                    </tr>
                  ))
              }
            </tbody>
          </table>
        </div>
        <div className="w-2/3 p-10">
          <PieChart
            className="w-80 mx-auto"
            lineWidth={20}
            label={({ dataEntry }) => dataEntry.title}
            labelStyle={(index) => ({
              fill: donutData[index].color,
              fontSize: '8px',
              fontFamily: 'sans-serif',
            })}
            labelPosition={60}
            data={donutData}
            startAngle={270}
          />
        </div>
      </div>
      <div className="text-right mt-5">
        <button
          onClick={roundReset}
          className="btn btn-primary rounded-md shadow-md py-2 px-4 transition duration-75 ease-in-out"
          type="button"
        >
          Start new voting round
        </button>
      </div>
    </div>
  );
};

export default Results;
