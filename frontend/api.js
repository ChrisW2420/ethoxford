// const url = "http://10.21.241.136:8000/";
const url = "http://127.0.0.1:8000/";

// check logged in
function check_logged_in() {
  fetch(url + "users/token/refresh/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: "s" }),
  })
    .then((response) => {
      if (!response.ok) {
        window.location.href = "login.html";
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Handle success, such as redirecting to another page or showing a success message
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors, such as showing an error message to the user
      window.location.href = "login.html";
    });
}

// login
function login(e) {
  e.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  const data = JSON.stringify({
    email: email,
    password: password,
  });
  fetch(url + "users/login/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Handle success, such as redirecting to another page or showing a success message
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors, such as showing an error message to the user
    });
}

// register
function register(e) {
  e.preventDefault(); // Prevent the default form submission

  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;
  const data = JSON.stringify({
    email: email,
    password: password,
  });
  fetch(url + "users/register/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Success:", data);
      // Handle success, such as redirecting to another page or showing a success message
      window.location.href = "login.html";
    })
    .catch((error) => {
      console.error("Error:", error);
      // Handle errors, such as showing an error message to the user
    });
}
