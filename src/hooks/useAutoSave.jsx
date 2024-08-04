import { useState, useEffect } from "react";

const useAutoSave = (delay = 1000) => {
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (isSaving) {
        setIsSaving(false);
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [isSaving, delay, setIsSaving]);

  return [isSaving, setIsSaving];
};

export default useAutoSave;
