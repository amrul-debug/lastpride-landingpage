import { writable, derived } from 'svelte/store';
import { SAMPQuery } from '../api/samp-query';
import type { ServerState } from '../types/samp';
import { SERVER, TIMING, DEFAULT_VALUES } from '../config/constants';

/**
 * Default server state
 */
const DEFAULT_STATE: ServerState = {
  players: DEFAULT_VALUES.PLAYERS,
  maxPlayers: DEFAULT_VALUES.MAX_PLAYERS,
  serverName: DEFAULT_VALUES.SERVER_NAME,
  gameMode: DEFAULT_VALUES.GAME_MODE,
  language: DEFAULT_VALUES.LANGUAGE,
  isPassworded: DEFAULT_VALUES.IS_PASSWORDED,
  isOnline: false,
  lastUpdate: null,
  ping: DEFAULT_VALUES.PING,
  playerList: []
};

/**
 * Create a server store for managing server state
 */
function createServerStore() {
  const { subscribe, update } = writable<ServerState>(DEFAULT_STATE);

  const sampQuery = new SAMPQuery(SERVER.IP, SERVER.PORT);

  let lastSuccessfulUpdate = 0;
  let updatePromise: Promise<void> | null = null;

  /**
   * Update server information
   * @returns Promise that resolves when the update is complete
   */
  const updateServerInfo = async (): Promise<void> => {
    if (updatePromise) return updatePromise;

    const now = Date.now();
    if (now - lastSuccessfulUpdate < TIMING.MIN_UPDATE_INTERVAL) {
      return Promise.resolve();
    }

    updatePromise = (async () => {
      try {
        const [info, ping] = await Promise.all([
          sampQuery.getServerInfo(),
          sampQuery.getPing()
        ]);

        if (info) {
          const playerList = await sampQuery.getPlayers();

          update(state => ({
            ...state,
            ...info,
            ping,
            isOnline: true,
            lastUpdate: new Date(),
            playerList
          }));

          lastSuccessfulUpdate = Date.now();
        } else {
          update(state => ({
            ...state,
            isOnline: false,
            ping: -1,
            lastUpdate: new Date()
          }));
        }
      } catch (error) {
        console.error('Failed to update server info:', error);
        update(state => ({
          ...state,
          isOnline: false,
          lastUpdate: new Date()
        }));
      } finally {
        updatePromise = null;
      }
    })();

    return updatePromise;
  };

  /**
   * Start polling for server information
   * @returns Cleanup function to stop polling
   */
  const startPolling = (): (() => void) => {
    updateServerInfo();

    const intervalId = setInterval(updateServerInfo, TIMING.SERVER_POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  };

  const isOnline = derived(
    { subscribe },
    $store => $store.isOnline
  );

  const playerCount = derived(
    { subscribe },
    $store => $store.players
  );

  const playerList = derived(
    { subscribe },
    $store => $store.playerList
  );

  const serverPing = derived(
    { subscribe },
    $store => $store.ping
  );

  return {
    subscribe,
    startPolling,
    forceUpdate: updateServerInfo,
    isOnline,
    playerCount,
    playerList,
    serverPing
  };
}

export const serverStore = createServerStore();