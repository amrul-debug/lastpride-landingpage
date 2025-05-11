<script lang="ts">
  import { onMount } from 'svelte';
  import { location } from 'svelte-spa-router';
  import { serverStore } from '../stores/server-store';
  import { getPingColorClass, debounce } from '../utils/helpers';

  interface NavLink {
    path: string;
    label: string;
  }

  let isScrolled = false;
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    // Close menu when clicking outside
    if (isMenuOpen) {
      setTimeout(() => {
        const handleClickOutside = (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (!target.closest('nav') && !target.closest('button')) {
            isMenuOpen = false;
            document.removeEventListener('click', handleClickOutside);
          }
        };
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
  };

  // Debounced scroll handler for better performance
  const handleScroll = debounce(() => {
    isScrolled = window.scrollY > 50;
  }, 100);

  onMount(() => {
    window.addEventListener('scroll', handleScroll);
    serverStore.startPolling();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      // serverStore.stopPolling() is not a valid method, so we'll remove it
    };
  });

  const navLinks: NavLink[] = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/how-to-join', label: 'How to Join' }
  ];

  // Handle keyboard navigation
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isMenuOpen) {
      isMenuOpen = false;
    }
  };
</script>

<svelte:window on:keydown={handleKeyDown} />

<!-- svelte-ignore a11y-no-redundant-roles -->
<header 
  class={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gta-dark bg-opacity-95 shadow-lg py-3' : 'bg-transparent py-5'}`}
  role="banner"
>
  <div class="container mx-auto px-4 flex justify-between items-center">
    <div class="flex items-center">
      <div class="mr-4">
        <a href="/#" aria-label="LastPride RP Home">
          <h1 class="font-pricedown text-2xl md:text-3xl text-gta-green gta-text">
            LastPride<span class="text-gta-orange">RP</span>
          </h1>
        </a>
      </div>

      {#if $serverStore}
        <div class="hidden md:flex items-center border border-gta-green rounded px-3 py-1" role="status" aria-live="polite">
          <span 
            class="inline-block w-3 h-3 rounded-full {$serverStore.isOnline ? 'bg-gta-green' : 'bg-gta-red'} mr-2 animate-pulse-slow"
            aria-label={$serverStore.isOnline ? 'Server is online' : 'Server is offline'}
          ></span>
          <span class="text-sm">
            <span class="sr-only">Server status: </span>
            {$serverStore.players}/{$serverStore.maxPlayers} players online
          </span>
          {#if $serverStore.ping > 0}
            <span class="text-sm ml-2 text-gray-400" aria-hidden="true">|</span>
            <span class="text-sm ml-2 {getPingColorClass($serverStore.ping)}">
              <span class="sr-only">Ping: </span>
              {$serverStore.ping}ms
            </span>
          {/if}
        </div>
      {/if}
    </div>

    <nav class="hidden md:block" role="navigation" aria-label="Main navigation">
      <ul class="flex items-center space-x-2">
        {#each navLinks as link}
          <li>
            <a
              href={link.path === '/' ? '#' : `#${link.path}`}
              class={`nav-link ${$location === link.path ? 'active' : ''}`}
              aria-current={$location === link.path ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        {/each}
        <li>
          <a
            href="#/how-to-join"
            class="ml-4 btn btn-primary"
            aria-label="Join LastPride RP Server"
          >
            Join Server
          </a>
        </li>
      </ul>
    </nav>

    <button 
      class="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-gta-green rounded" 
      on:click={toggleMenu} 
      aria-label="Toggle menu"
      aria-expanded={isMenuOpen}
      aria-controls="mobile-menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-8 h-8">
        {#if isMenuOpen}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        {:else}
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        {/if}
      </svg>
    </button>
  </div>

  {#if isMenuOpen}
    <nav 
      id="mobile-menu"
      class="md:hidden bg-gta-gray border-t border-gta-green mt-3"
      role="navigation"
      aria-label="Mobile navigation"
    >
      <ul class="py-4 px-4">
        {#each navLinks as link}
          <li class="py-2">
            <a
              href={link.path === '/' ? '#' : `#${link.path}`}
              class={`block py-2 ${$location === link.path ? 'text-gta-green' : 'text-white'}`}
              on:click={() => isMenuOpen = false}
              aria-current={$location === link.path ? 'page' : undefined}
            >
              {link.label}
            </a>
          </li>
        {/each}
        <li class="py-2 mt-2">
          <a
            href="#/how-to-join"
            class="block w-full text-center btn btn-primary"
            on:click={() => isMenuOpen = false}
            aria-label="Join LastPride RP Server"
          >
            Join Server
          </a>
        </li>

        {#if $serverStore}
          <li class="mt-4 flex items-center justify-center">
            <div class="flex flex-col items-center" role="status" aria-live="polite">
              <div class="flex items-center border border-gta-green rounded px-3 py-1 mb-2">
                <span 
                  class="inline-block w-3 h-3 rounded-full {$serverStore.isOnline ? 'bg-gta-green' : 'bg-gta-red'} mr-2 animate-pulse-slow"
                  aria-label={$serverStore.isOnline ? 'Server is online' : 'Server is offline'}
                ></span>
                <span class="text-sm">
                  <span class="sr-only">Server status: </span>
                  {$serverStore.players}/{$serverStore.maxPlayers} players online
                </span>
              </div>

              {#if $serverStore.ping > 0}
                <div class="flex items-center">
                  <span class="text-sm text-gray-400 mr-2">Ping:</span>
                  <span class="text-sm font-bold {getPingColorClass($serverStore.ping)}">
                    {$serverStore.ping}ms
                  </span>
                </div>
              {/if}
            </div>
          </li>
        {/if}
      </ul>
    </nav>
  {/if}
</header>

<div class="h-20"></div>

<style>
  .nav-link {
    padding: 0.75rem 0.5rem;
    color: white;
    transition: color 0.3s;
    position: relative;
  }

  .nav-link:hover {
    color: var(--color-primary);
  }

  .nav-link.active {
    color: var(--color-primary);
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: var(--color-primary);
  }

  .btn {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    transition: all 0.3s;
    font-weight: 500;
  }

  .btn-primary {
    background-color: var(--color-primary);
    color: white;
  }

  .btn-primary:hover {
    background-color: rgba(76, 175, 80, 0.8);
    transform: translateY(-1px);
  }

  .btn-primary:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.3);
  }

  @media (prefers-reduced-motion: reduce) {
    .animate-pulse-slow {
      animation: none;
    }
  }
</style>