import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface FormType {
  pid: string;
  setPid: Dispatch<SetStateAction<string>>;
}

const FormContext = createContext<FormType | null>(null);

const useFormContext = () => useContext(FormContext);

export { FormContext, useFormContext };
