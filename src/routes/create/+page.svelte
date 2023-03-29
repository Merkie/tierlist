<script lang="ts">
	import { createId } from '@paralleldrive/cuid2';
	import { onMount } from 'svelte';

	let tierlistId = '';
	let tierlistTitle = '';
	let tierlistDescription = '';
	let tierlistImageInput: HTMLInputElement;
	let tierlistImageUrl = '';
	let tierlistCategories = ['S', 'A', 'B', 'C', 'D', 'F'];
	let sortableItems: {
		id: string;
		name: string;
		image: string;
		input: HTMLInputElement | undefined;
	}[] = [{ id: '1', name: '', image: '', input: undefined }];

	onMount(() => {
		tierlistId = createId();
	});

	$: {
		if (tierlistCategories.length === 0) {
			tierlistCategories = [''];
		}
	}

	const imageToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result as string);
			reader.onerror = (error) => reject(error);
		});
	};

	const uploadImage = async (imageb64data: string, imageext: string) => {
		const response = await fetch('/api/image/upload', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				imageb64data,
				imageext,
				tierlistid: tierlistId
			})
		});

		const data = await response.json();

		if (!data.fileurl) return;

		return data.fileurl;
	};

	const handleTierlistImageUpload = async () => {
		if (!tierlistImageInput.files?.length) return;
		const file = tierlistImageInput.files[0];
		const imageb64data = await imageToBase64(file);
		const imageext = file.name.split('.').pop() + '';
		const fileurl = await uploadImage(imageb64data, imageext);
		tierlistImageUrl = fileurl;
	};

	const handleSortableItemImageUpload = async (index: number) => {
		if (!sortableItems[index]) return;
		if (!sortableItems[index].input?.files?.length) return;
		//@ts-ignore
		const file = sortableItems[index].input.files[0];
		const imageb64data = await imageToBase64(file);
		const imageext = file.name.split('.').pop() + '';
		const fileurl = await uploadImage(imageb64data, imageext);
		sortableItems[index].image = fileurl;
	};

	const handleSubmission = async () => {
		if (!tierlistTitle) return alert('Please enter a title for your tierlist.');
		if (sortableItems.length === 1 && !sortableItems[0].name) {
			return alert('Please add at least one item to your tierlist.');
		}

		const response = await fetch('/api/tierlist/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: tierlistId,
				title: tierlistTitle,
				description: tierlistDescription,
				image: tierlistImageUrl,
				categories: tierlistCategories,
				items: sortableItems.map((item) => {
					return {
						name: item.name,
						image: item.image
					};
				})
			})
		});

		alert('Tierlist created successfully.');

		window.location.href = `/browse`;
	};
</script>

<div class="flex-1">
	<div
		class="mt-16 text-zinc-300 w-[90%] max-w-[600px] mx-auto bg-[#1a1a17] h-fit p-8 flex flex-col gap-2 border border-zinc-800 rounded-md"
	>
		<p>Tierlist Title:</p>
		<input bind:value={tierlistTitle} type="text" placeholder="Superheros" />
		<p class="mt-4">Tierlist Description:</p>
		<input
			bind:value={tierlistDescription}
			type="text"
			placeholder="Popular superheros from different franchises"
		/>
		<p class="mt-4">Tierlist Image:</p>
		<input
			type="file"
			class="hidden"
			on:input={handleTierlistImageUpload}
			bind:this={tierlistImageInput}
		/>
		<button
			on:click={() => tierlistImageInput.click()}
			class="bg-gradient-to-b from-orange-500 to-orange-600 p-2 rounded-md border-2 border-orange-700 border-x-0 border-t-0 font-bold active:border-0 active:border-t-2"
		>
			Upload Image
		</button>
		{#if tierlistImageUrl}
			<img width={50} src={tierlistImageUrl} alt="tierlist thumbnail" />
		{:else}
			<p class="text-zinc-500 mb-4">No image uploaded.</p>
		{/if}

		<p class="mt-4">Categories:</p>
		{#each tierlistCategories as category, index}
			<div class="flex items-center gap-4">
				<input
					bind:value={tierlistCategories[index]}
					placeholder="Category name"
					class="flex-1"
					type="text"
				/>
				<button
					on:click={() => {
						tierlistCategories.splice(index, 1);
						tierlistCategories = tierlistCategories;
					}}
					class="p-2"
				>
					<i class="bi bi-x-lg" />
				</button>
			</div>
		{/each}
		<div class="flex justify-center">
			<button
				on:click={() => {
					tierlistCategories = [...tierlistCategories, ''];
				}}
				class="px-2 text-xl active:scale-90 transition-transform"
			>
				<i class="bi bi-plus-lg" />
			</button>
		</div>

		<p class="mt-4">Sortable Items:</p>
		{#each sortableItems as item, index (item.id)}
			<div class="flex items-center gap-4">
				<input
					on:input={() => handleSortableItemImageUpload(index)}
					class="hidden"
					type="file"
					bind:this={item.input}
				/>
				<button
					on:click={() => item.input?.click()}
					class="bg-gradient-to-b from-orange-500 to-orange-600 p-1 px-2 rounded-md border-2 border-orange-700 border-x-0 border-t-0 active:border-0 active:border-t-2"
				>
					<i class="bi bi-image" />
				</button>
				{#if item.image}
					<img width={50} src={item.image} alt={item.name} />
				{/if}

				<input bind:value={item.name} placeholder="Item name" class="flex-1" type="text" />
				<button
					on:click={() => {
						// remove item from sortableItems with the same id as item.id
						sortableItems = sortableItems.filter((i) => i.id !== item.id);
					}}
					class="p-2"
				>
					<i class="bi bi-x-lg" />
				</button>
			</div>
		{/each}
		<div class="flex justify-center">
			<button
				on:click={() => {
					sortableItems = [
						...sortableItems,
						{ id: createId(), name: '', image: '', input: undefined }
					];
				}}
				class="px-2 text-xl active:scale-90 transition-transform"
			>
				<i class="bi bi-plus-lg" />
			</button>
		</div>
		<button
			on:click={handleSubmission}
			class="mt-4 bg-gradient-to-b from-orange-500 to-orange-600 p-2 rounded-md border-2 border-orange-700 border-x-0 border-t-0 font-bold active:border-0 active:border-t-2"
		>
			Submit
		</button>
	</div>
</div>

<style>
	input[type='text'] {
		@apply bg-zinc-300 border border-zinc-400 rounded-md p-1 px-2 text-zinc-800;
	}
</style>
