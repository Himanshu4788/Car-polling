
  // const role = "<%= role %>";
  // function handleSubmit() {
  //   if (role === "driver") {
  //     driverRide();
  //   } else {
  //     clientRide();
  //   }
  // }

function driverRide() {
  const location = document.getElementById("location").value;
  const destination = document.getElementById("destination").value;

  if (!location || !destination) {
    alert("Please fill both fields.");
    return;
  }

    const user = {
    username: "<%= user.username %>",
    email: "<%= user.email %>",
    location: location,
    destination:destination 
  };

  // Save user info to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to client page
  window.location.href = "/driver";
}


function clientRide() {
  const location = document.getElementById("location").value;
  const destination = document.getElementById("destination").value;

  if (!location || !destination) {
    alert("Please fill both fields.");
    return;
  }

    const user = {
    username: "<%= user.username %>",
    email: "<%= user.email %>",
    location: location,
    destination:destination 
  };

  // Save user info to localStorage
  localStorage.setItem("user", JSON.stringify(user));

  // Redirect to client page
  window.location.href = "/client";
}
