import type { AxiosError } from "axios";
import type { FieldValues, UseFormProps, UseFormReturn } from "react-hook-form";
import type { input, output, ZodObject, ZodRawShape } from "zod";

export interface UseGenericFormReturn<
  TModel,
  TInput extends FieldValues,
  TOutput extends FieldValues
> {
  form: UseFormReturn<TInput, unknown, TOutput>;
  model?: TModel;
  isLoading: boolean;
  mutationError: AxiosError | string | null;
  submitForm: (body?: TInput | undefined) => Promise<TModel | null>;
}

export type Mode = "Create" | "Update";

export interface UseGenericFormProps<TSchema extends ZodObject<ZodRawShape>> {
  mode: Mode;
  schema: TSchema;
  mutateUrl: string;
  fetchModelUrl?: string;
  onSuccess?: () => void;
  onError?: () => void;
  useFormOptions?: UseFormProps<input<TSchema>, unknown, output<TSchema>>;
}
