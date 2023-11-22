<script lang="ts">
	import { page } from '$app/stores';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<h1>user id: {$page.params.userid}</h1>
<p>{data.userid} {data.name} {data.age}</p>
