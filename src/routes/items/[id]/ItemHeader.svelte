<script lang="ts">
	import { useQueryClient } from '@tanstack/svelte-query';
	import EditableText from '../../boards/[id]/EditableText.svelte';
	import { createEventDispatcher } from 'svelte';

	export let id: string;
	export let boardId: string;
	export let title: string;
	export let columnName: string;

	const queryClient = useQueryClient();

	const dispatch = createEventDispatcher<{ close: void }>();
</script>

<div class="flex items-start">
	<div class="flex items-start gap-x-2 mb-8 w-full">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="h-5 w-5 mt-1 text-neutral-700"
		>
			<rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
			<line x1="3" x2="21" y1="9" y2="9"></line>
			<line x1="9" x2="9" y1="21" y2="9"></line>
		</svg>
		<div class="-mt-1">
			<h3>
				<EditableText
					action="?/updateItemTitle"
					invalidateAll={false}
					on:submitted={() => {
						queryClient.invalidateQueries({
							queryKey: ['items', id]
						});
						queryClient.invalidateQueries({
							queryKey: ['boards', boardId]
						});
					}}
					fieldName="title"
					value={title || ''}
					inputClassName="text-xl border border-slate-400 w-full rounded-lg py-1 px-2 font-medium"
					buttonClassName="text-xl block rounded-lg text-left w-full border border-transparent py-1 px-2 font-medium text-slate-600"
				>
					<input type="hidden" name="id" value={id} />
				</EditableText>
			</h3>
			<p class="text-sm text-muted-foreground px-3">
				in list <span class="underline">{columnName}</span>
			</p>
		</div>
	</div>
	<button
		on:click={() => {
			dispatch('close');
		}}
		class="-mt-2 text-muted-foreground p-2 rounded-md hover:bg-gray-300"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="24"
			height="24"
			fill="currentColor"
		>
			<title>close</title>
			<path
				d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
			/>
		</svg>
	</button>
</div>