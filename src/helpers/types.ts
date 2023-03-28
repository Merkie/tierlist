export type TierlistItem = {
	id: number;
	name: string;
	image: string;
};

export type TierlistCategory = {
	id: number;
	name: string;
	items: TierlistItem[];
};
