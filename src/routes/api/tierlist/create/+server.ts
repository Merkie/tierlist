import type { RequestHandler } from '@sveltejs/kit';
import prisma from '../../../../resources/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const { id, title, description, image, categories, items } = (await request.json()) as {
		id: string;
		title: string;
		description: string;
		image: string;
		categories: string[];
		items: { name: string; image: string }[];
	};

	const tierlist = await prisma.tierlist.create({
		data: {
			id,
			name: title,
			description,
			imageurl: image,
			categories,
			items: {
				create: items.map((item) => ({ name: item.name, imageurl: item.image }))
			}
		}
	});

	return new Response(JSON.stringify(tierlist));
};
