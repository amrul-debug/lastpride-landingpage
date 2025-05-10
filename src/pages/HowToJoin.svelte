<script lang="ts">
  import HowToJoin from '../components/HowToJoin.svelte';
  import ServerRules from '../components/ServerRules.svelte';
</script>

<div class="pt-16 bg-gta-dark">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h1 class="font-pricedown text-5xl md:text-6xl text-gta-green gta-text mb-4">How to Join</h1>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto">
        Follow these simple steps to join LastPride Roleplay and start your adventure in San Andreas.
      </p>
    </div>
  </div>
</div>

<HowToJoin />

<section class="py-16 bg-gta-dark">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">Server Rules</h2>
        <p class="text-lg text-gray-400">
          Please read and follow these rules to ensure a positive experience for everyone.
        </p>
      </div>

      <ServerRules />

      <!-- Acceptance Box -->
      <div class="mt-10 bg-gta-gray p-6 rounded-lg border-t-4 border-gta-orange">
        <h3 class="text-xl font-bold text-white mb-4">Rule Acceptance</h3>
        <p class="text-gray-400 mb-4">
          By joining LastPride Roleplay, you agree to follow all server rules. Failure to comply may result in warnings, temporary bans, or permanent bans depending on the severity and frequency of violations.
        </p>
        <div class="flex items-center justify-center">
          <a
            href="#/how-to-join"
            class="btn btn-primary text-lg px-8 py-3 font-pricedown"
          >
            I Understand & Agree
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="py-16 bg-gta-gray">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">Getting Started</h2>
        <p class="text-lg text-gray-400">
          Once you're in the server, here are some tips to help you get started.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-gta-dark p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-white mb-4">First Steps</h3>
          <ul class="space-y-4">
            <li class="flex items-start">
              <span class="bg-gta-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">1</span>
              <span class="text-gray-300">Complete the tutorial to learn basic controls and commands</span>
            </li>
            <li class="flex items-start">
              <span class="bg-gta-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">2</span>
              <span class="text-gray-300">Visit City Hall to register your character and get an ID</span>
            </li>
            <li class="flex items-start">
              <span class="bg-gta-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">3</span>
              <span class="text-gray-300">Visit the job center to find employment</span>
            </li>
            <li class="flex items-start">
              <span class="bg-gta-green text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 shrink-0">4</span>
              <span class="text-gray-300">Earn money and save for your first vehicle or property</span>
            </li>
          </ul>
        </div>

        <div class="bg-gta-dark p-6 rounded-lg shadow-lg">
          <h3 class="text-xl font-bold text-white mb-4">Useful Commands</h3>
          <div class="space-y-3">
            <div class="bg-gta-gray rounded p-2">
              <code class="text-gta-green font-mono">/help</code>
              <span class="text-gray-300 ml-2">- Shows list of commands</span>
            </div>
            <div class="bg-gta-gray rounded p-2">
              <code class="text-gta-green font-mono">/stats</code>
              <span class="text-gray-300 ml-2">- Shows your character stats</span>
            </div>
            <div class="bg-gta-gray rounded p-2">
              <code class="text-gta-green font-mono">/inventory</code>
              <span class="text-gray-300 ml-2">- Opens your inventory</span>
            </div>
            <div class="bg-gta-gray rounded p-2">
              <code class="text-gta-green font-mono">/phone</code>
              <span class="text-gray-300 ml-2">- Opens your phone</span>
            </div>
            <div class="bg-gta-gray rounded p-2">
              <code class="text-gta-green font-mono">/report [message]</code>
              <span class="text-gray-300 ml-2">- Reports an issue to admins</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>