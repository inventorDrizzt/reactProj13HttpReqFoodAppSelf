import { useState } from "react";

const useValidate = (formValid) => {
  const [input, setInput] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [inputTouched, setInputTouched] = useState(false);

  const inputUpdateHandler = (event) => {
    setInput(event.target.value);
    if (event.target.value.trim() !== "") {
      setInputValid(true);
    }
    formValid();
  };

  const inputBlurHandler = (event) => {
    setInput(event.target.value);
    setInputTouched(true);
    if (event.target.value.trim() === "") {
      setInputValid(false);
    }
    formValid();
  };

  return {
    input,
    inputValid,
    inputTouched,
    inputUpdateHandler,
    inputBlurHandler,
  };
};

export default useValidate;
