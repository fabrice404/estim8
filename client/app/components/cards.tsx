import { GameState, Player, Points } from "../types";

const Cards = ({
  game, name, playerVote, roundEndVote, setTitle,
}: { game: GameState, name: string, playerVote: (points: Points) => void, roundEndVote: () => void, setTitle: (title: string) => void }) => {

  if (!game) {
    return (<div>loading</div>);
  }

  const cards = [{
    points: 0,
    subtitle: 'Already done',
    style: {
      neutral: '',
      selected: 'bg-linear-to-t from-indigo-600 to-indigo-400 text-white',
    }
  }, {
    points: 1,
    subtitle: 'Trivial',
    style: {
      neutral: 'border-blue-400',
      selected: 'bg-linear-to-t from-blue-600 to-blue-400 text-white',
    }
  }, {
    points: 2,
    subtitle: 'Small change',
    style: {
      neutral: 'border-green-400',
      selected: 'bg-linear-to-t from-green-600 to-green-400 text-white',
    }
  }, {
    points: 3,
    subtitle: 'Normal change',
    style: {
      neutral: 'border-yellow-400',
      selected: 'bg-linear-to-t from-yellow-600 to-yellow-400 text-white',
    }
  }, {
    points: 5,
    subtitle: 'Needs thinking',
    style: {
      neutral: 'border-orange-400',
      selected: 'bg-linear-to-t from-orange-600 to-orange-400 text-white',
    }
  }, {
    points: 8,
    subtitle: 'Big change',
    style: {
      neutral: 'border-purple-400',
      selected: 'bg-linear-to-t from-purple-600 to-purple-400 text-white',
    }
  }, {
    points: 13,
    subtitle: 'Needs to be split',
    style: {
      neutral: 'border-red-400',
      selected: 'bg-linear-to-t from-red-600 to-red-400 text-white',
    }
  }, {
    points: '∞',
    subtitle: 'Infinity and Beyond',
    style: {
      neutral: '',
      selected: 'bg-linear-to-t from-indigo-600 to-indigo-400 text-white',
    }
  }, {
    points: '?',
    subtitle: "I don't know",
    style: {
      neutral: '',
      selected: 'bg-linear-to-t from-indigo-600 to-indigo-400 text-white',
    }
  }, {
    points: '☕️',
    subtitle: 'I need a break',
    style: {
      neutral: '',
      selected: 'bg-linear-to-t from-indigo-600 to-indigo-400 text-white',
    }
  }];

  const myPoints = game.players.find((p: Player) => p.name === name)?.points;
  return (
    <div>
      <div className="text-2xl mb-4">
        <input className="input" type="text" value={game.title} onChange={(e) => { setTitle(e.target.value); }} />
      </div>
      <div className="grid gap-4 grid-cols-4 lg:grid-cols-5 xl:grid-cols-8">
        {
          cards.map((card) => {
            const selected = myPoints === card.points;
            const style = selected ? card.style.selected : card.style.neutral;
            return (
              <button
                className={`rounded-md shadow text-7xl py-10 transition duration-75 ease-in-out cursor-pointer bg-linear-to-t from-base-300 to-base-100 border-4 ${style}`}
                onClick={() => { playerVote(selected ? null : card.points); }}
                key={card.points}
                type="button"
              >
                {card.points}
                <span className="block text-sm">
                  {card.subtitle}
                </span>
              </button>
            );
          })
        }
      </div>
      <div className="text-right mt-5">
        <button
          onClick={roundEndVote}
          className="btn btn-primary rounded-md shadow-md py-2 px-4 transition duration-75 ease-in-out"
          type="button"
        >
          End vote
        </button>
      </div>
    </div>
  );
};

export default Cards;
