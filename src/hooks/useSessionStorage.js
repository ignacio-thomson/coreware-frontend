export const useSessionStorage = (key) => {
  const storedValue = sessionStorage.getItem(key);

  if (!storedValue) {
    return false;
  } else {
    return storedValue;
  }
};
