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
import useCrudForm from "@/hooks/use-crud-form";

const createProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required",
  }),
});

type Project = {
  id: number;
  name: string;
};

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

  async function onSubmit(formData: z.infer<typeof createProjectSchema>) {
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
                  <Input disabled={isLoading} {...field} />
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
            Create
          </Button>
        </form>
      </Form>
    </>
  );
}
