// Replace these with your own project's values (Project Settings > API)
const SUPABASE_URL = "vbdbgqcufibzhrucdhfg";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiZGJncWN1ZmliemhydWNkaGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYzNDkxMDgsImV4cCI6MjEwMTkyNTEwOH0.99fcMdC0ZqtGkS1tXFByKA92zLUFIm00Xdarz3vN0j0";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const form = document.getElementById("msgForm");
const submitBtn = document.getElementById("submitBtn");
const list = document.getElementById("msgList");

function setStatus(state, text) {
  statusDot.className = "dot" + (state ? " " + state : "");
  statusText.textContent = text;
}

function timeAgo(dateStr) {
  const diff = (Date.now() - new Date(dateStr)) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

function render(messages) {
  if (!messages.length) {
    list.innerHTML = '<li class="empty">No messages yet. Be the first!</li>';
    return;
  }
  list.innerHTML = messages.map(m => `
    <li>
      <span class="msg-time">${timeAgo(m.created_at)}</span>
      <span class="msg-name">${escapeHtml(m.name)}</span>
      <div class="msg-text">${escapeHtml(m.message)}</div>
    </li>
  `).join("");
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

async function loadMessages() {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    setStatus("err", "Connection failed — check your URL/key and RLS policies");
    list.innerHTML = '<li class="empty">Could not load messages.</li>';
    console.error(error);
    return;
  }

  setStatus("ok", "Connected to Supabase");
  render(data);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  if (!name || !message) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Posting...";

  const { error } = await supabase.from("messages").insert({ name, message });

  submitBtn.disabled = false;
  submitBtn.textContent = "Post message";

  if (error) {
    alert("Failed to post: " + error.message);
    console.error(error);
    return;
  }

  form.reset();
  loadMessages();
});

loadMessages();
