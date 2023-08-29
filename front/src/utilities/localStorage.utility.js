export const persistLocalStorage = (key, value) => {
  if (typeof value !== "string")
    return localStorage.setItem(key, JSON.stringify({ ...value }));
  return localStorage.setItem(key, value);
};

export const clearLocalStorage = (key) => {
  localStorage.removeItem(key);
};
