import { createContext, useContext } from "react";

import type { FormType } from "../hooks/useForm";

const FormContext = createContext<FormType>({} as FormType);

const useFormContext = () => useContext(FormContext);

export { FormContext, useFormContext };
