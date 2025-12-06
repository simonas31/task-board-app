import { Button } from "@/components/ui/button";
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
  title: z.string().min(1, "Task title is required").default(""),
  status: z.string().min(1, "Status is required").default(""),
  description: z.string().optional().nullable().default(""),
  dueDate: z.iso.date().default(""),
  assignees: z.array(z.number()).optional().default([]),
  priority: z.string().min(1, "Priority is required").default(""),
  tags: z.array(z.number()).optional().default([]),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

type TaskFormProps = {
  mode: Mode;
  closeSheet: () => void;
};

type Assignee = {
  id: number;
  fullName: string;
};

const assigneesFetcher = (url: string) => api.get(url).then((res) => res.data);

const deleteTaskFetcher = (url: string) => api.delete(url);

export default function TaskForm({ mode, closeSheet }: TaskFormProps) {
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
      defaultValues: mode === "Create" ? taskFormSchema.parse({}) : undefined,
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

  const hasDeletedRef = React.useRef(false);

  React.useEffect(() => {
    if (!deleted) return;
    if (hasDeletedRef.current) return;

    hasDeletedRef.current = true;

    if (board?.id && selectedTask?.id) {
      deleteTask(board.id, selectedTask.id);
      closeSheet();
    }
  }, [deleted]);

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
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger
                      className="w-full"
                      aria-invalid={fieldState.invalid}
                    >
                      <SelectValue
                        placeholder="Select status"
                        defaultValue={field.value}
                      />
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
                    // <CalendarInput
                    //   dateValue={field.value}
                    //   onChange={field.onChange}
                    //   placeholder="Provide due date"
                    // />
                    <Input {...field} />
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
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
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
