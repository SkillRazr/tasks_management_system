import env from "@/.env.json";

const baseUrl =
  "http://127.0.0.1:5001/skillrazr-mobile/asia-south1/skillRazrTest";

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