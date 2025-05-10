<script lang="ts">
  import { onMount } from 'svelte';
  
  let heroText = '';
  const targetHeroText = 'Welcome to Los Santos';
  let charIndex = 0;
  let isTyping = false;
  
  onMount(() => {
    setTimeout(startTyping, 500);
  });
  
  function startTyping() {
    isTyping = true;
    const typeInterval = setInterval(() => {
      if (charIndex < targetHeroText.length) {
        heroText += targetHeroText.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        isTyping = false;
      }
    }, 100);
  }
</script>

<section class="relative bg-gta-dark min-h-[90vh] flex items-center">
  <!-- Background Image with Overlay -->
  <div class="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat">
    <div class="absolute inset-0 bg-gta-dark bg-opacity-70"></div>
  </div>
  
  <div class="container mx-auto px-4 relative z-10">
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="font-pricedown text-5xl md:text-7xl mb-4 text-gta-green gta-text">
        LastPride<span class="text-gta-orange">RP</span>
      </h1>
      
      <div class="h-14 mb-6">
        <h2 class="font-pricedown text-2xl md:text-3xl text-white gta-text">
          {heroText}<span class={isTyping ? 'animate-pulse' : 'hidden'}>|</span>
        </h2>
      </div>
      
      <p class="text-lg md:text-xl mb-8 text-gray-300">
        Experience the ultimate San Andreas Multiplayer roleplay server. 
        Join a thriving community with custom scripts, unique features, and endless opportunities.
      </p>
      
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <a 
          href="#/how-to-join" 
          class="btn btn-primary text-lg px-8 py-3 font-pricedown"
        >
          Join Server
        </a>
        <a 
          href="#/features" 
          class="btn bg-gta-dark text-white border-2 border-gta-green hover:bg-gta-green hover:text-white transition-all duration-300 text-lg px-8 py-3 font-pricedown"
        >
          Features
        </a>
      </div>
      
      <!-- Server Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
        <div class="stats-card">
          <span class="text-3xl font-bold text-gta-green">158</span>
          <span class="text-sm text-gray-400">Players Online</span>
        </div>
        <div class="stats-card">
          <span class="text-3xl font-bold text-gta-blue">10K+</span>
          <span class="text-sm text-gray-400">Registered Users</span>
        </div>
        <div class="stats-card">
          <span class="text-3xl font-bold text-gta-orange">99.9%</span>
          <span class="text-sm text-gray-400">Uptime</span>
        </div>
        <div class="stats-card">
          <span class="text-3xl font-bold text-gta-purple">24/7</span>
          <span class="text-sm text-gray-400">Support</span>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Scroll Down Indicator -->
  <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
    <svg class="w-8 h-8 text-gta-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
    </svg>
  </div>
</section>