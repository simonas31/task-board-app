import {
  type Control,
  type ControllerRenderProps,
  type FieldValues,
  type Path,
} from "react-hook-form";

export interface FormFieldConfig<T extends FieldValues> {
  name: Path<T>;
  label: string;
  render: (field: ControllerRenderProps<T>) => React.ReactElement;
  condition?: (values: T) => boolean;
  description?: string;
  fieldLayout?: "static" | "flex";
}

export interface FormFieldWrapperProps<T extends FieldValues> {
  formField: FormFieldConfig<T>;
  control: Control<T>;
}
