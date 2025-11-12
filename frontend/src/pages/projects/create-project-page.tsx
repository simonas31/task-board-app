import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import useCrudForm from "@/hooks/use-generic-form";

const createProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required",
  }),
});

type Project = {
  id: number;
  name: string;
};

type CreateProjectSchema = z.infer<typeof createProjectSchema>;

export default function CreateProjectPage() {
  const { form, isLoading, submitForm } = useCrudForm<
    Project,
    typeof createProjectSchema
  >({
    mode: "Create",
    schema: createProjectSchema,
    mutateUrl: "/projects",
    useFormOptions: {
      defaultValues: {
        name: "",
      },
    },
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
            name="name"
            label="Project name"
            render={(field) => {
              return <Input disabled={isLoading} {...field} />;
            }}
          />
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
