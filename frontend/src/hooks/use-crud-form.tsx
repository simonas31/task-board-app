import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValues, type UseFormReturn } from "react-hook-form";
import { type ZodObject } from "zod";
import { type input, type output } from "zod/v4/core";
import useApi from "./use-api";
import useSWR from "swr";
import * as React from "react";

interface UseCrudFormReturn<
  TModel,
  TInput extends FieldValues,
  TOutput extends FieldValues
> {
  form: UseFormReturn<TInput, unknown, TOutput>;
  model?: TModel;
}

interface UseCrudFormProps<TSchema extends ZodObject> {
  id?: number;
  schema: TSchema;
  createUrl: string;
  editUrl: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export default function useCrudForm<TModel, TSchema extends ZodObject>({
  id,
  schema,
  createUrl,
  editUrl,
}: UseCrudFormProps<TSchema>): UseCrudFormReturn<
  TModel,
  input<TSchema>,
  output<TSchema>
> {
  const isEditing = !!id;

  type InputType = input<TSchema>;
  type OutputType = output<TSchema>;

  // initialize fetchers
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
  });

  const {
    execute,
    isLoading: loadingMutation,
    data: mutationData,
    error: mutationError,
  } = useApi<TModel, InputType>(
    isEditing ? editUrl : createUrl,
    isEditing ? editFetcher : createFetcher
  );

  // use React.useEffect to trigger rerender if submission was successful or not

  return { form };
}
