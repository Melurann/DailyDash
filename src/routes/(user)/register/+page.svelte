<script lang="ts">
	let email = '';
	let password = '';
	let confirmPassword = '';
	let emailError = '';
	let passwordError = '';
	let confirmPasswordError = '';
	let isSubmitting = false;

	function validateEmail() {
		if (!email.includes('@') || !email.includes('.')) {
			emailError = 'Invalid email';
			return;
		}

		const parts = email.split('@');
		if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
			emailError = 'Invalid email';
			return;
		}

		const domainParts = parts[1].split('.');
		if (domainParts.length < 2 || domainParts.some((part) => part.length === 0)) {
			emailError = 'Invalid email';
			return;
		}

		emailError = ''; // Valid email
	}

	function validatePassword() {
		if (password.length < 8) {
			passwordError = 'Password must be at least 8 characters long.';
			return;
		}

		if (!password.split('').some((char) => char >= 'A' && char <= 'Z')) {
			passwordError = 'Password must contain at least one uppercase letter.';
			return;
		}

		if (!password.split('').some((char) => char >= '0' && char <= '9')) {
			passwordError = 'Password must contain at least one number.';
			return;
		}

		const specialChars = '@$!%*?&_';
		if (!password.split('').some((char) => specialChars.includes(char))) {
			passwordError = 'Password must contain at least one special character (@$!%*?&_).';
			return;
		}

		passwordError = ''; // Valid password
	}

	function validateConfirmPassword() {
		confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match.';
	}

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		// Run all validation functions
		validateEmail();
		validatePassword();
		validateConfirmPassword();

		// error exists => stop submission
		if (emailError || passwordError || confirmPasswordError) return;

		isSubmitting = true;
		try {
			// Submit logic here
		} catch (error) {
			console.error(error);
		} finally {
			isSubmitting = false;
		}
	};
</script>

<div class="grid h-full min-h-screen place-items-center p-8">
	<div class="w-full max-w-md rounded-lg border bg-gradient-to-b from-white to-slate-50 shadow-sm">
		<div class="flex flex-col space-y-1.5 p-6 pb-0">
			<h3 class="text-lg font-semibold leading-none tracking-tight">Register</h3>
			<p class="text-sm">Enter your email and password to create your account.</p>
		</div>

		<div class="w-full p-6">
			<form on:submit|preventDefault={handleSubmit} class="flex flex-col space-y-4">
				<!-- Email Input -->
				<fieldset class="space-y-2">
					<legend class="text-sm font-medium {emailError ? 'text-red-700' : ''}">Email</legend>
					<input
						bind:value={email}
						class="border-input focus:ring-input flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none {emailError
							? 'border-red-700'
							: ''}"
						id="email"
						name="email"
						type="email"
						aria-required="true"
						placeholder="example@gmail.com"
						autocomplete="email"
						on:blur={validateEmail}
					/>
					{#if emailError}
						<div class="text-sm font-medium text-red-700">{emailError}</div>
					{/if}
				</fieldset>

				<!-- Password Input -->
				<fieldset class="space-y-2">
					<legend class="text-sm font-medium {passwordError ? 'text-red-700' : ''}">Password</legend
					>
					<input
						bind:value={password}
						class="border-input focus:ring-input flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none {passwordError
							? 'border-red-700'
							: ''}"
						id="password"
						name="password"
						type="password"
						aria-required="true"
						placeholder="********"
						autocomplete="new-password"
						on:blur={validatePassword}
					/>
					{#if passwordError}
						<div class="text-sm font-medium text-red-700">{passwordError}</div>
					{/if}
				</fieldset>

				<!-- Confirm Password Input -->
				<fieldset class="space-y-2">
					<legend class="text-sm font-medium {confirmPasswordError ? 'text-red-700' : ''}"
						>Confirm Password</legend
					>
					<input
						bind:value={confirmPassword}
						class="border-input focus:ring-input flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none {confirmPasswordError
							? 'border-red-700'
							: ''}"
						id="confirm-password"
						name="confirm"
						type="password"
						aria-required="true"
						placeholder="********"
						autocomplete="new-password"
						on:blur={validateConfirmPassword}
					/>
					{#if confirmPasswordError}
						<div class="text-sm font-medium text-red-700">{confirmPasswordError}</div>
					{/if}
				</fieldset>

				<!-- Submit Button -->
				<button
					type="submit"
					class="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Submitting...' : 'Create your account'}
				</button>

				<a class="text-sm" href="/login"
					>Already have an account? <span class="font-medium text-primary"
						>Sign in to your account</span
					>
				</a>
			</form>
		</div>
	</div>
</div>
