<script lang="ts">
	import { enhance } from '$app/forms';

	let { form } = $props();
</script>

<svelte:head>
	<title>Admin Login | Agent Squad</title>
</svelte:head>

<div class="max-w-md mx-auto pt-32 px-5">
	<h1 class="text-3xl font-bold font-[var(--display)] text-[var(--text)] mb-6">Blog Admin</h1>

	{#if form?.error}
		<div class="mb-4 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-medium">
			{form.error}
		</div>
	{/if}

	<form method="POST" class="flex flex-col gap-4" use:enhance>
		<label class="flex flex-col gap-1">
			<span class="text-sm font-medium text-[var(--gold)] font-[var(--mono)] uppercase tracking-wider">Email</span>
			<input
				name="email"
				type="email"
				required
				autocomplete="email"
				class="w-full bg-[rgba(201,168,76,0.05)] border border-[var(--gold-border)] rounded-lg px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)]"
			/>
		</label>

		<label class="flex flex-col gap-1">
			<span class="text-sm font-medium text-[var(--gold)] font-[var(--mono)] uppercase tracking-wider">Contraseña</span>
			<input
				name="password"
				type="password"
				required
				autocomplete="current-password"
				class="w-full bg-[rgba(201,168,76,0.05)] border border-[var(--gold-border)] rounded-lg px-4 py-3 text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--gold)]"
			/>
		</label>

		<button
			type="submit"
			class="w-full py-3 rounded-lg font-semibold bg-[var(--gold)] text-[#0D0D12] hover:bg-[#d4b460] transition-colors"
		>
			Iniciar sesión
		</button>
	</form>
</div>
