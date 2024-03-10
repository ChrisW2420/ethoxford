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

// get user's subscriptions
function get_user_subscriptions() {
  // refresh access token
  return new Promise((resolve, reject) => {
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
          return reject(false);
        }
        return response.json();
      })
      .then((data) => {
        // use new access to get all subscriptions
        let access_token = data["access"];
        fetch(url + "subscriptions/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then((response) => {
            return resolve(response.json());
          })
          .catch((error) => {
            console.error("Error: ", error);
            return reject(false);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, such as showing an error message to the user
        window.location.href = "login.html";
        return reject(false);
      });
  });
}

// create subscription in db
function create_subscription(body) {
  // refresh access token
  return new Promise((resolve, reject) => {
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
          return reject(false);
        }
        return response.json();
      })
      .then((data) => {
        // use new access to get all subscriptions
        let access_token = data["access"];
        fetch(url + "subscriptions/create/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(body),
        })
          .then((response) => {
            return resolve(response.json());
          })
          .catch((error) => {
            console.error("Error: ", error);
            return reject(false);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, such as showing an error message to the user
        window.location.href = "login.html";
        return reject(false);
      });
  });
}

function delete_subscription(id) {
  // refresh access token
  return new Promise((resolve, reject) => {
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
          return reject(false);
        }
        return response.json();
      })
      .then((data) => {
        // use new access to delete the subscription
        let access_token = data["access"];
        fetch(url + "subscriptions/" + id + "/", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then((response) => {
            window.location.href = "index.html";
            return resolve(response.json());
          })
          .catch((error) => {
            window.location.href = "index.html";
            return reject(false);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, such as showing an error message to the user
        window.location.href = "login.html";
        return reject(false);
      });
  });
}

// update subscription dates
function update_subscription_dates(id, period) {
  // refresh access token
  return new Promise((resolve, reject) => {
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
          // window.location.href = "login.html";
          return reject(false);
        }
        return response.json();
      })
      .then((data) => {
        // use new access to delete the subscription
        let currentDate = new Date();
        let nextDate = currentDate;
        nextDate.setSeconds(nextDate.getSeconds() + parseInt(period));

        let access_token = data["access"];
        fetch(url + "subscriptions/" + id + "/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            date_pay_next: nextDate,
          }),
        })
          .then((response) => {
            return resolve(response.json());
          })
          .catch((error) => {
            // window.location.href = "index.html";
            return reject(false);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors, such as showing an error message to the user
        // window.location.href = "login.html";
        return reject(false);
      });
  });
}
