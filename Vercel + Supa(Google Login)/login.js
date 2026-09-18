const googleBtn = document.getElementById('google-btn');
const btnLabel = document.getElementById('btn-label');
const errorEl = document.getElementById('error');

googleBtn.addEventListener('click', async () => {
  googleBtn.disabled = true;
  btnLabel.textContent = 'Redirecting…';
  errorEl.style.display = 'none';

  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/callback.html`,
    },
  });

  if (error) {
    errorEl.textContent = error.message;
    errorEl.style.display = 'block';
    googleBtn.disabled = false;
    btnLabel.textContent = 'Continue with Google';
  }
  // On success the browser navigates to Google, then back to callback.html.
});
