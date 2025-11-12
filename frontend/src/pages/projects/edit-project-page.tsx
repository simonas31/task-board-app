import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useParams } from "react-router";
import useCrudForm from "@/hooks/use-crud-form";

const updateProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required",
  }),
});

type Project = {
  id: number;
  name: string;
};

export default function EditProjectPage() {
  const { projectId } = useParams();
  const { form, isLoading, submitForm } = useCrudForm<
    Project,
    typeof updateProjectSchema
  >({
    mode: "Update",
    schema: updateProjectSchema,
    mutateUrl: `/projects/${projectId}`,
    fetchModelUrl: `/projects/${projectId}`,
  });

  async function onSubmit(formData: z.infer<typeof updateProjectSchema>) {
    await submitForm(formData);
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project name</FormLabel>
                <FormControl>
                  <Input {...field} disabled={isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-2"
            variant="outline"
            disabled={isLoading}
          >
            Update
          </Button>
        </form>
      </Form>
    </>
  );
}
