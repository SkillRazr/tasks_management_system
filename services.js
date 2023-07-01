import env from "@/.env.json";

const baseUrl =
"http://localhost:5001/genlent-8aab7/asia-south1/skillRazrTasks-api";


export const getBoard = async () => {
  return await fetch(`${baseUrl}/getBoard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_TASKS_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify({}),
  }).then((resp) => resp.json());
};

export const postBoard = async (payload) => {
  return await fetch(`${baseUrl}/postBoard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_TASKS_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify({payload}),
  }).then((resp) => resp.json());
};

export const updateBoard = async (payload) => {
  return await fetch(`${baseUrl}/updateBoard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_TASKS_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify({payload}),
  }).then((resp) => resp.json());
};

export const postList = async (payload) => {
  return await fetch(`${baseUrl}/postList`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_TASKS_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify({payload}),
  }).then((resp) => resp.json());
};

export const addCard = async (payload) => {
  return await fetch(`${baseUrl}/addCard`, {
    headers: {
      "Content-Type": "application/json",
      "skillrazr-sub-app": env["NEXT_TASKS_API_KEY"],
    },
    method: "POST",
    body: JSON.stringify({payload}),
  }).then((resp) => resp.json());
};