const FIREBASE_URL = "https://esp32-8d03d.firebaseio.com/command.json";

function activate() {
  fetch(FIREBASE_URL, {
    method: "PUT",
    body: JSON.stringify("activate"),
  })
    .then(() => console.log("Sent!"))
    .catch((err) => alert("Error: " + err));
}
