const FIREBASE_URL = "https://YOUR-PROJECT-ID.firebaseio.com/command.json";

function activate() {
  fetch(FIREBASE_URL, {
    method: "PUT",
    body: JSON.stringify("activate"),
  })
    .then(() => console.log("Sent!"))
    .catch((err) => alert("Error: " + err));
}
