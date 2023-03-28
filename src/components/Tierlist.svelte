<script lang="ts">
	import { flip } from 'svelte/animate';
	import { dndzone } from 'svelte-dnd-action';

	type TierlistItem = {
		id: number;
		name: string;
		image: string;
	};

	type TierlistCategory = {
		id: number;
		name: string;
		color?: string;
		items: TierlistItem[];
	};

	let tierlistItems: TierlistCategory[] = [
		{
			id: 1,
			name: 'S',
			color: '#ff7f7f',
			items: []
		},
		{
			id: 2,
			name: 'A',
			color: '#febe7e',
			items: []
		},
		{
			id: 3,
			name: 'B',
			color: '#fedf7e',
			items: []
		},
		{
			id: 4,
			name: 'C',
			color: '#ffff7f',
			items: []
		},
		{
			id: 5,
			name: 'D',
			color: '#beff7f',
			items: []
		},
		{
			id: 6,
			name: 'F',
			color: '#7fff7f',
			items: []
		},
		{
			id: 7,
			name: 'nocategory',
			items: [
				{
					id: 1,
					name: 'react',
					image:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png'
				},
				{
					id: 2,
					name: 'svelte',
					image:
						'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png'
				},
				{
					id: 3,
					name: 'vue',
					image: '/vuelogo.png'
				},
				{
					id: 4,
					name: 'knockoutjs',
					image: 'https://avatars.githubusercontent.com/u/3863375?s=280&v=4'
				}
			]
		}
	];

	let consideringRowId = -1;

	const flipDurationMs = 200;

	const updateRowItems = (rowid: number, e: CustomEvent) => {
		tierlistItems = tierlistItems.map((row) => {
			if (row.id === rowid) {
				return {
					...row,
					items: e.detail.items
				};
			}
			return row;
		});
	};
	const handleDndConsiderItems = (rowid: number, e: CustomEvent) => {
		consideringRowId = rowid;
		updateRowItems(rowid, e);
	};
	const handleDndFinalizeitems = (rowid: number, e: CustomEvent) => {
		consideringRowId = -1;
		updateRowItems(rowid, e);
	};
</script>

<main class="flex-1 gap-1 grid grid-rows-7">
	{#each tierlistItems as row (row.id)}
		<div animate:flip={{ duration: flipDurationMs }} class="bg-[#1a1a17] flex relative">
			{#if row.name !== 'nocategory'}
				<div
					style={`background-color: ${row.color}`}
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
				on:consider={(e) => handleDndConsiderItems(row.id, e)}
				on:finalize={(e) => handleDndFinalizeitems(row.id, e)}
				class="flex-1 p-2 flex flex-wrap bg-inherit texture"
				style={consideringRowId === row.id ? 'filter: brightness(1.2)' : ''}
			>
				{#each row.items as item (item.id)}
					<div animate:flip={{ duration: flipDurationMs }} class="w-[100px] h-[70px] relative">
						<img
							src={item.image}
							alt={item.name}
							class="absolute h-[100%] object-fill left-1/2 -translate-x-1/2"
						/>
						<p
							class="absolute left-1/2 -translate-x-1/2 bottom-2 bg-[rgba(0,0,0,0.75)] px-2 capitalize"
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
