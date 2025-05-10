<script lang="ts">
  import PlayerList from './PlayerList.svelte';

  const steps = [
    {
      number: 1,
      title: "Download GTA San Andreas",
      description: "Purchase and install GTA San Andreas from Steam, Rockstar Games, or other legitimate sources.",
      icon: "💾"
    },
    {
      number: 2,
      title: "Install SA-MP Client",
      description: "Download and install the latest SA-MP client from the official website.",
      icon: "🔧"
    },
    {
      number: 3,
      title: "Create an Account",
      description: "Join our server and create your character account in-game or through our website.",
      icon: "👤"
    },
    {
      number: 4,
      title: "Connect to the Server",
      description: "Add our server (152.42.168.229:7777) to your favorites and connect.",
      icon: "🌐"
    }
  ];
</script>

<section class="py-16 bg-gta-dark" id="how-to-join">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">How to Join</h2>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto">
        Follow these simple steps to join LastPride Roleplay and start your journey in San Andreas.
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <div class="relative">
        <!-- Timeline Line -->
        <div class="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gta-green"></div>

        {#each steps as step, i}
          <div class="relative mb-16 last:mb-0">
            <div class={`flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              <!-- Timeline Point -->
              <div class="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-gta-green flex items-center justify-center text-white font-bold text-lg z-10">
                  {step.number}
                </div>
              </div>

              <!-- Mobile Number -->
              <div class="md:hidden w-12 h-12 rounded-full bg-gta-green flex items-center justify-center text-white font-bold text-lg mb-4">
                {step.number}
              </div>

              <!-- Content -->
              <div class={`bg-gta-gray p-6 rounded-lg ${i % 2 === 0 ? 'md:mr-8 md:text-right' : 'md:ml-8'} w-full md:w-[calc(50%-2rem)]`}>
                <div class="text-4xl mb-4">{step.icon}</div>
                <h3 class="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p class="text-gray-400">{step.description}</p>
              </div>

              <!-- Spacer for the timeline -->
              <div class="hidden md:block w-[calc(50%-2rem)]"></div>
            </div>
          </div>
        {/each}
      </div>

      <!-- Server Info Box -->
      <div class="mt-16 bg-gta-gray p-8 rounded-lg border-t-4 border-gta-green">
        <h3 class="font-pricedown text-2xl text-white mb-4">Server Information</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div class="mb-4">
              <p class="font-bold text-gta-green mb-1">Server Address:</p>
              <div class="flex items-center">
                <input
                  type="text"
                  value="152.42.168.229:7777"
                  readonly
                  class="bg-gta-dark text-white p-2 rounded flex-1 mr-2 focus:outline-none focus:ring-2 focus:ring-gta-green"
                />
                <button
                  class="btn btn-primary py-2"
                  on:click={() => {
                    navigator.clipboard.writeText('152.42.168.229:7777');
                    alert('Server address copied!');
                  }}
                >
                  Copy
                </button>
              </div>
            </div>

            <div class="mb-4">
              <p class="font-bold text-gta-green mb-1">Server Version:</p>
              <p class="text-white">SA-MP 0.3.7</p>
            </div>

            <div>
              <p class="font-bold text-gta-green mb-1">Game Mode:</p>
              <p class="text-white">Roleplay</p>
            </div>
          </div>

          <div>
            <div class="mb-4">
              <p class="font-bold text-gta-green mb-1">Downloads:</p>
              <ul class="space-y-2">
                <li>
                  <a
                    href="https://www.sa-mp.com/download.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-gta-blue hover:text-gta-green flex items-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    SA-MP Client
                  </a>
                </li>
                <li>
                  <a
                    href="https://lastpriderp.com/downloads/modpack.zip"
                    class="text-gta-blue hover:text-gta-green flex items-center"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Modpack (Optional)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p class="font-bold text-gta-green mb-1">Support:</p>
              <a
                href="https://discord.gg"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gta-blue hover:text-gta-green flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3847-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037A19.7363 19.7363 0 004.2918 4.37a.0699.0699 0 00-.0322.0276C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"></path>
                </svg>
                Join our Discord for Support
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Player List -->
      <div class="mt-16">
        <PlayerList maxPlayersToShow={5} />
      </div>
    </div>
  </div>
</section>