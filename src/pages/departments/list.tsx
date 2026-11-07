import React, { useMemo, useState } from "react";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Search } from "lucide-react";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { Department } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

const DepartmentList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchFilters = searchQuery
    ? [
        {
          field: "search",
          operator: "contains" as const,
          value: searchQuery,
        },
      ]
    : [];

  const departmentTable = useTable<Department>({
    columns: useMemo<ColumnDef<Department>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          size: 120,
          header: () => <p className="column-title ml-2">Code</p>,
          cell: ({ getValue }) => (
            <Badge variant="outline" className="font-mono font-bold">
              {getValue<string>()}
            </Badge>
          ),
        },
        {
          id: "name",
          accessorKey: "name",
          size: 240,
          header: () => <p className="column-title">Department Name</p>,
          cell: ({ getValue }) => (
            <span className="font-medium text-foreground">{getValue<string>()}</span>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 320,
          header: () => <p className="column-title">Description</p>,
          cell: ({ getValue }) => (
            <span className="text-muted-foreground truncate line-clamp-2">
              {getValue<string>() || "—"}
            </span>
          ),
        },
        {
          id: "actions",
          header: () => <p className="column-title">Actions</p>,
          size: 160,
          cell: ({ row }) => (
            <div className="flex items-center gap-1">
              <ShowButton
                resource="departments"
                recordItemId={row.original.id}
                size="sm"
                variant="ghost"
              />
              <EditButton
                resource="departments"
                recordItemId={row.original.id}
                size="sm"
                variant="ghost"
              />
              <DeleteButton
                resource="departments"
                recordItemId={row.original.id}
                size="sm"
                variant="ghost"
              />
            </div>
          ),
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: "departments",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: searchFilters,
      },
      sorters: {
        initial: [{ field: "name", order: "asc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title text-2xl font-bold tracking-tight">Departments</h1>

      <div className="intro-row flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Institutional departments, academic divisions, and master catalog data.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by code or name..."
              className="pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <CreateButton resource="departments" />
        </div>
      </div>

      <DataTable table={departmentTable} />
    </ListView>
  );
};

export default DepartmentList;
