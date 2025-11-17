import CalendarInput from "@/components/ui/calendar-input";
import {
  Field,
  FieldContent,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useGenericForm from "@/hooks/use-generic-form";
import type { Task } from "@/types/KanbanProvider.types";
import type { Mode } from "@/types/UseGenericForm.types";
import z from "zod";

const taskFormSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  dueDate: z.date({ message: "Due date is required" }),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

type TaskFormProps = {
  mode: Mode;
};

export default function TaskForm({ mode }: TaskFormProps) {
  const { form, submitForm, isLoading } = useGenericForm<
    Task,
    typeof taskFormSchema
  >({
    mode,
    schema: taskFormSchema,
    mutateUrl: `/boards//tasks`,
  });

  async function onSubmit(data: TaskFormSchema) {
    await submitForm(data);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "title",
                label: "Task title",
                render: () => (
                  <Input {...form.register("title")} disabled={isLoading} />
                ),
              }}
            />
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "title",
                label: "Task title",
                render: () => <CalendarInput name="title" />,
              }}
            />
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel>Assignee</FieldLabel>
              </FieldContent>
              Select
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel>Priority</FieldLabel>
              </FieldContent>
              Select
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel>Tags</FieldLabel>
              </FieldContent>
              Select
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel>Description</FieldLabel>
              </FieldContent>
              Textarea
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel>Attachments</FieldLabel>
              </FieldContent>
              Custom file input
            </Field>
            <Field orientation="responsive">
              <FieldContent>
                <FieldLabel>Subtasks?</FieldLabel>
              </FieldContent>
              Select
            </Field>
          </FieldSet>
        </form>
      </Form>
    </>
  );
}
