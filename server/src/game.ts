type Player = {
  name: string;
  points: number | null;
}

type GameState = {
  playing: boolean;
  title: string;
  players: Player[];
  lastUpdate: Date;
}

export class Game {
  private gameState: GameState;

  constructor() {
    this.gameState = {
      playing: false,
      title: '---',
      players: [],
      lastUpdate: new Date(),
    }
  }

  private newGame() {
    this.gameState = {
      playing: false,
      title: "---",
      players: [],
      lastUpdate: new Date(),
    }
  }

  private newRound() {
    this.gameState.playing = true;
    this.gameState.players.forEach((player) => player.points = null);
    this.gameState.lastUpdate = new Date();
  }

  private endRound() {
    this.gameState.playing = false;
    this.gameState.lastUpdate = new Date();
  }

  private addPlayer(name: string) {
    this.gameState.players.push({ name, points: null });
    this.gameState.lastUpdate = new Date();
  }

  private setVote(name: string, points: number) {
    let player = this.gameState.players.find((p) => p.name === name);
    if (!player) {
      this.gameState.players.push({ name, points: null });
      player = this.gameState.players.find((p) => p.name === name);
    }
    console.log({ player })
    player!.points = points;
    console.log({ player })
    this.gameState.lastUpdate = new Date();
  }

  private setTitle(title: string) {
    this.gameState.title = title || "---";
    this.gameState.lastUpdate = new Date();
  }

  public get() {
    return JSON.stringify(this.gameState);
  }

  public play(message: string) {
    const action = JSON.parse(message);
    console.log(action);
    switch (action.type) {
      case 'NEW_GAME': this.newGame(); break;
      case 'NEW_ROUND': this.newRound(); break;
      case 'END_ROUND': this.endRound(); break;
      case 'ADD_PLAYER': this.addPlayer(action.name); break;
      case 'SET_VOTE': this.setVote(action.name, action.points); break;
      case 'SET_TITLE': this.setTitle(action.name); break;
      default: return null;
    }
    return this.get();
  }
}
