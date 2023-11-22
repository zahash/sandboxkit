<script lang="ts">
	import { enhance } from '$app/forms';

	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<p>login</p>

<form method="POST" action="?/login" use:enhance>
	<label for="user">username</label>
	<input name="user" type="text" id="user" />

	<label for="pass">password</label>
	<input name="pass" type="password" id="pass" />

	<button type="submit">login</button>
</form>

{form?.success}

{#if form?.success === false}
	<p>login failed!</p>
	<p>{form.errorKind}</p>
{/if}
