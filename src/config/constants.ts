
export const SERVER = {
  IP: '152.42.168.229',
  PORT: 7777,
  DEFAULT_NAME: 'LastPride Roleplay',
  DEFAULT_GAMEMODE: 'Roleplay',
  DEFAULT_LANGUAGE: 'Indonesia',
};


export const API = {
  PROXY_URL: '/api',
  ENDPOINTS: {
    INFO: '/query/info',
    PLAYERS: '/query/players',
    PING: '/query/ping',
  },
};

export const TIMING = {
  SERVER_POLLING_INTERVAL: 30000,
  MIN_UPDATE_INTERVAL: 5000,
  QUERY_TIMEOUT: 3000,
};

export const UI = {
  ANIMATION_DURATION: 300,
  TOAST_DURATION: 3000,
  MAX_PLAYERS_TO_SHOW: 10,
};

export const ROUTES = {
  HOME: '/',
  FEATURES: '/features',
  GALLERY: '/gallery',
  HOW_TO_JOIN: '/how-to-join',
  NOT_FOUND: '*',
};

export const SOCIAL = {
  DISCORD: 'https://discord.gg/lastpriderp',
  FACEBOOK: 'https://facebook.com/lastpriderp',
  INSTAGRAM: 'https://instagram.com/lastpriderp',
  YOUTUBE: 'https://youtube.com/lastpriderp',
};

export const ASSETS = {
  LOGO: '/images/logo.png',
  FAVICON: '/favicon.svg',
  FONTS: {
    PRICEDOWN: '/fonts/pricedown.woff2',
  },
};

export const DEFAULT_VALUES = {
  PLAYERS: 0,
  MAX_PLAYERS: 100,
  SERVER_NAME: 'LastPride Roleplay',
  GAME_MODE: 'Roleplay',
  LANGUAGE: 'English',
  IS_PASSWORDED: false,
  PING: -1,
};
