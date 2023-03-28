import type { PageServerLoad } from './$types';
import prisma from '../../resources/prisma';

export const load: PageServerLoad = async () => {
	const tierlists = await prisma.tierlist.findMany({
		take: 100
	});
	return {
		tierlists
	};
};
