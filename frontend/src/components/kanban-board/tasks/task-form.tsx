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
import useKanban from "@/hooks/use-kanban";
import { api } from "@/lib/axios";
import type { Task } from "@/types/KanbanProvider.types";
import type { Mode } from "@/types/UseGenericForm.types";
import useSWR from "swr";
import z from "zod";

const taskFormSchema = z.object({
  title: z.string().min(1, "Task title is required"),
  status: z.string({ message: "Status is required" }).min(1),
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

type Assignee = {
  id: number;
  fullName: string;
};

const assigneesFetcher = (url: string) => api.get(url).then((res) => res.data);

export default function TaskForm({ mode }: TaskFormProps) {
  const { project, activeBoard: board, selectedTask, addTask } = useKanban();

  const { form, submitForm, isLoading } = useGenericForm<
    Task,
    typeof taskFormSchema
  >({
    mode,
    schema: taskFormSchema,
    mutateUrl: `projects/${project?.id}/boards/${board?.id}/tasks`,
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
    const createdTask = await submitForm(data);

    if (createdTask && board) {
      addTask(board.id, createdTask);
    }
  }

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
                render: ({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="w-full">
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
                render: ({ field }) => (
                  <CalendarInput
                    dateValue={field.value}
                    onChange={field.onChange}
                    placeholder="Provide due date"
                  />
                ),
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
                  <Select value={field.value} onValueChange={field.onChange}>
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
                render: ({ field }) => <Textarea {...field} />,
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
