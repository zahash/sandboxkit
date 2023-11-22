<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<form method="POST" action="?/add" use:enhance>
	<input type="text" name="todo" />
	<button type="submit">add</button>
	<button type="submit" formaction="?/caps">caps</button>
</form>

{#each data.todos as todo (todo.id)}
	<p>{todo.text}</p>
{/each}
