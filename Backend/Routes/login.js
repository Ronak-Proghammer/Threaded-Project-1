import { Router } from "express";
import {app, options} from "../../index.js";
import { getUserDetails, getValuesFromCustomers } from "../db-helper/user.js";
const userRouter = Router();

userRouter.get('/login', (req, res) => {
    res.sendFile("login.html", options);
});

// Login Route
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const data = await getUserDetails({ email, password });
    if(data.result){
        req.session.user = data.result.CustEmail;
        req.session.userId = data.result.CustomerId;
        req.session.isLoggedIn = true;
        res.status(200).send(data.message);
    }
    else{
        res.send(data.message);
    }
});

// Protected Route (can only be accessed when logged in)
userRouter.get('/dashboard', async (req, res) => {
    console.log(req.session.userId);
    let data = await getValuesFromCustomers(['CustFirstName'], req.session.userId);
    console.log(data.CustFirstName);
    if(data){
        res.sendFile("dashboard.html", options);
    }
});

// Sample route to check if the user is logged in
userRouter.get('/isLoggedIn', (req, res) => {
    if (req.session.isLoggedIn) {
      res.json({ loggedIn: true });
    } else {
      res.json({ loggedIn: false });
    }
  });

// Logout Route
userRouter.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logged out successfully!');
});

export default userRouter;