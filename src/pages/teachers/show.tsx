import React from "react";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShow, useUpdate } from "@refinedev/core";
import { User, AssignedClass } from "@/types";
import { Loader2, Mail, Building2, Calendar, BookOpen, UserCheck, UserX } from "lucide-react";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TeacherShow: React.FC = () => {
  const { query } = useShow<User>({
    resource: "teachers",
  });

  const { mutate: updateUser, mutation } = useUpdate();
  const isUpdatingStatus = mutation.isPending;

  const { data, isLoading, isError } = query;
  const teacher = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !teacher) {
    return (
      <div className="p-6 text-center text-destructive">
        Failed to load teacher profile details.
      </div>
    );
  }

  const deptName =
    typeof teacher.department === "object" && teacher.department !== null
      ? (teacher.department as { name?: string }).name
      : typeof teacher.department === "string"
      ? teacher.department
      : "—";

  const deptCode =
    typeof teacher.department === "object" && teacher.department !== null
      ? (teacher.department as { code?: string }).code
      : undefined;

  const isActive = teacher.status !== "inactive";
  const initials = teacher.name
    ? teacher.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "T";

  const toggleStatus = () => {
    updateUser({
      resource: "teachers",
      id: teacher.id,
      values: {
        status: isActive ? "inactive" : "active",
      },
    });
  };

  const assignedClasses = (teacher.assignedClasses || []) as AssignedClass[];

  return (
    <ShowView>
      <ShowViewHeader resource="teachers" title={teacher.name} />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border shadow-sm">
                {teacher.image && <AvatarImage src={teacher.image} alt={teacher.name} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-2xl font-bold">{teacher.name}</CardTitle>
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={isActive ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1.5 text-sm">
                  <Mail className="h-3.5 w-3.5" /> {teacher.email}
                </CardDescription>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleStatus}
                disabled={isUpdatingStatus}
              >
                {isActive ? (
                  <>
                    <UserX className="mr-1.5 h-4 w-4 text-amber-600" /> Deactivate
                  </>
                ) : (
                  <>
                    <UserCheck className="mr-1.5 h-4 w-4 text-emerald-600" /> Activate
                  </>
                )}
              </Button>
              <EditButton resource="teachers" recordItemId={teacher.id} />
              <DeleteButton
                resource="teachers"
                recordItemId={teacher.id}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Building2 className="h-4 w-4" />
                  Department Appointment
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium">{deptName}</p>
                  {deptCode && <Badge variant="secondary">{deptCode}</Badge>}
                </div>
              </div>

              {teacher.createdAt && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="h-4 w-4" />
                    Member Since
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(teacher.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Assigned Classes Section */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h3 className="text-base font-semibold">Assigned Academic Classes</h3>
                </div>
                <Badge variant="outline">{assignedClasses.length} class(es)</Badge>
              </div>

              {assignedClasses.length === 0 ? (
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  No classes are currently assigned to this faculty member.
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Name</TableHead>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Capacity</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {assignedClasses.map((cls) => (
                        <TableRow key={cls.id}>
                          <TableCell className="font-medium">{cls.name}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {cls.courseCode || "—"}
                          </TableCell>
                          <TableCell>{cls.subject?.name || "—"}</TableCell>
                          <TableCell>{cls.capacity || 30}</TableCell>
                          <TableCell>
                            <Badge
                              variant={cls.status === "active" ? "default" : "secondary"}
                              className={
                                cls.status === "active"
                                  ? "bg-emerald-600 text-white"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {cls.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};

export default TeacherShow;
