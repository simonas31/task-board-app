import z, { type ZodObject } from "zod";
import { type input, type output } from "zod/v4/core";
import type {
  Mode,
  UseGenericFormProps,
  UseGenericFormReturn,
} from "@/types/UseGenericForm.types";

import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useApi from "./use-api";
import useSWR from "swr";
import * as React from "react";
import { toast } from "sonner";

function getModes(mode: Mode) {
  return {
    isCreating: mode === "Create",
    isUpdating: mode === "Update",
  };
}

export default function useGenericForm<
  TModel extends input<TSchema>,
  TSchema extends ZodObject<{ [key: string]: z.ZodType }>
>({
  mode,
  schema,
  mutateUrl,
  fetchModelUrl,
  onSuccess,
  onError,
  useFormOptions,
}: UseGenericFormProps<TSchema>): UseGenericFormReturn<
  TModel,
  input<TSchema>,
  output<TSchema>
> {
  if (mode === "Update" && typeof fetchModelUrl === "undefined") {
    throw new Error("'fetchModelUrl' is missing in hook properties");
  }

  const modes = getModes(mode);

  type InputType = input<TSchema>;
  type OutputType = output<TSchema>;

  // initialize fetchers, memoize functions
  const createFetcher = React.useCallback(
    (url: string, body?: InputType) => api.post(url, body),
    []
  );

  const updateFetcher = React.useCallback(
    (url: string, body?: InputType) => api.put(url, body),
    []
  );

  const modelFetcher = React.useCallback(
    (url: string) => api.get<TModel>(url).then((res) => res.data),
    []
  );

  // if editing fetch record
  const {
    data: model,
    isLoading: loadingModel,
    error: modelError,
  } = useSWR<TModel>(
    modes.isUpdating ? fetchModelUrl : null,
    modes.isUpdating ? modelFetcher : null
  );

  // here should go types of schema in both Input and Output
  const form = useForm<InputType, unknown, OutputType>({
    resolver: zodResolver(schema),
    values: model,
    ...useFormOptions,
  });

  // model create,edit,delete hook
  const {
    execute,
    isLoading: loadingMutation,
    data: mutationData,
    error: mutationError,
  } = useApi<TModel, InputType>(
    mutateUrl,
    modes.isUpdating ? updateFetcher : createFetcher
  );

  const isLoading = loadingModel || loadingMutation;

  // use React.useEffect to trigger rerender if submission was successful or not

  // handle toast for api feedback useEffect #1
  React.useEffect(() => {
    if (onError) {
      onError();
    } else if (modelError) {
      toast.error("Could not fetch record. Please try again");
    } else if (mutationError) {
      toast.error("Could not mutate record. Please try again");
    }
  }, [onError, modelError, mutationError]);

  // handle form reset logic useEffect #2
  React.useEffect(() => {
    if (mutationData) {
      form.reset();
      if (onSuccess) {
        onSuccess();
      } else {
        toast.success("Record created successfully");
      }
    }
  }, [onSuccess, mutationData, form]);

  return { form, model, isLoading, mutationError, submitForm: execute };
}
