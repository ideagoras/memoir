import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	const normalizedBase = import.meta.env.BASE_URL === '/'
		? ''
		: import.meta.env.BASE_URL.replace(/\/$/, '');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `${normalizedBase ? `${normalizedBase}/blog` : '/blog'}/${post.id}/`,
		})),
	});
}
