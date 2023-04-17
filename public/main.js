const update = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

update.addEventListener("click", () => {
  //The easiest way to trigger a PUT request in modern browsers is to use the Fetch API.
  //fetch(endpoint, options)
  console.log("clicked on replace");
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" }, //we’re sending JSON data by setting the Content-Type headers to application/json.
    /*  Next, we need to convert the data we send into JSON. 
    We can do this with JSON.stringify. This data is passed via the body property. */
    body: JSON.stringify({
      name: "dwight",
      quote: "How many did you bring?",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === "Success") {
        window.location.reload(true);
      }
    })
    .catch((error) => console.error(error));
});

deleteButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "dwight",
    }),
  })
    .then((response) => {
      if (response.message === "No quote to delete") {
        messageDiv.textContent = "No Dwight Vader quote to delete";
      } else {
        window.location.reload;
      }
    })
    .catch((error) => console.error(error));
});
