<script lang="ts">
	import { schema } from '$lib/schema/schema.js';
	import { Control, Field, FieldErrors, Label } from 'formsnap';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	let { data } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema)
	});
	const { form: formData, enhance, errors } = form;
</script>

<div class="grid h-full min-h-screen place-items-center">
	<div
		class="w-full max-w-md rounded-lg border bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm"
	>
		<form use:enhance class="flex flex-col gap-4" method="POST">
			<div class="space-y-2">
				<h3 class="text-lg font-semibold leading-none tracking-tight">Login</h3>
				<p class="text-sm">Enter your email and password to login to your account.</p>
			</div>

			<Field {form} name="email">
				<fieldset class="flex flex-col gap-2">
					<Control>
						{#snippet children({ props })}
							<Label class="text-sm font-medium {$errors.email ? 'text-red-700' : ''}">Email</Label>
							<input
								{...props}
								type="email"
								class="rounded-md text-sm {$errors.email ? 'border-red-700' : ''}"
								placeholder="example@gmail.com"
								bind:value={$formData.email}
							/>
						{/snippet}
					</Control>
					<FieldErrors class="text-sm text-red-700" />
				</fieldset>
			</Field>

			<Field {form} name="password">
				<fieldset class="flex flex-col gap-2">
					<Control>
						{#snippet children({ props })}
							<Label class="text-sm font-medium {$errors.password ? 'text-red-700' : ''}"
								>Password</Label
							>
							<input
								{...props}
								type="password"
								class="rounded-md text-sm {$errors.password ? 'border-red-700' : ''}"
								placeholder="********"
								bind:value={$formData.password}
							/>
						{/snippet}
					</Control>
					<FieldErrors class="text-sm text-red-700" />
				</fieldset>
			</Field>

			<button class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">Sign in</button
			>

			<p class="text-sm">
				Don't have an account yet? <a class="text-primary" href="/login">Create an account</a>
			</p>
		</form>
	</div>
</div>
