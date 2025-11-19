import {
  type Control,
  type ControllerFieldState,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseFormStateReturn,
} from "react-hook-form";

export interface FormFieldConfig<T extends FieldValues, N extends Path<T>> {
  name: N;
  label: string;
  render: (props: {
    field: ControllerRenderProps<T, N>;
    fieldState: ControllerFieldState;
    formState: UseFormStateReturn<T>;
  }) => React.ReactElement;
  condition?: (values: T) => boolean;
  description?: string;
  fieldLayout?: "static" | "flex";
}

export interface FormFieldWrapperProps<
  T extends FieldValues,
  N extends Path<T>
> {
  formField: FormFieldConfig<T, N>;
  control: Control<T>;
}
