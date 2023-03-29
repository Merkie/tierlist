<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';
	import hslStepGenerator from '../helpers/hslStepGenerator';
	import {
		TierlistCategories,
		TierlistColors,
		TierlistItems,
		TierlistUserItems
	} from '../helpers/stores';

	// reset the user items if its empty (first load of a new tierlist)
	if ($TierlistUserItems.length === 0)
		$TierlistUserItems = [
			...$TierlistCategories.map((category, index) => {
				return {
					id: index,
					name: category,
					items: []
				};
			}),
			{
				id: $TierlistCategories.length,
				name: 'nocategory',
				items: $TierlistItems.map((item, index) => {
					return {
						id: index,
						name: item.name,
						image: item.imageurl
					};
				})
			}
		];

	// Generated swatches for the category rows
	const swatches = hslStepGenerator(
		$TierlistColors[0],
		$TierlistColors[1],
		$TierlistUserItems.length - 1
	);

	// For adjusting the brightness of the row when considering a drop
	let consideringRowId = -1;

	// Controls animation speed
	const flipDurationMs = 200;

	// Update the items in a row
	const updateRowItems = (rowid: number, e: CustomEvent) => {
		$TierlistUserItems = $TierlistUserItems.map((row) => {
			if (row.id === rowid) {
				return {
					...row,
					items: e.detail.items
				};
			}
			return row;
		});
	};
</script>

<main class="flex-1 gap-1 grid grid-rows-7">
	{#each $TierlistUserItems as row, index (row.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="bg-[#1a1a17] flex relative">
			{#if row.name !== 'nocategory'}
				<div
					style={`background-color: ${swatches[index]}`}
					class="w-[12%] text-[#1a1a17] grid place-items-center"
				>
					<p style="font-size: 2vw">{row.name}</p>
				</div>
			{/if}
			<div
				use:dndzone={{
					items: row.items,
					flipDurationMs,
					dropTargetStyle: {}
				}}
				on:consider={(e) => {
					consideringRowId = row.id;
					updateRowItems(row.id, e);
				}}
				on:finalize={(e) => {
					consideringRowId = -1;
					updateRowItems(row.id, e);
				}}
				class="flex-1 p-2 flex flex-wrap bg-inherit texture"
				style={consideringRowId === row.id ? 'filter: brightness(1.2)' : ''}
			>
				{#each row.items as item (item.id)}
					<div animate:flip={{ duration: flipDurationMs }} class="min-w-[100px] h-[70px] relative">
						<img
							src={item.image}
							alt={item.name}
							class="absolute h-[100%] object-fill left-1/2 -translate-x-1/2"
						/>
						<p
							class="absolute opacity-80 left-1/2 -translate-x-1/2 bottom-2 bg-[rgba(0,0,0,0.75)] px-2 capitalize text-center w-max overflow-ellipsis"
						>
							{item.name}
						</p>
					</div>
				{/each}
				<!-- Put this here to prevent resizing -->
				<div class="w-[100px] h-[70px]" />
			</div>
		</div>
	{/each}
</main>

<style>
	.texture {
		background-color: #1a1a17;
		background-image: url('/ui-texture.png');
	}
</style>
