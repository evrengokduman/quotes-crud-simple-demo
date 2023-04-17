const update = document.querySelector("#update-button");

update.addEventListener("click", () => {
  //The easiest way to trigger a PUT request in modern browsers is to use the Fetch API.
  //fetch(endpoint, options)

  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" }, //we’re sending JSON data by setting the Content-Type headers to application/json.
    /*  Next, we need to convert the data we send into JSON. 
    We can do this with JSON.stringify. This data is passed via the body property. */
    body: JSON.stringify({
      name: "Dwight",
      quote: "How many did you bring?",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});

const deleteButton = document.querySelector("#delete-button");

deleteButton.addEventListener("click", () => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Dwight",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      window.location.reload();
    });
});
