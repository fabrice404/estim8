import express from "express";
import http from "node:http";
import WebSocket from "ws";

import { Game } from "./game";

const main = () => {
  const server = http.createServer(express);
  const wss = new WebSocket.Server({ server });

  const game = new Game();

  wss.on("connection", (ws: WebSocket) => {
    ws.send(game.get());
    ws.on("message", (message: string) => {
      const played = game.play(message);
      if (played) {
        [...wss.clients]
          .filter((client) => client.readyState === WebSocket.OPEN)
          .forEach((client) => {
            client.send(played);
          });
      }
    });
  });
  server.listen(3001, () => {
    game.play(JSON.stringify({ type: "NEW_GAME" }));
    console.log("Server started on port 3001");
  });
};

main();
