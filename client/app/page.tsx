"use client"

import Head from "next/head";
import { useEffect, useEffectEvent, useState } from "react";
import Logo from "./components/logo";
import Login from "./components/login";
import { GameState, Message, Points } from "./types";
import Results from "./components/results";
import Cards from "./components/cards";
import Players from "./components/players";

export default function Home() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [game, setGame] = useState<GameState | null>(null);
  const [name, setName] = useState('');

  const NEXT_PUBLIC_WSS = process.env.NEXT_PUBLIC_WSS || 'ws://localhost:3001/';

  const openWebSocket = useEffectEvent(() => {
    if (!ws) {
      const _ws = new WebSocket(NEXT_PUBLIC_WSS);
      _ws.onopen = () => {
        console.log('WebSocket connection established.');
      };
      _ws.onmessage = (e) => {
        console.log('Message from server ', e.data);
        setGame(JSON.parse(e.data));
      };
      setWs(_ws);
    }
  });

  useEffect(() => {
    openWebSocket();
  }, [])

  if (!ws || !game) {
    return (<div>loading...</div>);
  }

  const sendMessage = (data: Message) => {
    ws.send(JSON.stringify(data));
  };

  const playerAdd = () => {
    if (name !== '') {
      sendMessage({
        type: 'ADD_PLAYER',
        name,
      });
    }
  };

  const playerVote = (p: Points) => {
    sendMessage({
      type: 'SET_VOTE',
      name,
      points: p,
    });
  };

  const roundReset = () => {
    sendMessage({
      type: 'NEW_ROUND',
    });
  };

  const roundEndVote = () => {
    sendMessage({
      type: 'END_ROUND',
    });
  };

  const gameNew = () => {
    if (window.confirm('Do you really want to kick everyone from the game?')) {
      sendMessage({
        type: 'NEW_GAME',
      });
    }
  };

  const setTitle = (title: string) => {
    sendMessage({
      type: 'SET_TITLE',
      name: title,
    });
  };

  let mainPanel;

  if (game && game.players && game.players.find((p) => p.name === name)) {
    if (game.playing) {
      mainPanel = (
        <Cards
          game={game}
          name={name}
          playerVote={playerVote}
          roundEndVote={roundEndVote}
          setTitle={setTitle}
        />
      );
    } else {
      mainPanel = (
        <Results
          game={game}
          roundReset={roundReset}
        />
      );
    }
  } else {
    mainPanel = (
      <Login
        playerAdd={playerAdd}
        setName={setName}
      />
    );
  }

  return (
    <div className="min-h-screen bg-base-300 base-content">
      <Head>
        <title>estim8 | Poker planning</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <nav className="bg-neutral text-neutral-content shadow">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-20">
            <Logo height={50} />
            <div className="text-center montserrat px-4">
              <div>
                <span className="text-5xl font-extralight">estim</span>
                <span className="text-4xl font-light">8</span>
              </div>
              <div className="text-xs tracking-widest font-thin -mt-1">POKER PLANNING</div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto">
        <div className="flex space-x-4 my-10">
          <div className="w-3/4 rounded-xl px-4 py-4 bg-base-100 rounded-lg">
            {mainPanel}
          </div>
          <div className="w-1/4 rounded-xl px-4 py-4 bg-base-100 rounded-lg">
            <span className="text-lg leading-6 font-medium">Players</span>
            <Players game={game} />
          </div>
        </div>
      </div>
      <div className="text-center text-xs p-2">
        <p>
          <span>&copy; {new Date().getFullYear()}</span>
          <span><a href="https://github.com/fabrice404" target="_blank" rel="noreferrer" className="text-primary px-1">Fabrice Lamant</a></span>
          <span>|</span>
          <button onClick={() => { gameNew(); }} type="button" className="px-1 cursor-pointer">reset game</button>
        </p>
      </div>
    </div>
  );
}
