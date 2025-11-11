import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DataTable,
  type DataTableResponseData,
} from "@/components/ui/data-table";
import { api } from "@/lib/axios";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash } from "lucide-react";
import * as React from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import useSWR from "swr";

type Project = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

const fetcher = (url: string) => api.get(url).then((res) => res.data.projects);

export default function ListProjectsPage() {
  const { data: swrData, isLoading } = useSWR<DataTableResponseData<Project>>(
    "/projects",
    fetcher
  );

  const [data, setData] = React.useState(() => swrData?.data || []);

  React.useEffect(() => {
    if (!isLoading) {
      setData(swrData?.data || []);
    }
  }, [isLoading, swrData]);

  const columns = React.useMemo<ColumnDef<Project>[]>(() => {
    return [
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
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
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
      {
        id: "actions",
        header: "Actions",
        size: 120,
        cell: ({ row }) => {
          const rowId = row.getValue("select");
          return (
            <div className="flex items-center space-x-2">
              <Link to={`/projects/${rowId}/edit`}>
                <Button size="sm">
                  <Edit />
                </Button>
              </Link>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  api.delete(`/projects/${rowId}`).then(() => {
                    toast.success("Project was deleted successfully!");
                    const dataCopy = [...data];
                    dataCopy.splice(row.index, 1);
                    setData(dataCopy);
                  });
                }}
              >
                <Trash />
              </Button>
            </div>
          );
        },
      },
    ];
  }, [data]);

  return (
    <div className="container mx-auto">
      <div className="flex justify-end mb-2">
        <Link to="/projects/create">
          <Button size="sm">
            Create project <Plus />
          </Button>
        </Link>
      </div>
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
}
