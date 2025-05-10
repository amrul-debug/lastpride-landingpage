<script lang="ts">
  import Features from '../components/Features.svelte';
  
  const additionalFeatures = [
    {
      title: "Dynamic Weather System",
      description: "Experience realistic weather patterns that affect gameplay, visibility, and vehicle handling.",
      icon: "⛈️"
    },
    {
      title: "Gang Territory Control",
      description: "Form gangs and battle for control of territories across San Andreas. Control areas to earn passive income.",
      icon: "🔫"
    },
    {
      title: "Realistic Inventory System",
      description: "Manage your items with weight restrictions and different storage options.",
      icon: "🎒"
    },
    {
      title: "Advanced Farming",
      description: "Grow, harvest, and sell crops. Manage your farm with seasonal changes affecting crop yields.",
      icon: "🌾"
    },
    {
      title: "Banking & Investment",
      description: "Deposit money, take loans, and invest in businesses for passive income.",
      icon: "🏦"
    },
    {
      title: "Illegal Activities",
      description: "Engage in various criminal activities including drug manufacturing, smuggling, and more.",
      icon: "🔍"
    },
    {
      title: "Phone System",
      description: "Call other players, send texts, use GPS navigation, and access various apps.",
      icon: "📱"
    },
    {
      title: "Custom Mission System",
      description: "Complete tasks and missions for rewards, experience, and reputation.",
      icon: "📋"
    }
  ];
</script>

<div class="pt-16 bg-gta-dark">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h1 class="font-pricedown text-5xl md:text-6xl text-gta-green gta-text mb-4">Server Features</h1>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto">
        LastPride Roleplay offers a comprehensive set of features designed to provide the most immersive San Andreas Multiplayer experience.
      </p>
    </div>
  </div>
</div>

<Features />

<section class="py-16 bg-gta-gray">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">Additional Features</h2>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto">
        Discover even more features that make LastPride Roleplay the premier SAMP server.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {#each additionalFeatures as feature}
        <div class="feature-card h-full">
          <div class="text-4xl mb-4">{feature.icon}</div>
          <h3 class="text-xl font-bold mb-2 text-white">{feature.title}</h3>
          <p class="text-gray-400">{feature.description}</p>
        </div>
      {/each}
    </div>
    
    <div class="mt-16 text-center">
      <a 
        href="#/how-to-join" 
        class="btn btn-primary text-lg px-8 py-3 font-pricedown"
      >
        Join Server Now
      </a>
    </div>
  </div>
</section>

<section class="py-16 bg-gta-dark">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">Regular Updates</h2>
        <p class="text-lg text-gray-400">
          We're constantly working to improve the server and add new features based on community feedback.
        </p>
      </div>
      
      <div class="bg-gta-gray p-8 rounded-lg shadow-lg">
        <h3 class="font-pricedown text-2xl text-white mb-6">Upcoming Features</h3>
        
        <div class="space-y-6">
          <div class="flex items-start">
            <div class="bg-gta-green text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Advanced Crafting System</h4>
              <p class="text-gray-400">Craft weapons, tools, furniture, and more with a comprehensive crafting system.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-gta-green text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Fishing System</h4>
              <p class="text-gray-400">Fish in various locations with different species, rarities, and competitions.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-gta-green text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Advanced Property Customization</h4>
              <p class="text-gray-400">Fully customize your properties with furniture placement, wall colors, and more.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-gta-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Casino Minigames</h4>
              <p class="text-gray-400">Play poker, blackjack, slots, and other gambling games in our upcoming casino.</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-gta-orange text-white rounded-full w-10 h-10 flex items-center justify-center mr-4 shrink-0">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div>
              <h4 class="text-lg font-bold text-white">Custom Interiors Update</h4>
              <p class="text-gray-400">New building interiors for businesses, government buildings, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>