import { S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
dotenv.config();

const client = new S3Client({
	region: process.env.REGION_S3 + '',
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_S3 + '',
		secretAccessKey: process.env.SECRET_ACCESS_KEY_S3 + ''
	}
});

export default client;
