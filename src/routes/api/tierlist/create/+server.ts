import type { RequestHandler } from '@sveltejs/kit';
import prisma from '../../../../resources/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const createSlug = async (name: string) => {
		// Generate slug from the name
		let slug = name
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '')
			.slice(0, 30);
		// Check if the slug is already taken
		const existing = await prisma.tierlist.findFirst({ where: { slug } });
		// If it is, append a random 4 digit number to the slug
		if (existing) {
			slug += '-' + Math.floor(Math.random() * 1000);
		}
		return slug;
	};

	const { id, title, description, image, categories, colors, items } = (await request.json()) as {
		id: string;
		title: string;
		description: string;
		image: string;
		categories: string[];
		colors: string[];
		items: { name: string; image: string }[];
	};

	const tierlist = await prisma.tierlist.create({
		data: {
			id,
			name: title,
			description,
			imageurl: image,
			categories,
			startColor: colors[0],
			endColor: colors[1],
			slug: await createSlug(title),
			items: {
				create: items.map((item) => ({ name: item.name, imageurl: item.image }))
			}
		}
	});

	return new Response(JSON.stringify(tierlist));
};
