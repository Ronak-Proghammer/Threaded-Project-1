import { Router } from "express";
import { getAllAgenciesAndAgents } from "../db-helper/contact.js";
const router = Router();

router.get("/", (req, res) => {
  res.sendFile("index.html", options);
});

router.get("/register", (req, res) => {
  res.sendFile("register.html", options);
});

router.get("/contact", (req, res) => {
  res.sendFile("contact.html", options);
});

// router.get('/api/packages', (req, res) => {
//     const sql = 'select * from packages';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.setHeader('content-type', 'application/json');

//         if (res.statusCode == 200) {
//             res.json(result);
//         } else {
//             console.log(res.status)
//         }
//     });
// });

router.get("/api/agencies", async (req, res) => {
  const sql = "select * from agencies";
  const result = await getAllAgenciesAndAgents();
  console.log("resultlt btttjt t", result);
  res.setHeader("content-type", "application/json");

  if (res.statusCode == 200) {
    console.log(result);
    res.json(result);
  } else {
    console.log(res.status);
  }
});

export default router;
