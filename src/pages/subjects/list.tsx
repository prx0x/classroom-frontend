import { ListView } from '@/components/refine-ui/views/list-view'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import React, { useMemo, useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateButton } from '@/components/refine-ui/buttons/create'
import { EditButton } from '@/components/refine-ui/buttons/edit'
import { ShowButton } from '@/components/refine-ui/buttons/show'
import { DeleteButton } from '@/components/refine-ui/buttons/delete'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { useTable } from '@refinedev/react-table'
import { Subject } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'

type Department = {
  id: number;
  code: string;
  name: string;
};

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const SubjectList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setselectedDepartment] = useState('all');
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/departments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch departments");
        return res.json();
      })
      .then((data) => setDepartments(data.departments || data.data || []))
      .catch(console.error);
  }, []);

  const departmentFilters = selectedDepartment === 'all' ? [] : [
    { field: 'department', operator: 'eq' as const, value: selectedDepartment }
  ];
  const searchFilters = searchQuery ? [
    { field: 'name', operator: 'contains' as const, value: searchQuery }
  ] : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(() => [
      {
        id: 'code',
        accessorKey: 'code',
        size: 110,
        header: () => <p className="column-title ml-2">Code</p>,
        cell: ({ getValue }) => <Badge variant="outline" className="font-mono font-bold">{getValue<string>()}</Badge>
      },
      {
        id: 'name',
        accessorKey: 'name',
        size: 220,
        header: () => <p className="column-title">Name</p>,
        cell: ({ getValue }) => <span className='text-foreground font-medium'>{getValue<string>()}</span>,
        filterFn: 'includesString',
      },
      {
        id: 'department',
        accessorKey: 'department.name',
        size: 160,
        header: () => <p className="column-title">Department</p>,
        cell: ({ getValue }) => <Badge variant="secondary">{getValue<string>() || '—'}</Badge>,
        filterFn: 'includesString',
      },
      {
        id: 'description',
        accessorKey: 'description',
        size: 280,
        header: () => <p className="column-title">Description</p>,
        cell: ({ getValue }) => <span className="truncate line-clamp-2 text-muted-foreground">{getValue<string>() || '—'}</span>
      },
      {
        id: 'actions',
        header: () => <p className="column-title">Actions</p>,
        size: 150,
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <ShowButton resource="subjects" recordItemId={row.original.id} size="sm" variant="ghost" />
            <EditButton resource="subjects" recordItemId={row.original.id} size="sm" variant="ghost" />
            <DeleteButton resource="subjects" recordItemId={row.original.id} size="sm" variant="ghost" />
          </div>
        )
      }
    ], []),
    refineCoreProps: {
      resource: 'subjects',
      pagination: { pageSize: 10, mode: 'server' },
      filters: {
        permanent: [...departmentFilters, ...searchFilters]
      },
      sorters: {
        initial: [
          { field: 'id', order: 'desc' }
        ]
      },
    }
  });

  return (
    <ListView>
      <Breadcrumb />

      <h1 className="page-title text-2xl font-bold tracking-tight">Subjects</h1>

      <div className="intro-row flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">Manage academic subjects, syllabus codes, and department curriculum mappings.</p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or code..."
              className="pl-9 h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className='flex gap-2 w-full sm:w-auto'>
            <Select
              value={selectedDepartment}
              onValueChange={setselectedDepartment}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Department" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Departments
                </SelectItem>
                {departments.map((department) => (
                  <SelectItem
                    key={department.id}
                    value={department.name}
                  >
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <CreateButton resource="subjects" />
          </div>
        </div>
      </div>

      <DataTable table={subjectTable} />
    </ListView>
  );
}

export default SubjectList;
