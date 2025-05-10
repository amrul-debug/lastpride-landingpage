# LastPride Roleplay - SA:MP Server Website

A modern, responsive website for the LastPride Roleplay SA:MP server built with Svelte and TailwindCSS.

## Features

- Real-time server status and player count using the official SA-MP Query Mechanism
- Fully responsive design optimized for all devices
- GTA San Andreas-inspired theme with custom styling
- Fast and optimized performance with efficient code structure
- Dynamic image gallery with lazy loading
- News and updates section with filtering
- Community section with Discord integration
- Server rules with interactive categories

## Tech Stack

- Svelte + TypeScript
- TailwindCSS for styling
- Vite for building and development
- Node.js Express server for SA-MP Query proxy

## Getting Started

### Prerequisites

- Node.js (v14 or latest)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies for the client:
   ```bash
   npm install
   ```
3. Install dependencies for the server:
   ```bash
   cd server
   npm install
   ```

### Running the Application

1. Start the proxy server first:
   ```bash
   cd server
   npm start
   ```
   This will start the server on port 3000.

2. In a separate terminal, start the client:
   ```bash
   npm run dev
   ```
   This will start the client on port 5173.

3. Open your browser and navigate to `http://localhost:5173`

## SA-MP Query Mechanism

The website uses the official SA-MP Query Mechanism to provide real-time server information:

- Player count and detailed player list
- Server status and ping
- Game mode and server name
- Language and password status

The query updates every 30 seconds to maintain current information while preventing excessive requests.

### How it Works

1. The client sends a request to our proxy server
2. The proxy server sends a UDP packet to the SA-MP server
3. The SA-MP server responds with the requested information
4. The proxy server parses the response and sends it back to the client
5. The client displays the information in a user-friendly format

### Query Types

- **'i'** - Server information (players, max players, server name, game mode, language)
- **'d'** - Player list (ID, name, score, ping)
- **'p'** - Ping (server response time)

### Implementation Details

The implementation follows the official SA-MP Query Mechanism as documented in the [SA-MP Wiki](https://sampwiki.blast.hk/wiki/Query_Mechanism). The proxy server handles the UDP communication with the SA-MP server, while the client communicates with the proxy server using HTTP requests.

## Performance Optimizations

- Efficient code structure with proper separation of concerns
- Memoization for expensive operations
- Optimized server polling with caching
- Lazy loading for images and components
- Proper error handling and recovery
- TypeScript for better type safety and code quality

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

For support or inquiries, join our Discord server or contact us through the website.