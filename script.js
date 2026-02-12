const FIREBASE_URL =
  "https://esp32-8d03d-default-rtdb.firebaseio.com/color.json";

const redInput = document.getElementById("red");
const greenInput = document.getElementById("green");
const blueInput = document.getElementById("blue");
const preview = document.getElementById("preview");

function updatePreview() {
  const r = redInput.value || 0;
  const g = greenInput.value || 0;
  const b = blueInput.value || 0;
  preview.style.background = `rgb(${r}, ${g}, ${b})`;
}

function loadCurrentValues() {
  fetch(FIREBASE_URL)
    .then((res) => res.json())
    .then((color) => {
      if (color) {
        redInput.value = color.r || 0;
        greenInput.value = color.g || 0;
        blueInput.value = color.b || 0;
        updatePreview();
      }
    })
    .catch((err) => console.log("Couldn't load values:", err));
}

redInput.addEventListener("input", updatePreview);
greenInput.addEventListener("input", updatePreview);
blueInput.addEventListener("input", updatePreview);

function send() {
  const color = {
    r: parseInt(redInput.value) || 0,
    g: parseInt(greenInput.value) || 0,
    b: parseInt(blueInput.value) || 0,
  };

  fetch(FIREBASE_URL, {
    method: "PUT",
    body: JSON.stringify(color),
  })
    .then(() => console.log("Sent:", color))
    .catch((err) => alert("Error: " + err));
}

loadCurrentValues();
