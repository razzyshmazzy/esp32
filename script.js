const FIREBASE_URL =
  "https://esp32-8d03d-default-rtdb.firebaseio.com/color.json";
const POLL_INTERVAL = 1000;
const STEP = 5;

const inputs = {
  red: document.getElementById("red"),
  green: document.getElementById("green"),
  blue: document.getElementById("blue"),
};

const buttons = {
  red: document.getElementById("redPulse"),
  green: document.getElementById("greenPulse"),
  blue: document.getElementById("bluePulse"),
};

const preview = document.getElementById("preview");

const pulse = {
  red: { active: false, direction: 1 },
  green: { active: false, direction: 1 },
  blue: { active: false, direction: 1 },
};

function updatePreview() {
  const r = inputs.red.value || 0;
  const g = inputs.green.value || 0;
  const b = inputs.blue.value || 0;
  preview.style.background = `rgb(${r}, ${g}, ${b})`;
}

function loadCurrentValues() {
  fetch(FIREBASE_URL)
    .then((res) => res.json())
    .then((color) => {
      if (color) {
        inputs.red.value = color.r || 0;
        inputs.green.value = color.g || 0;
        inputs.blue.value = color.b || 0;
        updatePreview();
      }
    })
    .catch((err) => console.log("Couldn't load values:", err));
}

function togglePulse(color) {
  pulse[color].active = !pulse[color].active;
  buttons[color].textContent = pulse[color].active ? "STOP" : "START";
  buttons[color].classList.toggle("active", pulse[color].active);
}

function stepPulse(color) {
  if (!pulse[color].active) return;

  let val = parseInt(inputs[color].value) || 0;
  val += STEP * pulse[color].direction;

  if (val >= 255) {
    val = 255;
    pulse[color].direction = -1;
  } else if (val <= 0) {
    val = 0;
    pulse[color].direction = 1;
  }

  inputs[color].value = val;
}

function send() {
  const color = {
    r: parseInt(inputs.red.value) || 0,
    g: parseInt(inputs.green.value) || 0,
    b: parseInt(inputs.blue.value) || 0,
  };

  fetch(FIREBASE_URL, {
    method: "PUT",
    body: JSON.stringify(color),
  })
    .then(() => console.log("Sent:", color))
    .catch((err) => alert("Error: " + err));
}

inputs.red.addEventListener("input", updatePreview);
inputs.green.addEventListener("input", updatePreview);
inputs.blue.addEventListener("input", updatePreview);

setInterval(() => {
  stepPulse("red");
  stepPulse("green");
  stepPulse("blue");
  updatePreview();

  if (pulse.red.active || pulse.green.active || pulse.blue.active) {
    send();
  }
}, POLL_INTERVAL);

loadCurrentValues();
