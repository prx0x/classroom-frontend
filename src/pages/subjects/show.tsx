import React from "react";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShow } from "@refinedev/core";
import { Subject } from "@/types";
import { Loader2, BookOpen, Building2, Calendar, FileText } from "lucide-react";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";

const SubjectShow: React.FC = () => {
  const { query } = useShow<Subject>({
    resource: "subjects",
  });

  const { data, isLoading, isError } = query;
  const subject = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !subject) {
    return (
      <div className="p-6 text-center text-destructive">
        Failed to load subject details.
      </div>
    );
  }

  const deptName =
    typeof subject.department === "object" && subject.department !== null
      ? (subject.department as { name?: string }).name
      : typeof subject.department === "string"
      ? subject.department
      : "—";

  const deptCode =
    typeof subject.department === "object" && subject.department !== null
      ? (subject.department as { code?: string }).code
      : undefined;

  return (
    <ShowView>
      <ShowViewHeader resource="subjects" title={subject.name} />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between pb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="font-mono text-base px-3 py-1 font-bold">
                  {subject.code}
                </Badge>
                <CardTitle className="text-2xl font-bold">{subject.name}</CardTitle>
              </div>
              <CardDescription>Academic Subject Master Record</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <EditButton resource="subjects" recordItemId={subject.id} />
              <DeleteButton
                resource="subjects"
                recordItemId={subject.id}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <BookOpen className="h-4 w-4" />
                  Subject Code
                </div>
                <p className="text-base font-medium font-mono">{subject.code}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <FileText className="h-4 w-4" />
                  Subject Name
                </div>
                <p className="text-base font-medium">{subject.name}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Building2 className="h-4 w-4" />
                  Administering Department
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium">{deptName}</p>
                  {deptCode && <Badge variant="secondary">{deptCode}</Badge>}
                </div>
              </div>

              {subject.createdAt && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="h-4 w-4" />
                    Curriculum Added
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(subject.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2 pt-4 border-t">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Syllabus & Course Scope Description
              </h3>
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {subject.description || "No description provided for this subject course."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};

export default SubjectShow;
