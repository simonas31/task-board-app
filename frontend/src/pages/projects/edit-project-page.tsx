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
import { useParams } from "react-router";
import useSWR from "swr";

const updateProjectSchema = z.object({
  name: z.string().min(1, {
    message: "Project name is required",
  }),
});

const fetcher = (url: string, body?: z.infer<typeof updateProjectSchema>) => {
  return api.put(url, body);
};

const projectFetcher = (url: string) =>
  api.get(url).then((res) => res.data.project);

type Project = {
  id: number;
  name: string;
};

export default function EditProjectPage() {
  const { projectId } = useParams();
  const { data: project, isLoading: isLoadingProject } = useSWR<Project>(
    `/projects/${projectId}`,
    projectFetcher
  );

  const form = useForm<z.infer<typeof updateProjectSchema>>({
    resolver: zodResolver(updateProjectSchema),
    values: project,
  });
  const { data, isLoading, error, execute } = useApi<
    Project,
    z.infer<typeof updateProjectSchema>
  >(`/projects/${projectId}`, fetcher);

  async function onSubmit(formData: z.infer<typeof updateProjectSchema>) {
    await execute(formData);
  }

  React.useEffect(() => {
    if (data) {
      toast.success("Project updated successfully");
    } else if (error) {
      toast.error("Failed to update project. Try again");
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
                  <Input {...field} disabled={isLoadingProject || isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full mt-2"
            variant="outline"
            disabled={isLoadingProject || isLoading}
          >
            Update
          </Button>
        </form>
      </Form>
    </>
  );
}
