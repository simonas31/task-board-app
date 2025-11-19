import { Button } from "@/components/ui/button";
import { Form, FormFieldWrapper } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useParams } from "react-router";
import useGenericForm from "@/hooks/use-generic-form";

const updateProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required",
  }),
});

type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;

type Project = {
  id: number;
  name: string;
};

export default function EditProjectPage() {
  const { projectId } = useParams();
  const { form, isLoading, submitForm } = useGenericForm<
    Project,
    typeof updateProjectSchema
  >({
    mode: "Update",
    schema: updateProjectSchema,
    mutateUrl: `/projects/${projectId}`,
    fetchModelUrl: `/projects/${projectId}`,
  });

  async function onSubmit(formData: UpdateProjectSchema) {
    await submitForm(formData);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormFieldWrapper
            control={form.control}
            formField={{
              name: "name",
              label: "Project name",
              render: ({ field }) => {
                return <Input {...field} disabled={isLoading} />;
              },
            }}
          />
          <Button
            className="w-full mt-2"
            variant="outline"
            isLoading={isLoading}
          >
            Update
          </Button>
        </form>
      </Form>
    </>
  );
}
