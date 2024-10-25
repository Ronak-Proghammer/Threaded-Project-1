import { Router } from "express";
import { options } from "../../index.js";
import { getUserDetails, getValuesFromCustomers } from "../db-helper/user.js";
import { checkAuth } from "../middlewares/user-auth.js";
const userRouter = Router();

userRouter.get("/login", (req, res) => {
  res.sendFile("login.html", options);
});

// Login Route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await getUserDetails({ email, password });
  if (data.result) {
    req.session.user = data.result.CustEmail;
    req.session.userId = data.result.CustomerId;
    req.session.isLoggedIn = true;
    res.status(200).send(data.message);
  } else {
    res.send(data.message);
  }
});

// Protected Route (can only be accessed when logged in)
userRouter.get("/dashboard", async (req, res) => {
  console.log(req.session.userId);
  let data = await getValuesFromCustomers(
    ["CustFirstName"],
    req.session.userId
  );
  console.log(data.CustFirstName);
  if (req.session.isLoggedIn && data) {
    res.sendFile("dashboard.html", options);
  } else {
    res.send("Sorryy Pretected route!!!");
  }
});

userRouter.get("/loggedIn", async (req, res, next) => {
  const user_status = checkAuth(req, res, next);
  if (user_status) {
    const result = await getValuesFromCustomers(
      ["CustFirstName", "CustLastName"],
      req.session.userId
    );
    res.json({ isLoggedIn: user_status, result });
  } else {
    res.json({ isLoggedIn: user_status });
  }
});

// Logout Route
userRouter.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

export default userRouter;
