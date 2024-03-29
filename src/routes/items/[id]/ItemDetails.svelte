<script lang="ts">
	import { page } from '$app/stores';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Attachment, Column, Item } from '@prisma/client';
	import ItemDescription from './ItemDescription.svelte';
	import Skeleton from '$lib/components/Skeleton.svelte';
	import ItemHeader from './ItemHeader.svelte';
	import ItemActivity from './ItemActivity.svelte';
	import ItemActions from './ItemActions.svelte';
	import ItemAttachments from './ItemAttachments.svelte';
	import ItemQueriesProvider from './ItemQueriesProvider.svelte';

	export let id: string;

	const query = createQuery<Item & { column: Column; attachments: Attachment[] }>({
		queryKey: ['items', id],
		queryFn: async () => {
			const res = await fetch(`/items/${id}`);
			return res.json();
		},
		initialData: $page.data.item
	});

	$: item = $query.data;
</script>

<ItemQueriesProvider>
	<div class="p-6 bg-gray-100">
		<!-- Header -->
		{#if $query.isLoading || $query.isFetching}
			<div class="flex items-start gap-x-3 mb-6">
				<Skeleton class="h-6 w-6 mt-1 bg-neutral-200" />
				<div>
					<Skeleton class="w-24 h-6 mb-1 bg-neutral-200" />
					<Skeleton class="w-12 h-4 bg-neutral-200" />
				</div>
			</div>
		{:else if item}
			<ItemHeader {item} on:close />
		{/if}

		<div class="flex flex-col lg:flex-row gap-2">
			<div class="flex flex-col gap-8 flex-grow">
				<!-- Description -->
				{#if $query.isLoading || $query.isFetching}
					<div class="flex items-start gap-x-3 w-full">
						<Skeleton class="h-6 w-6 bg-neutral-200" />
						<div class="w-full">
							<Skeleton class="w-24 h-6 mb-2 bg-neutral-200" />
							<Skeleton class="w-full h-[78px] bg-neutral-200" />
						</div>
					</div>
				{:else if item}
					<ItemDescription
						id={item.id.toString()}
						boardId={item.boardId.toString()}
						content={item.content}
					/>
				{/if}

				<!-- Attachments -->
				{#if item && item.attachments.length > 0}
					<ItemAttachments itemId={id} attachments={item.attachments} />
				{/if}

				<!-- Activity -->
				{#if $query.isLoading || $query.isFetching}
					<div class="flex items-start gap-x-3 w-full">
						<Skeleton class="h-6 w-6 bg-neutral-200" />
						<div class="w-full">
							<Skeleton class="w-24 h-6 mb-2 bg-neutral-200" />
							<Skeleton class="w-full h-10 bg-neutral-200" />
						</div>
					</div>
				{:else if item}
					<ItemActivity {item} />
				{/if}
			</div>

			<!-- Actions -->
			{#if item}
				<ItemActions {item} class="min-w-48" />
			{/if}
		</div>
	</div>
</ItemQueriesProvider>
