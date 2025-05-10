<script lang="ts">
  import { serverStore } from '../stores/server-store';
  import { UI } from '../config/constants';
  import { getPingColorClass } from '../utils/helpers';

  export let maxPlayersToShow = UI.MAX_PLAYERS_TO_SHOW;
  let showAllPlayers = false;

  const TABLE_HEADERS = ['ID', 'Player', 'Score', 'Ping'];

  $: visiblePlayers = showAllPlayers
    ? $serverStore.playerList
    : $serverStore.playerList.slice(0, maxPlayersToShow);

  $: hasMorePlayers = $serverStore.playerList.length > maxPlayersToShow;

  function toggleShowAllPlayers(): void {
    showAllPlayers = !showAllPlayers;
  }
</script>

<div class="bg-gta-gray rounded-lg shadow-lg p-6">
  <div class="flex justify-between items-center mb-4">
    <h3 class="font-pricedown text-2xl text-white">Online Players</h3>
    <div class="text-gta-green font-bold">
      {$serverStore.players}/{$serverStore.maxPlayers}
    </div>
  </div>

  {#if $serverStore.isOnline}
    {#if $serverStore.playerList.length > 0}
      <div class="overflow-hidden rounded-lg border border-gta-dark">
        <table class="min-w-full divide-y divide-gta-dark">
          <thead class="bg-gta-dark">
            <tr>
              {#each TABLE_HEADERS as header}
                <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {header}
                </th>
              {/each}
            </tr>
          </thead>

          <tbody class="bg-gta-gray divide-y divide-gta-dark">
            {#each visiblePlayers as player}
              <tr>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {player.id}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">
                  {player.name}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                  {player.score}
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-sm">
                  <span class={getPingColorClass(player.ping)}>
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
            class="text-gta-blue hover:text-gta-green transition-colors text-sm"
            on:click={toggleShowAllPlayers}
          >
            {showAllPlayers ? 'Show Less' : `Show All (${$serverStore.playerList.length})`}
          </button>
        </div>
      {/if}
    {:else}
      <div class="text-center py-8 text-gray-400">
        No players online at the moment
      </div>
    {/if}
  {:else}
    <div class="text-center py-8 text-gta-red">
      Server is currently offline
    </div>
  {/if}
</div>
