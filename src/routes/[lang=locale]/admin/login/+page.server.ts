import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async ({ params, locals }) => {
	const { session } = await locals.safeGetSession();
	if (session) throw redirect(303, `/${params.lang}/blog`);
	return { lang: params.lang };
};

export const actions: Actions = {
	default: async ({ request, params, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		if (!email || !password) {
			return fail(400, { error: 'Email y contraseña son requeridos.' });
		}

		const { error } = await supabase.auth.signInWithPassword({ email, password });
		if (error) {
			return fail(401, { error: 'Credenciales incorrectas.' });
		}

		throw redirect(303, `/${params.lang}/blog`);
	}
};
