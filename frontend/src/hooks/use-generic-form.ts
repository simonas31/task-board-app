import z, { type ZodObject } from "zod";
import { type output } from "zod/v4/core";
import type {
  Mode,
  UseGenericFormProps,
  UseGenericFormReturn,
} from "@/types/UseGenericForm.types";

import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type Resolver } from "react-hook-form";
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
  TModel extends FieldValues,
  TSchema extends ZodObject<{ [key: string]: z.ZodType }>,
  TReturnModel = TModel
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
  output<TSchema>,
  TReturnModel
> {
  if (mode === "Update" && typeof fetchModelUrl === "undefined") {
    throw new Error("'fetchModelUrl' is missing in hook properties");
  }

  const modes = React.useMemo(() => getModes(mode), [mode]);

  type OutputType = output<TSchema>;

  // initialize fetchers, memoize functions
  const createFetcher = React.useCallback(
    (url: string, body?: OutputType) => api.post(url, body),
    []
  );

  const updateFetcher = React.useCallback(
    (url: string, body?: OutputType) => api.put(url, body),
    []
  );

  const modelFetcher = React.useCallback(
    (url: string) => api.get<TReturnModel>(url).then((res) => res.data),
    []
  );

  // if editing fetch record
  const {
    data: model,
    isLoading: loadingModel,
    error: modelError,
  } = useSWR<TReturnModel>(
    modes.isUpdating ? fetchModelUrl : null,
    modes.isUpdating ? modelFetcher : null
  );

  const parsedModel = React.useMemo(() => {
    if (!model) return undefined;
    try {
      return schema.parse(model) as OutputType;
    } catch (err) {
      console.error("Failed to parse model", err);
      return model as unknown as OutputType;
    }
  }, [model, schema]);

  // here should go types of schema in both Input and Output
  const form = useForm<OutputType, unknown, OutputType>({
    resolver: zodResolver(schema) as Resolver<OutputType>,
    values: parsedModel,
    ...useFormOptions,
  });

  // model create,edit,delete hook
  const {
    execute,
    isLoading: loadingMutation,
    data: mutationData,
    error: mutationError,
  } = useApi<TReturnModel, OutputType>(
    mutateUrl,
    modes.isUpdating ? updateFetcher : createFetcher
  );

  const isLoading = React.useMemo(
    () => loadingModel || loadingMutation,
    [loadingModel, loadingMutation]
  );

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
      if (modes.isCreating) {
        form.reset();
      }

      if (onSuccess) {
        onSuccess();
      } else {
        toast.success(
          `Record ${modes.isCreating ? "created" : "updated"} successfully`
        );
      }
    }
  }, [modes, onSuccess, mutationData, form]);

  return { form, model, isLoading, mutationError, submitForm: execute };
}
