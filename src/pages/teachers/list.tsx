import React, { useMemo, useState, useEffect } from "react";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Search, UserCheck, UserX } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { User, Department } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUpdate } from "@refinedev/core";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const TeacherList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [departments, setDepartments] = useState<Department[]>([]);

  const { mutate: updateUser } = useUpdate();

  useEffect(() => {
    fetch(`${API_URL}/departments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch departments");
        return res.json();
      })
      .then((payload) => setDepartments(payload.departments || payload.data || []))
      .catch(console.error);
  }, []);

  const departmentFilters =
    selectedDepartment === "all"
      ? []
      : [{ field: "departmentId", operator: "eq" as const, value: selectedDepartment }];

  const statusFilters =
    selectedStatus === "all"
      ? []
      : [{ field: "status", operator: "eq" as const, value: selectedStatus }];

  const searchFilters = searchQuery
    ? [{ field: "search", operator: "contains" as const, value: searchQuery }]
    : [];

  const handleToggleStatus = (record: User) => {
    const nextStatus = record.status === "inactive" ? "active" : "inactive";
    updateUser({
      resource: "teachers",
      id: record.id,
      values: {
        status: nextStatus,
      },
    });
  };

  const teacherTable = useTable<User>({
    columns: useMemo<ColumnDef<User>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          size: 240,
          header: () => <p className="column-title ml-2">Faculty Member</p>,
          cell: ({ row }) => {
            const user = row.original;
            const initials = user.name
              ? user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "T";

            return (
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  {user.image && <AvatarImage src={user.image} alt={user.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm leading-tight">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
            );
          },
        },
        {
          id: "department",
          accessorKey: "department.name",
          size: 180,
          header: () => <p className="column-title">Department</p>,
          cell: ({ row }) => {
            const dept = row.original.department;
            const deptName =
              typeof dept === "object" && dept !== null
                ? (dept as { name?: string }).name
                : typeof dept === "string"
                ? dept
                : "—";
            return <Badge variant="secondary">{deptName || "—"}</Badge>;
          },
        },
        {
          id: "status",
          accessorKey: "status",
          size: 140,
          header: () => <p className="column-title">Account Status</p>,
          cell: ({ row }) => {
            const isActive = row.original.status !== "inactive";
            return (
              <div className="flex items-center gap-2">
                <Badge
                  variant={isActive ? "default" : "secondary"}
                  className={isActive ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}
                >
                  {isActive ? "Active" : "Inactive"}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  title={isActive ? "Deactivate account" : "Activate account"}
                  onClick={() => handleToggleStatus(row.original)}
                >
                  {isActive ? <UserX className="h-3.5 w-3.5 text-amber-600" /> : <UserCheck className="h-3.5 w-3.5 text-emerald-600" />}
                </Button>
              </div>
            );
          },
        },
        {
          id: "actions",
          header: () => <p className="column-title">Actions</p>,
          size: 150,
          cell: ({ row }) => (
            <div className="flex items-center gap-1">
              <ShowButton resource="teachers" recordItemId={row.original.id} size="sm" variant="ghost" />
              <EditButton resource="teachers" recordItemId={row.original.id} size="sm" variant="ghost" />
              <DeleteButton resource="teachers" recordItemId={row.original.id} size="sm" variant="ghost" />
            </div>
          ),
        },
      ],
      []
    ),
    refineCoreProps: {
      resource: "teachers",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...departmentFilters, ...statusFilters, ...searchFilters],
      },
      sorters: {
        initial: [{ field: "createdAt", order: "desc" }],
      },
    },
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title text-2xl font-bold tracking-tight">Faculty & Teachers</h1>

      <div className="intro-row flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Institutional faculty roster, department appointments, and account provisioning.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search faculty by name or email..."
              className="pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={String(dept.id)}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            <CreateButton resource="teachers" />
          </div>
        </div>
      </div>

      <DataTable table={teacherTable} />
    </ListView>
  );
};

export default TeacherList;
