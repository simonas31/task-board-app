import type { AxiosError } from "axios";
import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import type { output, ZodObject, ZodRawShape } from "zod";

export interface UseGenericFormReturn<
  TModel,
  TOutput extends FieldValues,
  TReturnModel = TModel
> {
  form: UseFormReturn<TOutput, unknown, TOutput>;
  model?: TReturnModel;
  isLoading: boolean;
  mutationError: AxiosError | string | null;
  submitForm: (body?: TOutput | undefined) => Promise<TReturnModel | null>;
}

export type Mode = "Create" | "Update";

export interface UseGenericFormProps<TSchema extends ZodObject<ZodRawShape>> {
  mode: Mode;
  schema: TSchema;
  mutateUrl: string;
  fetchModelUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
  useFormOptions?: UseFormProps<output<TSchema>, unknown, output<TSchema>>;
}
