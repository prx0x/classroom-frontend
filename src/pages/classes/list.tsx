import React, { useMemo, useState, useEffect } from "react";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Search, Copy, Check, Users, Calendar, GraduationCap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateButton } from "@/components/refine-ui/buttons/create";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { ShowButton } from "@/components/refine-ui/buttons/show";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { DataTable } from "@/components/refine-ui/data-table/data-table";
import { useTable } from "@refinedev/react-table";
import { ClassDetails, Subject, User } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const ClassesList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedTeacher, setSelectedTeacher] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/subjects`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((payload) => setSubjects(payload.subjects || payload.data || []))
      .catch(console.error);

    fetch(`${API_URL}/teachers`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((payload) => setTeachers(payload.teachers || payload.data || []))
      .catch(console.error);
  }, []);

  const handleCopyInviteCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const subjectFilters =
    selectedSubject === "all"
      ? []
      : [{ field: "subjectId", operator: "eq" as const, value: selectedSubject }];

  const teacherFilters =
    selectedTeacher === "all"
      ? []
      : [{ field: "teacherId", operator: "eq" as const, value: selectedTeacher }];

  const statusFilters =
    selectedStatus === "all"
      ? []
      : [{ field: "status", operator: "eq" as const, value: selectedStatus }];

  const searchFilters = searchQuery
    ? [{ field: "search", operator: "contains" as const, value: searchQuery }]
    : [];

  const classTable = useTable<ClassDetails>({
    refineCoreProps: {
      resource: "classes",
      filters: {
        permanent: [
          ...searchFilters,
          ...subjectFilters,
          ...teacherFilters,
          ...statusFilters,
        ],
      },
    },
    columns: useMemo<ColumnDef<ClassDetails>[]>(
      () => [
        {
          id: "name",
          accessorKey: "name",
          size: 260,
          header: () => <p className="column-title ml-2">Class Name & Code</p>,
          cell: ({ row }) => {
            const cls = row.original;
            return (
              <div className="flex items-center gap-3">
                {cls.bannerUrl ? (
                  <img
                    src={cls.bannerUrl}
                    alt={cls.name}
                    className="h-10 w-14 object-cover rounded-md border"
                  />
                ) : (
                  <div className="h-10 w-14 rounded-md bg-muted flex items-center justify-center border text-muted-foreground">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                )}
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground text-sm leading-tight">
                    {cls.name}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    {cls.courseCode && (
                      <span className="text-xs font-mono font-medium text-primary">
                        {cls.courseCode}
                      </span>
                    )}
                    {cls.schedules && cls.schedules.length > 0 && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {cls.schedules.length} session{cls.schedules.length > 1 ? "s" : ""}/wk
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          },
        },
        {
          id: "subject",
          accessorKey: "subjectId",
          size: 160,
          header: () => <p className="column-title">Subject</p>,
          cell: ({ row }) => {
            const subj = row.original.subject;
            return (
              <div className="flex flex-col">
                <span className="text-sm font-medium">
                  {subj?.name || "Unassigned"}
                </span>
                {subj?.code && (
                  <span className="text-xs text-muted-foreground font-mono">
                    {subj.code}
                  </span>
                )}
              </div>
            );
          },
        },
        {
          id: "teacher",
          accessorKey: "teacherId",
          size: 180,
          header: () => <p className="column-title">Assigned Teacher</p>,
          cell: ({ row }) => {
            const teacher = row.original.teacher;
            if (!teacher) {
              return <span className="text-xs text-muted-foreground italic">None</span>;
            }
            const initials = teacher.name
              ? teacher.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)
              : "T";

            return (
              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  {teacher.image && <AvatarImage src={teacher.image} alt={teacher.name} />}
                  <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-foreground leading-tight">
                    {teacher.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate max-w-[120px]">
                    {teacher.email}
                  </span>
                </div>
              </div>
            );
          },
        },
        {
          id: "capacity",
          accessorKey: "capacity",
          size: 120,
          header: () => <p className="column-title">Enrollment</p>,
          cell: ({ row }) => {
            const enrolled = row.original.enrolledCount ?? 0;
            const capacity = row.original.capacity;
            const isFull = enrolled >= capacity;

            return (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-xs font-semibold">
                  {enrolled} / {capacity}
                </span>
                {isFull && (
                  <Badge variant="destructive" className="text-[9px] px-1 py-0 h-4 uppercase">
                    Full
                  </Badge>
                )}
              </div>
            );
          },
        },
        {
          id: "inviteCode",
          accessorKey: "inviteCode",
          size: 140,
          header: () => <p className="column-title">Invite Code</p>,
          cell: ({ row }) => {
            const code = row.original.inviteCode;
            if (!code) return <span className="text-xs text-muted-foreground">—</span>;

            const isCopied = copiedCode === code;

            return (
              <div className="flex items-center gap-1.5">
                <code className="text-xs font-mono font-bold bg-muted px-2 py-0.5 rounded border">
                  {code}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => handleCopyInviteCode(code)}
                  title="Copy Invite Code"
                >
                  {isCopied ? (
                    <Check className="h-3 w-3 text-green-600" />
                  ) : (
                    <Copy className="h-3 w-3 text-muted-foreground" />
                  )}
                </Button>
              </div>
            );
          },
        },
        {
          id: "status",
          accessorKey: "status",
          size: 100,
          header: () => <p className="column-title">Status</p>,
          cell: ({ row }) => {
            const status = row.original.status;
            const isActive = status === "active";
            return (
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={`capitalize ${
                  isActive
                    ? "bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-200 dark:border-green-800 dark:text-green-400"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {status}
              </Badge>
            );
          },
        },
        {
          id: "actions",
          size: 150,
          header: () => <p className="column-title">Actions</p>,
          cell: ({ row }) => {
            const record = row.original;
            return (
              <div className="flex items-center gap-1">
                <ShowButton resource="classes" recordItemId={record.id} size="sm" />
                <EditButton resource="classes" recordItemId={record.id} size="sm" />
                <DeleteButton resource="classes" recordItemId={record.id} size="sm" />
              </div>
            );
          },
        },
      ],
      [copiedCode]
    ),
  });

  return (
    <ListView>
      <Breadcrumb />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2 mb-6">
        <div>
          <h1 className="page-title text-2xl font-bold tracking-tight">Classes</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Manage academic classroom sections, schedules, teachers and student capacity.
          </p>
        </div>
        <CreateButton resource="classes">Create Class</CreateButton>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by class name, course code or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="w-full sm:w-[180px]">
          <Select value={selectedSubject} onValueChange={setSelectedSubject}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="All Subjects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              {subjects.map((s) => (
                <SelectItem key={s.id} value={s.id.toString()}>
                  {s.name} ({s.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-[180px]">
          <Select value={selectedTeacher} onValueChange={setSelectedTeacher}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="All Teachers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teachers</SelectItem>
              {teachers.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-[140px]">
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-full text-sm">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DataTable table={classTable} />
    </ListView>
  );
};

export default ClassesList;
