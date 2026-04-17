# estim8

A real-time planning poker app for agile teams. Players join a session, vote on story complexity using estimation cards, and view results with a pie chart visualization.

## Tech Stack

| Layer  | Technologies                                          |
| ------ | ----------------------------------------------------- |
| Client | Next.js 16, React 19, TypeScript, Tailwind CSS, DaisyUI |
| Server | Node.js, Express 5, WebSocket (ws), TypeScript        |
| Deploy | Docker, Docker Compose                                |

## Project Structure

```
estim8/
├── client/                  # Next.js frontend
│   ├── app/
│   │   ├── components/      # login, cards, results, players, logo
│   │   ├── page.tsx         # Main page & WebSocket client
│   │   ├── layout.tsx       # Root layout
│   │   ├── types.d.ts       # TypeScript types
│   │   └── globals.css      # Tailwind + DaisyUI styles
│   ├── Dockerfile
│   └── package.json
├── server/                  # Express + WebSocket backend
│   ├── src/
│   │   ├── index.ts         # Server entry point
│   │   └── game.ts          # Game state & logic
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yaml
```

## Features

- **Real-time sync** -- WebSocket-based communication keeps all players in sync instantly
- **Estimation cards** -- Modified Fibonacci scale (0, 1, 2, 3, 5, 8, 13) plus special cards (infinity, ?, coffee break)
- **Results visualization** -- Pie chart and vote breakdown table after each round
- **Player tracking** -- Sidebar showing all participants with vote status indicators
- **Round management** -- Set a title for the item being estimated, end voting, start new rounds, or reset the game
- **Dark mode** -- Automatic light/dark theme based on system preference
- **Responsive UI** -- Works on mobile, tablet, and desktop

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm

### Development

Start the server and client in two separate terminals:

```bash
# Server (runs on http://localhost:3001)
cd server
npm install
npm run dev

# Client (runs on http://localhost:3000)
cd client
npm install
npm run dev
```

### Docker Compose

```bash
docker compose up --build
```

| Service | URL                     |
| ------- | ----------------------- |
| Client  | http://localhost:3002    |
| Server  | ws://localhost:3001     |

## Configuration

### Client

| Variable           | Default                    | Description          |
| ------------------ | -------------------------- | -------------------- |
| `NEXT_PUBLIC_WSS`  | `ws://localhost:3001/`     | WebSocket server URL |

Set in `client/.env` or pass as an environment variable at build time.

### Server

The server listens on port **3001** (configured in `server/src/index.ts`).

## How It Works

1. Players open the app and enter their name to join the session
2. Anyone can set a title for the item being estimated
3. Players select an estimation card to cast their vote (votes are hidden during the round)
4. Once voting ends, results are revealed as a pie chart and a breakdown table
5. A new round can be started for the next item, or the game can be fully reset
