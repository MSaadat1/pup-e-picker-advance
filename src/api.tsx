import { Dog } from "./types";
export const baseUrl = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> => {
  // fill out method

  return fetch(`${baseUrl}/dogs`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP request failed! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data: Dog[]) => {
      return data;
    });
};

const postDog = (dog: Omit<Dog, "id">) => {
  // fill out method
  return fetch(`${baseUrl}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed! Status: ${res.status}`);
    }
    return res.json();
  });
};

const deleteDogRequest = (dogId: number) => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed! Status: ${res.status}`);
    }
    return res.json();
  });
};

const patchFavoriteForDog = (dogId: number, updatedDogData: Partial<Dog>) => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${dogId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedDogData),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP request failed! Status: ${res.status}`);
    }
    return res.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
