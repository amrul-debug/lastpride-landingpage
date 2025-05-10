<script lang="ts">
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

  // SVG path for the check icon
  const CHECK_ICON = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>`;

  /**
   * Set the active category
   * @param index Category index
   */
  function setActiveCategory(index: number): void {
    activeCategory = index;
  }
</script>

<div class="bg-gta-gray rounded-lg shadow-lg overflow-hidden">
  <div class="flex flex-col md:flex-row">
    <!-- Categories Sidebar -->
    <div class="md:w-1/3 bg-gta-dark">
      <ul class="py-2">
        {#each rules as category, i}
          <li>
            <button
              class="w-full text-left px-4 py-3 transition-colors {i === activeCategory ? 'bg-gta-green text-white' : 'text-gray-300 hover:bg-gta-gray'}"
              on:click={() => setActiveCategory(i)}
              aria-current={i === activeCategory ? 'true' : undefined}
            >
              {category.category}
            </button>
          </li>
        {/each}
      </ul>
    </div>

    <!-- Rules Content -->
    <div class="md:w-2/3 p-6">
      <h3 class="font-pricedown text-2xl text-white mb-4">{rules[activeCategory].category}</h3>

      <ul class="space-y-2">
        {#each rules[activeCategory].rules as rule}
          <li class="flex items-start">
            <svg class="w-5 h-5 text-gta-green mt-1 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {@html CHECK_ICON}
            </svg>
            <span class="text-gray-300">{rule}</span>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</div>
