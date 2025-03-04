<script>
	import { MenuIcon, XIcon } from 'lucide-svelte';
	import { fly, fade } from 'svelte/transition';
	import '../../app.css';

	let { children } = $props();

	let menuOpen = $state(false);
</script>

<header>
	<div class="flex items-center justify-between p-6 lg:px-8">
		<!-- Left section -->
		<a href="/">
			<img src="/logo.svg" alt="Logo" class="h-6" />
		</a>

		<!-- Center section -->
		<div class="hidden gap-8 lg:flex">
			<a href="/#intro" class="text-sm font-semibold">Product</a>
			<a href="/#features" class="text-sm font-semibold">Features</a>
		</div>

		<!-- Right section -->
		<div class="hidden gap-8 lg:flex">
			<a href="/app" class="rounded-lg px-4 py-2 text-sm ring-1 ring-gray-200">Get Started</a>
		</div>
		<div class="flex lg:hidden">
			<button type="button" onclick={() => (menuOpen = !menuOpen)}>
				<MenuIcon />
				<span class="sr-only">Open main menu</span>
			</button>
		</div>
	</div>
</header>

<main class="min-h-[calc(100vh-17.8rem)]">
	<!-- Mobile sidemenu -->
	{#if menuOpen}
		<button
			transition:fade={{ duration: 200 }}
			type="button"
			class="fixed inset-0 bg-black/5 backdrop-blur-sm transition-opacity lg:hidden"
			onclick={() => (menuOpen = false)}
		>
			<span class="sr-only">Close main menu</span>
		</button>

		<div
			in:fly={{ x: '100%', duration: 200, opacity: 0 }}
			out:fly={{ x: '100%', duration: 200, opacity: 0 }}
			class="fixed right-0 top-0 min-h-screen w-full bg-white p-6 shadow-lg sm:max-w-sm lg:hidden"
		>
			<div class="flex justify-between pb-3">
				<img src="/logo.svg" alt="Logo" class="h-5" />
				<button type="button" onclick={() => (menuOpen = false)}>
					<XIcon size={16} />
					<span class="sr-only">Close main menu</span>
				</button>
			</div>

			<div class="flex flex-col gap-4 border-y py-6">
				<a href="/#intro" class="text-sm font-medium">Product</a>
				<a href="/#features" class="text-sm font-medium">Features</a>
			</div>

			<div class="py-3">
				<a href="/app" class="text-sm font-medium">Get Started</a>
			</div>
		</div>
	{/if}

	{@render children()}
</main>

<footer class="border-t py-16">
	<div class="flex flex-col justify-between gap-8 bg-white px-16 md:px-32 lg:flex-row">
		<div class="flex flex-col gap-2">
			<img src="/logo.svg" alt="Logo" class="w-32" />
			<p>© 2024 All rights reserved</p>
		</div>
		<div class="grid gap-4 sm:grid-cols-2">
			<ul>
				<li class="font-semibold">Links</li>
				<li><a href="/#intro">Product</a></li>
				<li><a href="/#features">Features</a></li>
			</ul>
			<ul>
				<li class="font-semibold">Legal</li>
				<li><a href="/terms">Terms of Service</a></li>
				<li><a href="/privacy">Privacy Policy</a></li>
			</ul>
		</div>
	</div>
</footer>
