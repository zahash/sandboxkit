<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<p>signup</p>

<form method="POST" action="?/signup" use:enhance>
	<label for="user">username</label>
	<input name="user" type="text" id="user" />

	<label for="pass">password</label>
	<input name="pass" type="password" id="pass" />

	<button type="submit">signup</button>
</form>

{form?.success}

{#if form?.success === false}
	<p>signup failed!</p>
	<p>{form.errorKind}</p>
{/if}
