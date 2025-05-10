<script lang="ts">
  const newsItems = [
    {
      title: "Gang Territory Update",
      date: "June 15, 2025",
      excerpt: "New gang territories have been added across Los Santos with exclusive rewards and challenges.",
      image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
      tag: "Feature Update"
    },
    {
      title: "Summer Event Coming Soon",
      date: "June 10, 2025",
      excerpt: "Get ready for our summer beach party event with exclusive rewards and activities.",
      image: "https://images.pexels.com/photos/1553962/pexels-photo-1553962.jpeg",
      tag: "Event"
    },
    {
      title: "New Vehicle Pack Released",
      date: "June 5, 2025",
      excerpt: "We've added 15 new custom vehicles to the server, available at various dealerships.",
      image: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg",
      tag: "Content Update"
    }
  ];
</script>

<section class="py-16 bg-gta-gray" id="news">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h2 class="font-pricedown text-4xl md:text-5xl text-gta-green gta-text mb-4">News & Updates</h2>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto">
        Stay up to date with the latest server updates, events, and community news.
      </p>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each newsItems as item}
        <div class="bg-gta-dark rounded-lg overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
          <div class="h-48 overflow-hidden">
            <img src={item.image} alt={item.title} class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-center mb-4">
              <span class="text-xs text-gray-400">{item.date}</span>
              <span class="text-xs bg-gta-green text-white px-2 py-1 rounded">{item.tag}</span>
            </div>
            <h3 class="text-xl font-bold mb-2 text-white">{item.title}</h3>
            <p class="text-gray-400 mb-4">{item.excerpt}</p>
            <a href="#" class="text-gta-green hover:text-gta-blue font-bold flex items-center">
              Read More
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      {/each}
    </div>
    
    <div class="text-center mt-12">
      <a href="#" class="btn bg-transparent text-white border-2 border-gta-green hover:bg-gta-green transition-all duration-300">
        View All News
      </a>
    </div>
  </div>
</section>