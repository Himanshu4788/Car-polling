const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fetch = require("node-fetch");

// Import your Mongoose models (make sure these exist and are correct)
const userModel = require("./models/user");
const clientModel = require("./models/clientModels");
const driverModel = require("./models/driverModels");

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/carpooling")
  .then(() => console.log("DB connected"));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Auth middleware
function isAuthenticated(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.redirect("/login");

  jwt.verify(token, "shhhhh", (err, decoded) => {
    if (err) return res.redirect("/login");
    req.user = decoded;
    next();
  });
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login",(req, res) => {
  res.render("login");
})


// app.get("/submit-ride", isAuthenticated, async (req, res) => {
//   // const user = await userModel.findOne({ email: req.user.email });
//   // res.render("submit-ride", { user }); // 👈 now `user` is defined
//   res.send("hello");
// });


// Login page
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// Profile page (protected)




app.get("/profile", isAuthenticated, async (req, res) => {
  const user = await userModel.findOne({ email: req.user.email });
  res.render("profile", { user });
});


// Handle login POST
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) return res.status(500).send("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).send("Invalid credentials");

  const token = jwt.sign({ email: email, userid: user._id, username: user.username }, "shhhhh");
  res.cookie("token", token);
  res.redirect("/profile");
});

// Handle registration POST
app.post("/register", async (req, res) => {
  const { username, number, email, password } = req.body;
  const existing = await userModel.findOne({ email });
  if (existing) return res.status(400).send("Already exists");

  const hash = await bcrypt.hash(password, 10);
  const newUser = await userModel.create({ username, number, email, password: hash });

  const token = jwt.sign({ email, userid: newUser._id, username: newUser.username }, "shhhhh");
  res.cookie("token", token);
  res.redirect("/profile");
});





// app.post("/register", async (req, res) => {
 
// });



// Handle ride submission (client or driver)
// app.post("/submit-ride", isAuthenticated, async (req, res) => {
//   try {
//     const { role, location, destination } = req.body;
//     const username = req.user.username;

//     if (!location || !destination || !role) {
//       return res.status(400).send("Missing required fields");
//     }


//     if (role === "driver") {

//       await driverModel.create({ username, location, destination });
//       // const clients = await clientModel.find({ location, destination });
//       res.render("driver", { user: { username, location, destination }});
//       // res.send(location)
      
//     }  else if (role === "client") {



//       await clientModel.create({ username, location, destination });
//       // const clients = await clientModel.find({ location, destination });
//       res.render("driver", { user: { username, location, destination }});
//   // await clientModel.create({ username, location, destination });

//   // // Send location/destination to Java backend
//   // const javaRes = await fetch("http://localhost:8080/submit", {
//   //   method: "POST",
//   //   headers: { "Content-Type": "application/json" },
//   //   body: JSON.stringify({ location, destination }),
//   // });

//   // const javaMsg = await javaRes.text();
//   // console.log("✅ Java response:", javaMsg);

//   // res.render("client.ejs", {
//   //   user: { username, location, destination },
//   //   driver: null, // replace later with real match
//   // });


//       res.send(destination)
      

// }}
// catch (err) {
//     console.error("Error handling ride submission:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });




// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
