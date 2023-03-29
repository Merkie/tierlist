import type { PageServerLoad } from './$types';
import prisma from '../../../resources/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const { slug } = params;

	const tierlist = await prisma.tierlist.findFirst({
		where: {
			slug
		}
	});

	return {
		id: tierlist?.id
	};
};
