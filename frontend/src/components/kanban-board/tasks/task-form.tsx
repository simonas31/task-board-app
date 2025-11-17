import { Button } from "@/components/ui/button";
import CalendarInput from "@/components/ui/calendar-input";
import { FieldSet } from "@/components/ui/field";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SheetClose } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import useGenericForm from "@/hooks/use-generic-form";
import type { Task } from "@/types/KanbanProvider.types";
import type { Mode } from "@/types/UseGenericForm.types";
import z from "zod";

const taskFormSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  description: z.string().optional(),
  dueDate: z.date({ message: "Due date is required" }),
  assignees: z.array(z.number()).optional(),
  priority: z.string().min(1),
  tags: z.array(z.number()).optional(),
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
                  <Input
                    {...form.register("title")}
                    placeholder="Provide task title"
                    disabled={isLoading}
                  />
                ),
              }}
            />
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "dueDate",
                label: "Due date",
                render: () => (
                  <CalendarInput
                    name="dueDate"
                    placeholder="Provide due date"
                    onChange={(value) => {
                      form.setValue("dueDate", value);
                    }}
                  />
                ),
              }}
            />
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "assignees",
                label: "Assignees",
                render: () => (
                  <MultiSelect>
                    <MultiSelectTrigger className="w-full hover:bg-inherit">
                      <MultiSelectValue placeholder="Select assignees" />
                    </MultiSelectTrigger>

                    <MultiSelectContent>
                      <MultiSelectGroup>
                        <MultiSelectItem value="next.js">
                          Next.js
                        </MultiSelectItem>
                        <MultiSelectItem value="sveltekit">
                          SvelteKit
                        </MultiSelectItem>
                        <MultiSelectItem value="astro">Astro</MultiSelectItem>
                        <MultiSelectItem value="vue">Vue.js</MultiSelectItem>
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                ),
              }}
            />
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "priority",
                label: "Priority",
                render: () => (
                  <Select
                    onValueChange={(value) => {
                      form.setValue("priority", value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Low</SelectItem>
                        <SelectItem value="banana">Medium</SelectItem>
                        <SelectItem value="blueberry">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ),
              }}
            />
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "tags",
                label: "Tags",
                render: () => (
                  <MultiSelect>
                    <MultiSelectTrigger className="w-full hover:bg-inherit">
                      <MultiSelectValue placeholder="Select tags" />
                    </MultiSelectTrigger>

                    <MultiSelectContent>
                      <MultiSelectGroup>
                        <MultiSelectItem value="1">Dashboard</MultiSelectItem>
                        <MultiSelectItem value="2">Mobile app</MultiSelectItem>
                        <MultiSelectItem value="3">Login</MultiSelectItem>
                        <MultiSelectItem value="4">API</MultiSelectItem>
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                ),
              }}
            />
            <FormFieldWrapper<TaskFormSchema>
              control={form.control}
              formField={{
                name: "description",
                label: "Description",
                render: () => <Textarea />,
              }}
            />
            {/* <Field orientation="responsive">
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
            </Field> */}
          </FieldSet>
          <div className="flex gap-2 mt-4 justify-end">
            <SheetClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </SheetClose>
            <Button>Create</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
