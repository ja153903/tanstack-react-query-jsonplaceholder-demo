import { useState } from "react";

type Schema = Record<string, { type: string; value?: any }>;

type FormError = { type: string; message: string };

interface FormState {
  values: Record<string, any>;
  errors: Record<string, FormError>;
  touched: Record<string, boolean>;
}

const INITIAL_FORM_STATE: FormState = {
  values: {},
  errors: {},
  // we need to implement a handleBlur function for this
  touched: {},
};

function _schemaToFormState(schema: Schema): FormState {
  return Object.entries(schema).reduce((acc, [key, typeInformation]) => {
    const { value, type } = typeInformation;

    switch (type) {
      case "string":
        return {
          ...acc,
          values: {
            ...acc.values,
            [key]: value ?? "",
          },
        };
      case "boolean":
        return {
          ...acc,
          values: {
            ...acc.values,
            [key]: value ?? false,
          },
        };
      case "number":
        return {
          ...acc,
          values: {
            ...acc.values,
            [key]: value ?? 0,
          },
        };
      default:
        return acc;
    }
  }, INITIAL_FORM_STATE);
}

// We will need to flesh this out to also contain error states
// and all the good stuff, but that's a problem for another day
export function useForm(schema: Schema) {
  const [formState, setFormState] = useState<FormState>(() =>
    _schemaToFormState(schema)
  );

  const setValue = (key: string, value: any) => {
    setFormState((previousFormState) => ({
      ...previousFormState,
      values: {
        ...previousFormState.values,
        [key]: value,
      },
    }));
  };

  const getValue = (key: string) => formState?.values?.[key] ?? null;

  const getError = (key: string) => formState?.errors?.[key] ?? null;

  const setError = (key: string, error: FormError) => {
    setFormState((previousFormState) => ({
      ...previousFormState,
      errors: {
        ...previousFormState.errors,
        [key]: error,
      },
    }));
  };

  // need to implement handleBlur, handleChange, handleSubmit

  return {
    formState,
    setFormState,
    getValue,
    setValue,
    getError,
    setError,
  };
}

export type FormType = ReturnType<typeof useForm>;
