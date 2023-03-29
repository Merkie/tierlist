import type { RequestHandler } from '@sveltejs/kit';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import s3client from '../../../../resources/s3';

export const POST: RequestHandler = async ({ request }) => {
	const { imageb64data, imageext, tierlistid } = (await request.json()) as {
		imageb64data: string;
		imageext: string;
		tierlistid: string;
	};

	if (!imageb64data || !imageext || !tierlistid)
		return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });

	const imagename = `image-${Date.now()}.${imageext}`;

	const command = new PutObjectCommand({
		Bucket: 'tierlist-sveltekit',
		Key: `${tierlistid}/${imagename}`,
		Body: Buffer.from(imageb64data.split(',')[1], 'base64')
	});

	const response = await s3client.send(command);

	const fileurl = `https://tierlist-sveltekit.s3.us-west-2.amazonaws.com/${tierlistid}/${imagename}`;

	if (!fileurl)
		return new Response(JSON.stringify({ error: 'Error uploading image' }), { status: 500 });

	return new Response(JSON.stringify({ fileurl }), { status: 200 });
};
