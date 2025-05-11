<script lang="ts">
  import { serverStore } from '../stores/server-store';
  import { UI } from '../config/constants';
  import { getPingColorClass, formatNumber } from '../utils/helpers';
  import type { PlayerInfo } from '../types/samp';

  export let maxPlayersToShow = UI.MAX_PLAYERS_TO_SHOW;
  let showAllPlayers = false;

  const TABLE_HEADERS = [
    { id: 'id', label: 'ID' },
    { id: 'player', label: 'Player' },
    { id: 'score', label: 'Score' },
    { id: 'ping', label: 'Ping' }
  ] as const;

  $: visiblePlayers = showAllPlayers
    ? $serverStore.playerList
    : $serverStore.playerList.slice(0, maxPlayersToShow);

  $: hasMorePlayers = $serverStore.playerList.length > maxPlayersToShow;
  $: sortedPlayers = [...visiblePlayers].sort((a, b) => b.score - a.score);

  function toggleShowAllPlayers(): void {
    showAllPlayers = !showAllPlayers;
  }

  function getPlayerStatus(player: PlayerInfo): string {
    if (player.ping < 100) return 'Good connection';
    if (player.ping < 200) return 'Moderate connection';
    return 'Poor connection';
  }
</script>

<div class="bg-gta-gray rounded-lg shadow-lg p-6" role="region" aria-label="Online Players">
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-pricedown text-2xl text-white">Online Players</h3>
    <div class="text-gta-green font-bold" role="status" aria-live="polite">
      <span class="sr-only">Current player count: </span>
      {$serverStore.players}/{$serverStore.maxPlayers}
    </div>
  </div>

  {#if $serverStore.isOnline}
    {#if $serverStore.playerList.length > 0}
      <div class="overflow-hidden rounded-lg border border-gta-dark">
        <table class="min-w-full divide-y divide-gta-dark" role="grid">
          <thead class="bg-gta-dark">
            <tr>
              {#each TABLE_HEADERS as header}
                <th 
                  scope="col" 
                  class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                  id={`header-${header.id}`}
                >
                  {header.label}
                </th>
              {/each}
            </tr>
          </thead>

          <tbody class="bg-gta-gray divide-y divide-gta-dark">
            {#each sortedPlayers as player, index}
              <!-- svelte-ignore a11y-no-redundant-roles -->
              <tr 
                class="hover:bg-gta-dark transition-colors"
                role="row"
                aria-rowindex={index + 1}
              >
                <td 
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-300"
                  role="cell"
                  aria-describedby="header-id"
                >
                  {player.id}
                </td>
                <td 
                  class="px-4 py-2 whitespace-nowrap text-sm font-medium text-white"
                  role="cell"
                  aria-describedby="header-player"
                >
                  {player.name}
                </td>
                <td 
                  class="px-4 py-2 whitespace-nowrap text-sm text-gray-300"
                  role="cell"
                  aria-describedby="header-score"
                >
                  {formatNumber(player.score)}
                </td>
                <td 
                  class="px-4 py-2 whitespace-nowrap text-sm"
                  role="cell"
                  aria-describedby="header-ping"
                >
                  <span 
                    class={getPingColorClass(player.ping)}
                    aria-label={`${player.ping}ms - ${getPlayerStatus(player)}`}
                  >
                    {player.ping}ms
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      {#if hasMorePlayers}
        <div class="mt-4 text-center">
          <button
            class="text-gta-blue hover:text-gta-green transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-gta-green rounded px-2 py-1"
            on:click={toggleShowAllPlayers}
            aria-expanded={showAllPlayers}
            aria-controls="player-table"
          >
            {showAllPlayers ? 'Show Less' : `Show All (${$serverStore.playerList.length})`}
          </button>
        </div>
      {/if}
    {:else}
      <div class="text-center py-8 text-gray-400" role="status">
        No players online at the moment
      </div>
    {/if}
  {:else}
    <div class="text-center py-8 text-gta-red" role="alert">
      Server is currently offline
    </div>
  {/if}
</div>

<style>
  /* Add smooth transitions */
  tr {
    transition: background-color 0.2s ease-in-out;
  }

  /* Improve table responsiveness */
  @media (max-width: 640px) {
    table {
      display: block;
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Improve focus styles */
  button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Add loading state styles */
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }
</style>
