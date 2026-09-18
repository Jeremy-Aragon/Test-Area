const checkingEl = document.getElementById('checking');
const contentEl = document.getElementById('content');
const avatarEl = document.getElementById('avatar');
const nameEl = document.getElementById('user-name');
const emailEl = document.getElementById('user-email');
const logoutBtn = document.getElementById('logout-btn');

async function init() {
  const { data: { session } } = await supabaseClient.auth.getSession();

  if (!session) {
    // Not logged in -> send back to login page
    window.location.href = 'login.html';
    return;
  }

  const user = session.user;
  const meta = user.user_metadata || {};

  if (meta.avatar_url) {
    avatarEl.src = meta.avatar_url;
    avatarEl.style.display = 'block';
  }
  nameEl.textContent = meta.full_name || user.email;
  emailEl.textContent = user.email;

  checkingEl.style.display = 'none';
  contentEl.style.display = 'block';
}

logoutBtn.addEventListener('click', async () => {
  await supabaseClient.auth.signOut();
  window.location.href = 'login.html';
});

// Keep in sync if logged out elsewhere
supabaseClient.auth.onAuthStateChange((event, session) => {
  if (!session) {
    window.location.href = 'login.html';
  }
});

init();
