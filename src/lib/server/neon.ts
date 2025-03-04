import { neon } from '@neondatabase/serverless';
import { DATABASE_URL } from '$env/static/private';

export const db = neon(DATABASE_URL);