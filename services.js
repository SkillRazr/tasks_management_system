const baseUrl =
  process.env.NEXT_PUBLIC_APP_ENV === "production"
    ? "https://asia-south1-skillrazr-mobile.cloudfunctions.net/api"
    : "http://localhost:5001/skillrazr-mobile/asia-south1/api"; // make sure you are running firebase emulator locally

const tasksApiKey = "hello_tasks_@1234!";

console.log("App env", process.env.NEXT_PUBLIC_APP_ENV);

export const getBoard = async () => {
  return await fetch(`${baseUrl}/getBoard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-tasks-app": tasksApiKey,
    },
    method: "POST",
    body: JSON.stringify({}),
  }).then((resp) => resp.json());
};

export const addBoard = async (payload) => {
  return await fetch(`${baseUrl}/addBoard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-tasks-app": tasksApiKey,
    },
    method: "POST",
    body: JSON.stringify({ payload }),
  }).then((resp) => resp.json());
};

export const updateBoard = async (payload) => {
  return await fetch(`${baseUrl}/updateBoard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-tasks-app": tasksApiKey,
    },
    method: "POST",
    body: JSON.stringify({ payload }),
  }).then((resp) => resp.json());
};

export const addColumn = async (payload) => {
  return await fetch(`${baseUrl}/addColumn`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-tasks-app": tasksApiKey,
    },
    method: "POST",
    body: JSON.stringify({ payload }),
  }).then((resp) => resp.json());
};

export const addCard = async (payload) => {
  return await fetch(`${baseUrl}/addCard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-tasks-app": tasksApiKey,
    },
    method: "POST",
    body: JSON.stringify({ payload }),
  }).then((resp) => resp.json());
};

//Todo - Write API to implement archiving of a card, an archived card should not be seen in the board
export const archiveCard = async (payload) => {};
