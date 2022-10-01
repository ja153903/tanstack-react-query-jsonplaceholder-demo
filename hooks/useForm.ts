import { useState } from "react";

export type Schema = Record<string, { type: string; value?: any }>;

export type FormError = { type: string; message: string };

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, FormError>;
  touched: Record<string, boolean>;
}

export const INITIAL_FORM_STATE: FormState = {
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
      case "select":
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
      case "multiselect":
        // NOTE: this might be over-engineering for now
        // We currently don't have a use-case for multi-select
        // This could be something we might consider using in the future
        const { options } = value;

        const optionsAsRecord = options.reduce(
          (acc: Record<string, boolean>, optionKey: string) => ({
            ...acc,
            [optionKey]: false,
          }),
          {}
        );

        return {
          ...acc,
          values: {
            ...acc.values,
            [key]: optionsAsRecord ?? {},
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

  const handleChange = (key: string) => {
    return (
      event: React.ChangeEvent<
        HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
      >
    ) => {
      setFormState((previousFormState) => ({
        ...previousFormState,
        values: {
          ...previousFormState.values,
          [key]: event.target.value,
        },
      }));
    };
  };

  // TODO: Implement handleBlur
  // TODO: Implement handleSubmit
  // TODO: Implement reset

  return {
    formState,
    setFormState,
    getValue,
    setValue,
    getError,
    setError,
    handleChange,
  };
}

export type FormType = ReturnType<typeof useForm>;
