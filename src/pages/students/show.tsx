import React from "react";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShow, useUpdate } from "@refinedev/core";
import { User, EnrolledClass } from "@/types";
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

const StudentShow: React.FC = () => {
  const { query } = useShow<User>({
    resource: "students",
  });

  const { mutate: updateUser, mutation } = useUpdate();
  const isUpdatingStatus = mutation.isPending;

  const { data, isLoading, isError } = query;
  const student = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !student) {
    return (
      <div className="p-6 text-center text-destructive">
        Failed to load student profile details.
      </div>
    );
  }

  const deptName =
    typeof student.department === "object" && student.department !== null
      ? (student.department as { name?: string }).name
      : typeof student.department === "string"
      ? student.department
      : "—";

  const deptCode =
    typeof student.department === "object" && student.department !== null
      ? (student.department as { code?: string }).code
      : undefined;

  const isActive = student.status !== "inactive";
  const initials = student.name
    ? student.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "S";

  const toggleStatus = () => {
    updateUser({
      resource: "students",
      id: student.id,
      values: {
        status: isActive ? "inactive" : "active",
      },
    });
  };

  const enrolledClasses = (student.enrolledClasses || []) as EnrolledClass[];

  return (
    <ShowView>
      <ShowViewHeader resource="students" title={student.name} />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border shadow-sm">
                {student.image && <AvatarImage src={student.image} alt={student.name} />}
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CardTitle className="text-2xl font-bold">{student.name}</CardTitle>
                  <Badge
                    variant={isActive ? "default" : "secondary"}
                    className={isActive ? "bg-emerald-600 text-white" : "bg-muted text-muted-foreground"}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-1.5 text-sm">
                  <Mail className="h-3.5 w-3.5" /> {student.email}
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
              <EditButton resource="students" recordItemId={student.id} />
              <DeleteButton
                resource="students"
                recordItemId={student.id}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Building2 className="h-4 w-4" />
                  Academic Department / Branch
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium">{deptName}</p>
                  {deptCode && <Badge variant="secondary">{deptCode}</Badge>}
                </div>
              </div>

              {student.createdAt && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="h-4 w-4" />
                    Enrolled Since
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(student.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Enrolled Classes Section */}
            <div className="space-y-3 pt-6 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <h3 className="text-base font-semibold">Enrolled Course Classes</h3>
                </div>
                <Badge variant="outline">{enrolledClasses.length} class(es)</Badge>
              </div>

              {enrolledClasses.length === 0 ? (
                <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">
                  The student is not currently enrolled in any active classes.
                </div>
              ) : (
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Class Name</TableHead>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Enrollment Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {enrolledClasses.map((cls) => (
                        <TableRow key={cls.id || cls.enrollmentId}>
                          <TableCell className="font-medium">{cls.name}</TableCell>
                          <TableCell className="font-mono text-xs">
                            {cls.courseCode || "—"}
                          </TableCell>
                          <TableCell>{cls.subject?.name || "—"}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {cls.enrollmentStatus || "enrolled"}
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

export default StudentShow;
