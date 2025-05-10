<script lang="ts">
  import { push } from 'svelte-spa-router';
</script>

<section class="min-h-[80vh] flex items-center justify-center bg-gta-dark">
  <div class="container mx-auto px-4 text-center">
    <h1 class="font-pricedown text-6xl md:text-8xl text-gta-orange gta-text mb-6">404</h1>
    <h2 class="font-pricedown text-3xl md:text-4xl text-white mb-6">Page Not Found</h2>
    <p class="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
      Looks like you're in the wrong part of San Andreas. This page doesn't exist or has been moved.
    </p>
    <button 
      class="btn btn-primary text-lg px-8 py-3 font-pricedown"
      on:click={() => push('/')}
    >
      Return to Home
    </button>
    
    <div class="mt-12">
      <img 
        src="https://images.pexels.com/photos/5086489/pexels-photo-5086489.jpeg" 
        alt="Lost in San Andreas" 
        class="max-w-md mx-auto rounded-lg shadow-lg opacity-70"
      />
    </div>
  </div>
</section>