import { error } from '@sveltejs/kit';
import { BLOG_API_KEY } from '$env/static/private';

/**
 * Authenticate a request via Supabase session (cookie) OR Bearer token.
 * Agents use: Authorization: Bearer <BLOG_API_KEY>
 * Browser uses: Supabase session cookie
 */
export async function requireAuth(request: Request, locals: App.Locals): Promise<void> {
	// Check Bearer token first (for agents)
	const authHeader = request.headers.get('authorization');
	if (authHeader?.startsWith('Bearer ')) {
		const token = authHeader.slice(7);
		if (BLOG_API_KEY && token === BLOG_API_KEY) return;
		throw error(401, 'Invalid API key');
	}

	// Fall back to Supabase session (browser)
	const { session } = await locals.safeGetSession();
	if (session) return;

	throw error(401, 'Unauthorized');
}
