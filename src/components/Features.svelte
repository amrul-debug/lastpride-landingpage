<script lang="ts">
  const features = [
    {
      title: "Custom Roleplay Economy",
      description: "A realistic economy system with multiple businesses, jobs, and investment opportunities for players to earn and manage their money.",
      icon: "💰"
    },
    {
      title: "Advanced Vehicle System",
      description: "Customizable vehicles with realistic handling, damage, and maintenance requirements. Own multiple vehicles and store them in your properties.",
      icon: "🚗"
    },
    {
      title: "Property Ownership",
      description: "Purchase and customize properties across San Andreas. From apartments to mansions, businesses to warehouses - make your mark on the city.",
      icon: "🏠"
    },
    {
      title: "Faction System",
      description: "Join the police department, emergency services, criminal organizations, or create your own faction with custom ranks and permissions.",
      icon: "👥"
    },
    {
      title: "Skills & Progression",
      description: "Develop your character's abilities through a comprehensive skill system. The more you practice, the better you become.",
      icon: "📈"
    },
    {
      title: "Custom Interiors",
      description: "Explore hundreds of custom-designed interiors throughout San Andreas, each with unique details and interactive elements.",
      icon: "🏢"
    }
  ];
</script>

<section class="py-16 bg-gta-dark" id="features">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">Server Features</h2>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto">
        LastPride Roleplay offers a variety of unique features to enhance your roleplaying experience in San Andreas.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each features as feature}
        <div class="feature-card">
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
        Start Playing Now
      </a>
    </div>
  </div>
</section>