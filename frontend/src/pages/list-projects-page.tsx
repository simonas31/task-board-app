import { DataTable } from "@/components/ui/data-table";
import { api } from "@/lib/axios";
import useSWR from "swr";

type Project = {
  id: number;
  name: string;
};

const fetcher = (url: string) =>
  api.get<Project[]>(url).then((res) => res.data);

export default function ListProjectsPage() {
  const { data, isLoading } = useSWR<Project[]>("/projects", fetcher);

  return (
    <div className="container mx-auto">
      <DataTable columns={[]} data={data || []} isLoading={isLoading} />
    </div>
  );
}
