import React from "react";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useShow } from "@refinedev/core";
import { Department } from "@/types";
import { Loader2, Building2, Calendar, FileText } from "lucide-react";
import { DeleteButton } from "@/components/refine-ui/buttons/delete";
import { EditButton } from "@/components/refine-ui/buttons/edit";

const DepartmentShow: React.FC = () => {
  const { query } = useShow<Department>({
    resource: "departments",
  });

  const { data, isLoading, isError } = query;
  const department = data?.data;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isError || !department) {
    return (
      <div className="p-6 text-center text-destructive">
        Failed to load department details.
      </div>
    );
  }

  return (
    <ShowView>
      <ShowViewHeader resource="departments" title={department.name} />

      <div className="max-w-4xl mx-auto w-full space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between pb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="font-mono text-base px-3 py-1 font-bold">
                  {department.code}
                </Badge>
                <CardTitle className="text-2xl font-bold">{department.name}</CardTitle>
              </div>
              <CardDescription>Academic Department Master Record</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <EditButton resource="departments" recordItemId={department.id} />
              <DeleteButton
                resource="departments"
                recordItemId={department.id}
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <Building2 className="h-4 w-4" />
                  Department Code
                </div>
                <p className="text-base font-medium">{department.code}</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <FileText className="h-4 w-4" />
                  Full Department Title
                </div>
                <p className="text-base font-medium">{department.name}</p>
              </div>

              {department.createdAt && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    <Calendar className="h-4 w-4" />
                    Record Established
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {new Date(department.createdAt).toLocaleDateString(undefined, {
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
                Academic Scope & Facilities Description
              </h3>
              <p className="text-sm leading-relaxed text-foreground whitespace-pre-wrap">
                {department.description || "No descriptive information has been registered for this department."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ShowView>
  );
};

export default DepartmentShow;
