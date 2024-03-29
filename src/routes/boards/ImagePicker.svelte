<script lang="ts">
	import Skeleton from '$lib/components/Skeleton.svelte';
	import { cn } from '$lib/utils';
	import { createQuery } from '@tanstack/svelte-query';
	import type { Random } from 'unsplash-js/dist/methods/photos/types';

	export let visible = false;

	const query = createQuery<Random[]>({
		queryKey: ['unsplash-random'],
		queryFn: async () => {
			const res = await fetch('/api/unsplash');

			if (!res.ok) {
				throw new Error('Failed to fetch photos');
			}

			return res.json();
		},
		enabled: visible,
		staleTime: Infinity // store the data indefinitely until users manually refetch
	});

	let selectedImageId: string;
</script>

<div>
	<div class="flex items-center justify-between">
		<h6 class="text-sm font-medium leading-6 text-gray-900">Background</h6>
		<button
			type="button"
			class="text-muted-foreground p-2 rounded-md hover:bg-gray-300"
			aria-label="reload"
			on:click={() => $query.refetch()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				width="24"
				height="24"
				fill="currentColor"
			>
				<path
					d="M17.65,6.35C16.2,4.9 14.21,4 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20C15.73,20 18.84,17.45 19.73,14H17.65C16.83,16.33 14.61,18 12,18A6,6 0 0,1 6,12A6,6 0 0,1 12,6C13.66,6 15.14,6.69 16.22,7.78L13,11H20V4L17.65,6.35Z"
				/>
			</svg>
		</button>
	</div>
	{#if $query.isLoading || $query.isFetching}
		<Skeleton class={cn('w-full h-20 bg-neutral-200')} />
	{:else if $query.data}
		<div class="grid grid-cols-3 gap-2">
			{#each $query.data as photo (photo.id)}
				<div class="relative w-full group">
					<img
						src={photo.urls.thumb}
						alt={photo.alt_description}
						class="object-cover aspect-video rounded-md"
					/>
					<label class="absolute inset-0 w-full h-full cursor-pointer">
						<input
							type="radio"
							name="photo"
							id="photo"
							class="opacity-0"
							value={photo.id}
							bind:group={selectedImageId}
						/>
					</label>
					<a
						href={photo.links.html}
						target="_blank"
						class="opacity-0 group-hover:opacity-100 absolute bottom-0 w-full text-[10px] truncate text-white text-center hover:underline p-1 bg-black/50"
					>
						{photo.user.name}
					</a>
					{#if selectedImageId === photo.id}
						<div
							class="absolute inset-0 flex items-center justify-center rounded-md bg-black/40 text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								fill="currentColor"
							>
								<title>check</title>
								<path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
							</svg>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{:else if $query.error}
		<div class={cn('flex items-center justify-center w-full h-20 text-red-600 bg-neutral-200')}>
			{$query.error.message}
		</div>
	{/if}
</div>
