<script lang="ts">
  import { onMount } from 'svelte';

  const categories = [
    'All', 'Vehicles', 'Properties', 'Events', 'Roleplay', 'Locations'
  ];

  const galleryImages = [
    {
      url: "https://images.pexels.com/photos/3894157/pexels-photo-3894157.jpeg",
      caption: "Countryside driving",
      category: "Locations"
    },
    {
      url: "https://images.pexels.com/photos/3422964/pexels-photo-3422964.jpeg",
      caption: "Custom vehicles showcase",
      category: "Vehicles"
    },
    {
      url: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
      caption: "Downtown Los Santos at night",
      category: "Locations"
    },
    {
      url: "https://images.pexels.com/photos/3321793/pexels-photo-3321793.jpeg",
      caption: "Police roleplay scenario",
      category: "Roleplay"
    },
    {
      url: "https://images.pexels.com/photos/5086489/pexels-photo-5086489.jpeg",
      caption: "Street racing event",
      category: "Events"
    },
    {
      url: "https://images.pexels.com/photos/3062541/pexels-photo-3062541.jpeg",
      caption: "Custom property interiors",
      category: "Properties"
    },
    {
      url: "https://images.pexels.com/photos/3807319/pexels-photo-3807319.jpeg",
      caption: "Beach party event",
      category: "Events"
    },
    {
      url: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg",
      caption: "Luxury apartment",
      category: "Properties"
    },
    {
      url: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg",
      caption: "Desert exploration",
      category: "Locations"
    },
    {
      url: "https://images.pexels.com/photos/2387818/pexels-photo-2387818.jpeg",
      caption: "Sports car collection",
      category: "Vehicles"
    },
    {
      url: "https://images.pexels.com/photos/2526128/pexels-photo-2526128.jpeg",
      caption: "Hospital emergency scene",
      category: "Roleplay"
    },
    {
      url: "https://images.pexels.com/photos/1687147/pexels-photo-1687147.jpeg",
      caption: "Gang meeting",
      category: "Roleplay"
    }
  ];

  let filteredImages = [...galleryImages];
  let activeCategory = 'All';
  let currentImage = 0;
  let isModalOpen = false;
  let imageElements = [];

  function filterImages(category: string) {
    activeCategory = category;

    if (category === 'All') {
      filteredImages = [...galleryImages];
    } else {
      filteredImages = galleryImages.filter(img => img.category === category);
    }
  }

  function openModal(index: number) {
    currentImage = index;
    isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  function nextImage() {
    currentImage = (currentImage + 1) % filteredImages.length;
  }

  function prevImage() {
    currentImage = (currentImage - 1 + filteredImages.length) % filteredImages.length;
  }

  onMount(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
</script>

<div class="pt-16 bg-gta-dark">
  <div class="container mx-auto px-4">
    <div class="text-center mb-16">
      <h1 class="font-pricedown text-5xl md:text-6xl text-gta-green gta-text mb-4">Gallery</h1>
      <p class="text-lg text-gray-400 max-w-3xl mx-auto">
        Browse screenshots from the LastPride Roleplay server and see the world of San Andreas through our community's eyes.
      </p>
    </div>
  </div>
</div>

<section class="py-16 bg-gta-gray">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap justify-center gap-4 mb-12">
      {#each categories as category}
        <button
          class={`px-4 py-2 rounded-full transition-all duration-300 ${activeCategory === category ? 'bg-gta-green text-white' : 'bg-gta-dark text-white hover:bg-gta-green hover:text-white'}`}
          on:click={() => filterImages(category)}
        >
          {category}
        </button>
      {/each}
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {#each filteredImages as image, i}
        <div
          class="rounded-lg overflow-hidden cursor-pointer transform hover:scale-[1.02] transition-all duration-300 shadow-md h-64"
          on:click={() => openModal(i)}
          on:keydown={(e) => e.key === 'Enter' && openModal(i)}
          tabindex="0"
          role="button"
          aria-label={`View image: ${image.caption}`}
          bind:this={imageElements[i]}
        >
          <div class="relative h-full">
            <img
              src={image.url}
              alt={image.caption}
              class="w-full h-full object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70 transition-opacity duration-300 hover:opacity-40"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="text-white font-bold">{image.caption}</p>
              <p class="text-gray-300 text-sm">{image.category}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <div class="text-center mt-12">
      <button class="px-6 py-3 bg-transparent text-white border-2 border-gta-green hover:bg-gta-green transition-all duration-300 rounded">
        Load More
      </button>
    </div>
  </div>

  {#if isModalOpen}
    <div
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div class="relative max-w-4xl w-full p-4">
        <div class="text-right mb-2">
          <button
            class="text-white text-2xl hover:text-gta-green"
            on:click={closeModal}
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <div class="relative">
          <img
            src={filteredImages[currentImage].url}
            alt={filteredImages[currentImage].caption}
            class="w-full h-auto max-h-[80vh] object-contain"
            id="modal-title"
          />

          <button
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gta-dark bg-opacity-50 hover:bg-gta-green text-white p-2 rounded-full"
            on:click={prevImage}
            aria-label="Previous image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <button
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gta-dark bg-opacity-50 hover:bg-gta-green text-white p-2 rounded-full"
            on:click={nextImage}
            aria-label="Next image"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <div class="text-center mt-4 text-white">
          <p class="font-bold">{filteredImages[currentImage].caption}</p>
          <p class="text-sm text-gray-400">
            {filteredImages[currentImage].category} • Image {currentImage + 1} of {filteredImages.length}
          </p>
        </div>

        <button
          class="fixed inset-0 z-[-1] opacity-0"
          on:click={closeModal}
          aria-label="Close modal background"
        ></button>
      </div>
    </div>
  {/if}
</section>