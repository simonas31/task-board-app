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
import useApi from "@/hooks/use-api";
import { api } from "@/lib/axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import * as React from "react";

const createProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Password is required",
  }),
});

const fetcher = (url: string, body?: z.infer<typeof createProjectSchema>) => {
  return api.post(url, body);
};

type Project = {
  id: number;
  name: string;
};

export default function CreateProjectPage() {
  const form = useForm<z.infer<typeof createProjectSchema>>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
    },
  });
  const { formState } = form;
  const { data, isLoading, error, execute } = useApi<
    Project,
    z.infer<typeof createProjectSchema>
  >("/projects", fetcher);

  async function onSubmit(formData: z.infer<typeof createProjectSchema>) {
    await execute(formData);
  }

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      form.reset();
    }
  }, [formState, form]);

  React.useEffect(() => {
    if (data) {
      toast.success("Project created successfully");
      form.reset();
    } else if (error) {
      toast.error("Failed to create project. Try again");
    }
  }, [form, data, error]);

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
