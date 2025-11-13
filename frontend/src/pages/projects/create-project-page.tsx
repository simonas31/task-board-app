import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import useGenericForm from "@/hooks/use-generic-form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

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

type Project = {
  id: number;
  name: string;
};

type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export default function CreateProjectPage() {
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormFieldWrapper<CreateProjectSchema>
            control={form.control}
            formField={{
              name: "name",
              label: "Project name",
              render: () => {
                return (
                  <Input {...form.register("name")} disabled={isLoading} />
                );
              },
            }}
          />
          <div>
            <p className="my-3">Boards</p>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {fields.map((board, index) => {
                return (
                  <Card key={board.id}>
                    <CardHeader className="flex justify-end">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <Minus /> Remove
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <FormFieldWrapper<CreateProjectSchema>
                        control={form.control}
                        formField={{
                          name: `boards.${index}.name`,
                          label: "Board name",
                          render: () => {
                            return (
                              <Input
                                {...form.register(`boards.${index}.name`)}
                              />
                            );
                          },
                        }}
                      />
                    </CardContent>
                  </Card>
                );
              })}
              <div className="flex justify-center items-center">
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    append({ name: "" }, {});
                  }}
                >
                  <Plus /> Add board
                </Button>
              </div>
            </div>
          </div>
          <Button
            className="w-full mt-2"
            variant="outline"
            isLoading={isLoading}
          >
            Create
          </Button>
        </form>
      </Form>
    </>
  );
}
