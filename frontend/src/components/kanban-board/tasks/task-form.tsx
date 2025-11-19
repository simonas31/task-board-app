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
import useApi from "@/hooks/use-api";
import useGenericForm from "@/hooks/use-generic-form";
import useKanban from "@/hooks/use-kanban";
import { api } from "@/lib/axios";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/KanbanProvider.types";
import type { Mode } from "@/types/UseGenericForm.types";
import * as React from "react";
import useSWR from "swr";
import z from "zod";

const taskFormSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  status: z.string().min(1, "Status is required"),
  description: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val ?? ""),
  dueDate: z.preprocess(
    (arg) => {
      if (!arg) return undefined;
      const date = new Date(arg as string);
      return isNaN(date.getTime()) ? undefined : date;
    },
    z.date({
      error: (iss) =>
        iss.input === undefined ? "Due date is required" : "Invalid format",
    })
  ),
  assignees: z.array(z.number()).optional(),
  priority: z.string().min(1, "Priority is required"),
  tags: z.array(z.number()).optional(),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

type TaskFormProps = {
  mode: Mode;
};

type Assignee = {
  id: number;
  fullName: string;
};

const assigneesFetcher = (url: string) => api.get(url).then((res) => res.data);

const deleteTaskFetcher = (url: string) =>
  api.delete(url).then((res) => res.data);

export default function TaskForm({ mode }: TaskFormProps) {
  const {
    project,
    activeBoard: board,
    selectedTask,
    addTask,
    updateTask,
    deleteTask,
  } = useKanban();

  const { form, submitForm, isLoading } = useGenericForm<
    Task,
    typeof taskFormSchema
  >({
    mode,
    schema: taskFormSchema,
    mutateUrl: `projects/${project?.id}/boards/${board?.id}/tasks/${
      selectedTask?.id ?? ""
    }`,
    fetchModelUrl: `projects/${project?.id}/boards/${board?.id}/tasks/${selectedTask?.id}`,
    useFormOptions: {
      defaultValues: {
        title: "",
        status: "",
        description: "",
        dueDate: undefined,
        assignees: [],
        priority: "",
        tags: [],
      },
    },
  });

  // fetch users assigned to this project
  const { data: assignees, isLoading: loadingAssignees } = useSWR<Assignee[]>(
    `projects/${project?.id}/assignees`,
    assigneesFetcher
  );

  async function onSubmit(data: TaskFormSchema) {
    const saved = await submitForm(data);
    if (!saved || !board) return;

    if (mode === "Create") addTask(board.id, saved);
    if (mode === "Update") updateTask(board.id, saved);
  }

  const {
    data: deleted,
    execute: deleteRequest,
    isLoading: deleting,
  } = useApi<Task>(
    mode === "Update"
      ? `projects/${project?.id}/boards/${board?.id}/tasks/${selectedTask?.id}`
      : "",
    deleteTaskFetcher
  );

  React.useEffect(() => {
    if (deleted && board && selectedTask) {
      deleteTask(board.id, selectedTask.id);
    }
  }, [deleted, board, selectedTask, deleteTask]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldSet>
            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "title",
                label: "Task title",
                render: ({ field }) => (
                  <Input
                    {...field}
                    placeholder="Provide task title"
                    disabled={isLoading}
                  />
                ),
              }}
            />

            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "status",
                label: "Status",
                render: ({ field, fieldState }) => (
                  <Select {...field} value={field.value} disabled={isLoading}>
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Todo">To-do</SelectItem>
                        <SelectItem value="InProgress">In Progress</SelectItem>
                        <SelectItem value="InReview">In Review</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ),
              }}
            />

            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "dueDate",
                label: "Due date",
                render: ({ field }) => {
                  return (
                    <CalendarInput
                      dateValue={field.value as Date | undefined}
                      onChange={field.onChange}
                      placeholder="Provide due date"
                    />
                  );
                },
              }}
            />

            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "assignees",
                label: "Assignees",
                render: ({ field }) => (
                  <MultiSelect
                    values={field.value?.map(String)}
                    onValuesChange={(values) =>
                      field.onChange(values.map((v) => Number(v)))
                    }
                  >
                    <MultiSelectTrigger
                      className="w-full hover:bg-inherit"
                      disabled={loadingAssignees}
                    >
                      <MultiSelectValue placeholder="Select assignees" />
                    </MultiSelectTrigger>

                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {assignees?.map((a) => (
                          <MultiSelectItem key={a.id} value={String(a.id)}>
                            {a.fullName}
                          </MultiSelectItem>
                        ))}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                ),
              }}
            />

            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "priority",
                label: "Priority",
                render: ({ field }) => (
                  <Select {...field} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ),
              }}
            />

            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "tags",
                label: "Tags",
                render: ({ field }) => (
                  <MultiSelect
                    values={field.value?.map(String)}
                    onValuesChange={(values) =>
                      field.onChange(values.map((v) => Number(v)))
                    }
                  >
                    <MultiSelectTrigger className="w-full hover:bg-inherit">
                      <MultiSelectValue placeholder="Select tags" />
                    </MultiSelectTrigger>

                    <MultiSelectContent>
                      <MultiSelectGroup>
                        {/* TODO: map tags here */}
                      </MultiSelectGroup>
                    </MultiSelectContent>
                  </MultiSelect>
                ),
              }}
            />

            <FormFieldWrapper
              control={form.control}
              formField={{
                name: "description",
                label: "Description",
                render: ({ field }) => (
                  <Textarea {...field} value={field.value ?? ""} />
                ),
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
          <div
            className={cn(
              "flex mt-4",
              mode === "Create" ? "justify-end" : "justify-between"
            )}
          >
            {mode === "Update" && (
              <Button
                type="button"
                variant="destructive"
                isLoading={isLoading || deleting}
                onClick={() => deleteRequest()}
              >
                Delete
              </Button>
            )}
            <div className="flex gap-2">
              <SheetClose asChild>
                <Button
                  variant="outline"
                  type="button"
                  isLoading={isLoading || deleting}
                >
                  Cancel
                </Button>
              </SheetClose>
              <Button isLoading={isLoading || deleting}>
                {mode === "Create" ? "Create" : "Update"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
