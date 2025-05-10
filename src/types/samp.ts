export interface ServerInfo {
  players: number;
  maxPlayers: number;
  serverName: string;
  gameMode: string;
  language: string;
  isPassworded: boolean;
  ping?: number;
}

export interface PlayerInfo {
  id: number;
  name: string;
  score: number;
  ping: number;
}

export interface ServerState extends ServerInfo {
  isOnline: boolean;
  lastUpdate: Date | null;
  ping: number;
  playerList: PlayerInfo[];
}

export interface RuleCategory {
  category: string;
  rules: string[];
}

export interface NewsItem {
  title: string;
  content: string;
  date: Date;
  author: string;
  imageUrl?: string;
}

export interface GalleryItem {
  imageUrl: string;
  title: string;
  description: string;
  tags: string[];
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface JoinStep {
  number: number;
  title: string;
  description: string;
  icon: string;
}
