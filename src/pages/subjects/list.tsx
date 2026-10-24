import { ListView } from '@/components/refine-ui/views/list-view'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import React, { useMemo, useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CreateButton } from '@/components/refine-ui/buttons/create'
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
    .then((data) => setDepartments(data.departments))
    .catch(console.error);
  }, []);

  const departmentFilters = selectedDepartment === 'all' ? [] : [
    {field:'department', operator:'eq' as const, value: selectedDepartment}
  ];
  const searchFilters = searchQuery ? [
    {field:'name', operator: 'contains' as const, value: searchQuery}
   ] : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(()=>[
        {
            id: 'code', 
            accessorKey:'code',
            size:100,
            header: () => <p className="column-title ml-2">Code</p>,
            cell: ({getValue}) => <Badge>{getValue<string>()}</Badge>
        },
        {
            id:'name',
            accessorKey:'name',
            size:200,
            header: ()=> <p className="column-title">Name</p>,
            cell: ({getValue}) => <span className='text-foreground'>{getValue<string>()}</span>,
            filterFn: 'includesString',
        },
        {
            id:'department',
            accessorKey:'department.name',
            size:150,
            header: () => <p className="column-title">Department</p>,
            cell: ({getValue})=> <Badge 
            variant="secondary">{getValue<string>()}</Badge>,
            filterFn: 'includesString',
        },
        {
            id:'description',
            accessorKey:'description',
            size:300,
            header: ()=> <p className="column-title">Description</p>,
            cell: ({getValue}) => <span className="truncate line-clamp-2">{getValue<string>()}</span>
        }
    ], []),
    refineCoreProps: {
        resource: 'subjects',
        pagination: {pageSize:10, mode:'server'},
        filters:{
            permanent: [...departmentFilters, ...searchFilters]
        },
        sorters:{
            initial: [
                {field: 'id', order: 'desc'}
            ]
        },
    }
  });


  return (
    <ListView>
        <Breadcrumb/>


        <h1 className="page-title">Subjects</h1>

        <div className="intro-row">
            <p>Quick access to essential matrices and management tools.</p>
            <div className="actions-row">
                <Search className='search-icon'/>

                <input 
                    type="text" 
                    placeholder='Search by name...'
                    className='pl-10 w-full'
                    value={searchQuery}
                    onChange={(e)=>setSearchQuery(e.target.value)}
                />
            </div>

            <div className='flex gap-2 w-full sm:w-auto'>
                <Select
                    value={selectedDepartment}
                    onValueChange={setselectedDepartment}>
                        <SelectTrigger>
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
                                ))
                            }
                        </SelectContent>
                </Select>

                <CreateButton/>
            </div>
        </div>

        <DataTable table={subjectTable} />
    </ListView>
  )
}

export default SubjectList