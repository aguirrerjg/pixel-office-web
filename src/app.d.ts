import type { SupabaseClient, Session } from '@supabase/supabase-js';

declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;
			safeGetSession: () => Promise<{ session: Session | null; user: any | null }>;
		}
	}

	interface Window {
		$crisp?: Array<unknown>;
	}
}

export {};
