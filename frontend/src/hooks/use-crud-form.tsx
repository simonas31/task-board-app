import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  type FieldValues,
  type UseFormProps,
  type UseFormReturn,
} from "react-hook-form";
import { type ZodObject } from "zod";
import { type input, type output } from "zod/v4/core";
import useApi from "./use-api";
import useSWR from "swr";
import * as React from "react";
import { toast } from "sonner";
import type { AxiosError } from "axios";

interface UseCrudFormReturn<
  TModel,
  TInput extends FieldValues,
  TOutput extends FieldValues
> {
  form: UseFormReturn<TInput, unknown, TOutput>;
  model?: TModel;
  isLoading: boolean;
  mutationError: AxiosError | string | null;
  submitForm: (body?: TInput | undefined) => Promise<void>;
}

interface UseCrudFormProps<TSchema extends ZodObject> {
  id?: number;
  schema: TSchema;
  createUrl: string;
  editUrl: string;
  onSuccess?: () => void;
  onError?: () => void;
  useFormOptions: UseFormProps<input<TSchema>, unknown, output<TSchema>>;
}

export default function useCrudForm<TModel, TSchema extends ZodObject>({
  id,
  schema,
  createUrl,
  editUrl,
  onSuccess,
  onError,
  useFormOptions,
}: UseCrudFormProps<TSchema>): UseCrudFormReturn<
  TModel,
  input<TSchema>,
  output<TSchema>
> {
  const isEditing = !!id;

  type InputType = input<TSchema>;
  type OutputType = output<TSchema>;

  // initialize fetchers, memoize functions
  const createFetcher = React.useCallback(
    (url: string, body?: InputType) => api.post(url, body),
    []
  );

  const editFetcher = React.useCallback(
    (url: string, body?: InputType) => api.put(url, body),
    []
  );

  const editModelFetcher = React.useCallback(
    (url: string) => api.get<TModel>(url).then((res) => res.data),
    []
  );

  // if editing fetch record
  const {
    data: model,
    isLoading: loadingModel,
    error: modelError,
  } = useSWR<TModel>(
    isEditing ? editUrl : null,
    isEditing ? editModelFetcher : null
  );

  // here should go types of schema in both Input and Output
  const form = useForm<InputType, unknown, OutputType>({
    resolver: zodResolver(schema),
    ...useFormOptions,
  });

  // model create,edit,delete hook
  const {
    execute,
    isLoading: loadingMutation,
    data: mutationData,
    error: mutationError,
  } = useApi<TModel, InputType>(
    isEditing ? editUrl : createUrl,
    isEditing ? editFetcher : createFetcher
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
        toast.success("message of some sort");
      }
    }
  }, [onSuccess, mutationData, form]);

  return { form, model, isLoading, mutationError, submitForm: execute };
}
