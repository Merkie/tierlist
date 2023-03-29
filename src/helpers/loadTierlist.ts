import type { SortableItem, Tierlist } from '@prisma/client';
import {
	TierlistCategories,
	TierlistColors,
	TierlistItems,
	TierlistName,
	TierlistUserItems,
	TierlistSlug
} from './stores';

const loadTierlist = async (id: string) => {
	const response = await fetch(`/api/tierlist/read/${id}`);
	const data = await response.json();
	if (data.error) {
		alert(data.error);
		return;
	}

	const tierlist: Tierlist & { items: SortableItem[] } = data.tierlist;

	TierlistUserItems.set([]);
	TierlistName.set(tierlist.name);
	TierlistCategories.set(tierlist.categories);
	TierlistColors.set([tierlist.startColor, tierlist.endColor]);
	TierlistSlug.set(tierlist.slug);
	TierlistItems.set(
		tierlist.items.map((item) => {
			return {
				name: item.name,
				imageurl: item.imageurl
			};
		})
	);

	window.location.assign('/');
};

export default loadTierlist;
