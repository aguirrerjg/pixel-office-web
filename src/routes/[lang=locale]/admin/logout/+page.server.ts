import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params, locals: { supabase } }) => {
	await supabase.auth.signOut();
	throw redirect(303, `/${params.lang}`);
};
