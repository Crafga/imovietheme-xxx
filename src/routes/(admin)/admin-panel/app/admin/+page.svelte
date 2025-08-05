<script lang="ts">
    import type { PageData } from './$types';
    import TableUserList from '$lib/components/admin/TableUserList.svelte';
    export let data: PageData;

    $: Users = data?.user;

</script>

<div class="container mx-auto p-4">
    <TableUserList userList={Users}/>
</div>