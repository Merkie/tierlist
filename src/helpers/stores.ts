import { browser } from '$app/environment';
import { writable } from 'svelte/store';
import type { TierlistCategory } from './types';

export const TierlistCategories = writable(['S', 'A', 'B', 'C', 'D', 'F']);
export const TierlistItems = writable<{ name: string; imageurl: string }[]>([]);
export const TierlistColors = writable(['hsl(0, 100%, 75%)', 'hsl(120, 100%, 75%)']);
export const TierlistName = writable('');
export const TierlistUserItems = writable<TierlistCategory[]>([]);
export const TierlistSlug = writable('');

if (browser) {
	// TierlistCategories
	const storedTierlistCategories = localStorage.getItem('tierlistCategories');
	if (storedTierlistCategories) {
		TierlistCategories.set(JSON.parse(storedTierlistCategories));
	}
	TierlistCategories.subscribe((value) => {
		localStorage.setItem('tierlistCategories', JSON.stringify(value));
	});
	// TierlistItems
	const storedTierlistItems = localStorage.getItem('tierlistItems');
	if (storedTierlistItems) {
		TierlistItems.set(JSON.parse(storedTierlistItems));
	}
	TierlistItems.subscribe((value) => {
		localStorage.setItem('tierlistItems', JSON.stringify(value));
	});
	// TierlistColors
	const storedTierlistColors = localStorage.getItem('tierlistColors');
	if (storedTierlistColors) {
		TierlistColors.set(JSON.parse(storedTierlistColors));
	}
	TierlistColors.subscribe((value) => {
		localStorage.setItem('tierlistColors', JSON.stringify(value));
	});
	// TierlistName
	const storedTierlistName = localStorage.getItem('tierlistName');
	if (storedTierlistName) {
		TierlistName.set(JSON.parse(storedTierlistName));
	}
	TierlistName.subscribe((value) => {
		localStorage.setItem('tierlistName', JSON.stringify(value));
	});
	// TierlistUserItems
	const storedTierlistUserItems = localStorage.getItem('tierlistUserItems');
	if (storedTierlistUserItems) {
		TierlistUserItems.set(JSON.parse(storedTierlistUserItems));
	}
	TierlistUserItems.subscribe((value) => {
		localStorage.setItem('tierlistUserItems', JSON.stringify(value));
	});
	// TierlistSlug
	const storedTierlistSlug = localStorage.getItem('tierlistSlug');
	if (storedTierlistSlug) {
		TierlistSlug.set(JSON.parse(storedTierlistSlug));
	}
	TierlistSlug.subscribe((value) => {
		localStorage.setItem('tierlistSlug', JSON.stringify(value));
	});
}
