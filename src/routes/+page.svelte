<script lang="ts">
	import { onMount } from 'svelte';

	let isElectron: boolean;

	onMount(() => {
		isElectron = !!process.versions['electron'];
	});

	let count = 0;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p>Running in: <b>{isElectron ? 'Electron' : 'Browser'}</b></p>

<button on:click={() => (count += 1)}>Pressed {count} times</button>
