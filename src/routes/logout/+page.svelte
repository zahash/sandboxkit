<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{#if !data.success}
	<p>{data.errorKind}</p>
{/if}
