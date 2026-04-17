export type Points = number | string | null;

export type Message = {
  type: string;
  name?: string;
  points?: Points;
};

export type Player = {
  name: string;
  points: Points;
};

export type GameState = {
  playing: boolean;
  title: string;
  players: Player[];
  lastUpdate: Date;
};

export type Result = {
  points: string | number;
  players: string[];
};
