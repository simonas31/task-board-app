import useGenericForm from "@/hooks/use-generic-form";
import { useFieldArray } from "react-hook-form";
import z from "zod";
import { Form, FormFieldWrapper } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  boards: z
    .array(
      z.object({
        name: z.string().min(1, "Board name is required"),
      })
    )
    .optional(),
});

export interface Project {
  id: number;
  name: string;
}

type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export default function CreateProjectForm() {
  const { form, isLoading, submitForm } = useGenericForm<
    Project,
    typeof createProjectSchema
  >({
    mode: "Create",
    schema: createProjectSchema,
    mutateUrl: "/projects",
    useFormOptions: {
      defaultValues: {
        name: "",
        boards: [],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "boards",
  });

  async function onSubmit(formData: CreateProjectSchema) {
    await submitForm(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormFieldWrapper
          control={form.control}
          formField={{
            name: "name",
            label: "Project name",
            fieldLayout: "flex",
            render: ({ field }) => {
              return <Input {...field} disabled={isLoading} />;
            },
          }}
        />
        <Separator className="my-5" />
        <div>
          <h5 className="my-3">Boards</h5>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {fields.map((board, index) => {
              return (
                <div className="flex flex-col gap-2">
                  <Card key={board.id}>
                    <CardContent>
                      <FormFieldWrapper
                        control={form.control}
                        formField={{
                          name: `boards.${index}.name`,
                          label: "Board name",
                          render: ({ field }) => {
                            return <Input {...field} />;
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                  <div>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Minus /> Remove
                    </Button>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center items-center">
              <Button
                type="button"
                onClick={() => {
                  append({ name: "" }, {});
                }}
              >
                <Plus /> Add board
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-3 space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.reset();
            }}
          >
            Cancel
          </Button>
          <Button isLoading={isLoading}>Create</Button>
        </div>
      </form>
    </Form>
  );
}
