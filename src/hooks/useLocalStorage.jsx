import React from "react";
import { useImmerReducer } from "use-immer";

const useLocalStorage = (reducer, init, key) => {
  const initializer = () => {
    if (!localStorage) return init;
    try {
      const storedValue = localStorage.getItem(key);
      if (!storedValue) return init;
      return JSON.parse(storedValue);
    } catch (e) {
      console.error("Failed to load data from local storage");
      return init;
    }
  };
  const [storedValue, dispatch] = useImmerReducer(reducer, init, initializer);

  React.useEffect(() => {
    if (!localStorage) return;
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (e) {
      console.error("Failed to save to local storage");
    }
  }, [storedValue, key]);
  return [storedValue, dispatch];
};

export default useLocalStorage;
