const statusDot = document.getElementById("statusDot");
const statusText = document.getElementById("statusText");
const chatLog = document.getElementById("chatLog");
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");

function setStatus(state, text) {
  statusDot.className = "dot" + (state ? " " + state : "");
  statusText.textContent = text;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function addBubble(text, who) {
  const empty = chatLog.querySelector(".empty");
  if (empty) empty.remove();

  const bubble = document.createElement("div");
  bubble.className = "bubble " + who;
  bubble.innerHTML = escapeHtml(text).replace(/\n/g, "<br>");
  chatLog.appendChild(bubble);
  chatLog.scrollTop = chatLog.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value.trim();
  if (!message) return;

  addBubble(message, "user");
  input.value = "";
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending...";
  setStatus("", "Waiting for Gemini...");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    if (!res.ok) {
      setStatus("err", "Error from server");
      addBubble("Error: " + (data.error || "unknown error"), "bot");
      return;
    }

    setStatus("ok", "Connected to Gemini");
    addBubble(data.reply, "bot");
  } catch (err) {
    setStatus("err", "Request failed");
    addBubble("Error: could not reach the server", "bot");
    console.error(err);
  } finally {
    sendBtn.disabled = false;
    sendBtn.textContent = "Send";
  }
});
