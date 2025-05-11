<script lang="ts">
  import { fade, fly } from 'svelte/transition';
  import type { RuleCategory } from '../types/samp';

  /**
   * Default server rules
   */
  export let rules: RuleCategory[] = [
    {
      category: "General Rules",
      rules: [
        "Respect all players and staff members",
        "No harassment, discrimination, or hate speech",
        "No cheating, hacking, or using modified clients",
        "No exploiting bugs or glitches",
        "English is the primary language in global chat"
      ]
    },
    {
      category: "Roleplay Rules",
      rules: [
        "Stay in character at all times while in-game",
        "No random death match (RDM)",
        "No vehicle death match (VDM)",
        "No breaking character without valid reason",
        "No metagaming (using OOC information IC)",
        "No powergaming (forcing actions on others)",
        "Respect others' roleplay scenarios"
      ]
    },
    {
      category: "Communication Rules",
      rules: [
        "Use /b for out-of-character chat",
        "Keep global chat clean and respectful",
        "No spamming or excessive caps",
        "No advertising other servers",
        "Report issues to admins using /report"
      ]
    }
  ];

  // Currently active category index
  let activeCategory = 0;
  let isAnimating = false;

  // SVG path for the check icon
  const CHECK_ICON = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`;

  /**
   * Set the active category
   * @param index Category index
   */
  function setActiveCategory(index: number): void {
    if (isAnimating || index === activeCategory) return;
    isAnimating = true;
    activeCategory = index;
    setTimeout(() => {
      isAnimating = false;
    }, 300);
  }

  function handleKeyDown(event: KeyboardEvent, index: number): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveCategory(index);
    }
  }
</script>

<div class="bg-gta-gray rounded-lg shadow-lg p-6" role="region" aria-label="Server Rules">
  <h2 class="font-pricedown text-3xl text-white mb-6">Server Rules</h2>

  <div class="flex flex-col md:flex-row gap-6">
    <!-- Category Navigation -->
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <nav class="md:w-1/4" role="navigation" aria-label="Rule Categories">
      <ul class="space-y-2">
        {#each rules as category, index}
          <li>
            <button
              class="w-full text-left px-4 py-2 rounded transition-colors {activeCategory === index ? 'bg-gta-green text-white' : 'text-gray-300 hover:bg-gta-dark'}"
              on:click={() => setActiveCategory(index)}
              on:keydown={(e) => handleKeyDown(e, index)}
              aria-current={activeCategory === index ? 'page' : undefined}
              aria-label={`${category.category} rules`}
            >
              {category.category}
            </button>
          </li>
        {/each}
      </ul>
    </nav>

    <!-- Rules Content -->
    <div class="md:w-3/4" role="tabpanel" aria-labelledby={`category-${activeCategory}`}>
      {#each rules as category, index}
        {#if index === activeCategory}
          <div
            in:fly={{ y: 20, duration: 300 }}
            out:fade={{ duration: 200 }}
            class="space-y-4"
          >
            <h3 
              id={`category-${index}`}
              class="text-xl font-bold text-gta-green mb-4"
            >
              {category.category}
            </h3>

            <ul class="space-y-3">
              {#each category.rules as rule}
                <li 
                  class="flex items-start"
                  in:fly={{ y: 20, duration: 300, delay: 100 }}
                >
                  <svg 
                    class="w-5 h-5 text-gta-green mr-3 mt-0.5 flex-shrink-0" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    {@html CHECK_ICON}
                  </svg>
                  <span class="text-gray-300">{rule}</span>
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      {/each}
    </div>
  </div>
</div>

<style>
  /* Smooth transitions */
  button {
    transition: all 0.2s ease-in-out;
  }

  /* Focus styles */
  button:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Hover effects */
  button:hover:not([aria-current="page"]) {
    transform: translateX(4px);
  }

  /* Active state */
  button[aria-current="page"] {
    font-weight: 500;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    nav {
      margin-bottom: 1rem;
    }
  }

  /* Animation preferences */
  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
    
    button:hover:not([aria-current="page"]) {
      transform: none;
    }
  }
</style>
