document.getElementById("dob").max = new Date().toISOString().split("T")[0];

function showAlert(type, msg) {
  const el = document.getElementById("alert");
  const icon = document.getElementById("alertIcon");
  icon.textContent = type === "success" ? "✓" : "✕";
  document.getElementById("alertMsg").textContent = msg;
  el.className = "alert show " + type;
  setTimeout(() => (el.className = "alert"), 6000);
}

function setErr(inputId, errId, show) {
  document.getElementById(inputId).classList.toggle("err", show);
  document.getElementById(errId).style.display = show ? "block" : "none";
}

const errMap = { username: "usernameErr", email: "emailErr", dob: "dobErr" };
["username", "email", "dob"].forEach((id) => {
  document
    .getElementById(id)
    .addEventListener("input", () => setErr(id, errMap[id], false));
});

document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  let bad = false;

  if (!name) {
    setErr("username", "usernameErr", true);
    bad = true;
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setErr("email", "emailErr", true);
    bad = true;
  }
  if (!dob) {
    setErr("dob", "dobErr", true);
    bad = true;
  }
  if (bad) return;

  const btn = document.getElementById("submitBtn");
  btn.disabled = true;
  btn.textContent = "Adding you...";

  try {
    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name, email, date_of_birth: dob }),
    });
    const data = await res.json();
    if (res.ok) {
      showAlert("success", data.message);
      document.getElementById("form").reset();
    } else {
      showAlert("error", data.message);
    }
  } catch {
    showAlert("error", "Network error. Check your connection and try again.");
  } finally {
    btn.disabled = false;
    btn.textContent = "Add me";
  }
});
