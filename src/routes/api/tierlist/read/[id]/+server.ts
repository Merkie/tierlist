import type { RequestHandler } from '@sveltejs/kit';
import prisma from '../../../../../resources/prisma';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	const tierlist = await prisma.tierlist.findUnique({
		where: {
			id
		},
		include: {
			items: true
		}
	});
	if (!tierlist) return new Response(JSON.stringify({ error: 'Tierlist not found', tierlist: {} }));

	return new Response(JSON.stringify({ tierlist }));
};
