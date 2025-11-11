import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTable,
  type DataTableResponseData,
} from "@/components/ui/data-table";
import { api } from "@/lib/axios";
import type { ColumnDef } from "@tanstack/react-table";
import useSWR from "swr";

type Project = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const fetcher = (url: string) => api.get(url).then((res) => res.data.projects);

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    id: "select",
    size: 30,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    enableResizing: false,
  },
  {
    accessorKey: "name",
    header: "Project Name",
  },
];

export default function ListProjectsPage() {
  const { data, isLoading } = useSWR<DataTableResponseData<Project>>(
    "/projects",
    fetcher
  );

  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
}
