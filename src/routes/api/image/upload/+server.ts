import type { RequestHandler } from '@sveltejs/kit';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUDNAME,
	api_key: process.env.CLOUDINARY_APIKEY,
	api_secret: process.env.CLOUDINARY_APISECRET
});

export const POST: RequestHandler = async ({ request }) => {
	const { imageb64data, imageext, tierlistid } = await request.json();

	const upload = await cloudinary.v2.uploader.upload(imageb64data, {
		folder: `tierlist/${tierlistid}`,
		public_id: `tierlist-${tierlistid}`,
		overwrite: true,
		allowed_formats: [imageext],
		unique_filename: false
	});

	const fileurl = upload.secure_url;

	if (!fileurl)
		return new Response(JSON.stringify({ error: 'Error uploading image' }), { status: 500 });

	return new Response(JSON.stringify({ fileurl }), { status: 200 });
};
