const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
const env = require("./.env.json");

admin.initializeApp();
const app = express();

const whitelist = [
  "https://skillrazr.com",
  "https://skillrazr.web.app",
  "https://skillrazr-mobile.web.app",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:8082",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: false,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => res.status(200).send("hi tasks!"));

app.post("/addColumn", async (req, res) => {
  if (req.header("skillrazr-tasks-app") !== env.TASKS_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const { payload: list } = req.body;
  const db = admin.firestore();

  try {
    const boardRef = db.collection("boards").doc("RVqKBADpFoUaXfKSabUX");
    const boardData = await boardRef.get();
    const settings = boardData.data().settings || [];
    const updatedList = [...settings, list];
    await boardRef.update({ settings: updatedList });
    return res.status(200).json({ status: 1, data: boardData.data() });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/addCard", async (req, res) => {
  if (req.header("skillrazr-tasks-app") !== env.TASKS_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const { payload: card } = req.body;
  const db = admin.firestore();

  try {
    const boardRef = db.collection("boards").doc("RVqKBADpFoUaXfKSabUX");
    const boardData = await boardRef.get();
    const cards = boardData.data().cards || [];
    const updatedCard = [...cards, card];
    await boardRef.update({ cards: updatedCard });
    return res.status(200).json({ status: 1, data: boardData.data() });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/getBoard", async (req, res) => {
  if (req.header("skillrazr-tasks-app") !== env.TASKS_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const db = admin.firestore();

  try {
    const boardRef = db.collection("boards").doc("RVqKBADpFoUaXfKSabUX");
    const boardData = await boardRef.get();
    return res.status(200).json({ status: 1, data: boardData.data() });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/addBoard", async (req, res) => {
  if (req.header("skillrazr-tasks-app") !== env.TASKS_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const { payload } = req.body;
  console.log(payload);
  const db = admin.firestore();

  try {
    const boardRef = db.collection("boards");
    await boardRef.set(payload);
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

app.post("/updateBoard", async (req, res) => {
  if (req.header("skillrazr-tasks-app") !== env.TASKS_API_HEADER_KEY_VALUE) {
    return res.status(401).json({ status: 0, error: "you are not authorised" });
  }

  const { payload } = req.body;
  const db = admin.firestore();

  try {
    const boardRef = db.collection("boards").doc("RVqKBADpFoUaXfKSabUX");
    await boardRef.update({ settings: payload.settings, cards: payload.cards });
    return res.status(200).json({ status: 1 });
  } catch (error) {
    return res.status(500).json({ status: -1, error });
  }
});

//Todo - expose an API to return all available boards
//Todo - expose an API to archive a board, an archived board will not appear in the dashboard
//Todo - expose an API to update a column title, remove an empty column
//Todo - expose an API to archive a card, an archived card should not be shown in the dashboard

exports.api = functions.region("asia-south1").https.onRequest(app);
