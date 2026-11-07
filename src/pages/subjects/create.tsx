import React, { useEffect, useState } from "react";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "@refinedev/react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { subjectSchema } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { useBack } from "@refinedev/core";
import { Department } from "@/types";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const SubjectCreate: React.FC = () => {
  const back = useBack();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/departments`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch departments");
        return res.json();
      })
      .then((payload) => {
        setDepartments(payload.departments || payload.data || []);
      })
      .catch(console.error)
      .finally(() => setLoadingDepartments(false));
  }, []);

  const form = useForm({
    resolver: zodResolver(subjectSchema),
    refineCoreProps: {
      resource: "subjects",
      action: "create",
      redirect: "list",
    },
    defaultValues: {
      name: "",
      code: "",
      departmentId: undefined,
      description: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    refineCore: { onFinish },
  } = form;

  const onSubmit = (values: any) => {
    onFinish({
      ...values,
      code: String(values.code || "").trim().toUpperCase(),
      departmentId: Number(values.departmentId),
    });
  };

  return (
    <CreateView>
      <CreateViewHeader resource="subjects" title="Create Subject" />

      <Card className="max-w-2xl mx-auto w-full shadow-sm">
        <CardHeader>
          <CardTitle>Subject Course Information</CardTitle>
          <CardDescription>
            Register a new curriculum subject associated with an academic department.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Code *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. CS201, EC301, ME101"
                        className="uppercase font-mono"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormDescription>
                      Unique course code identified in the academic syllabus.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Data Structures & Algorithms"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Full title of the academic subject.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Offering Department *</FormLabel>
                    <Select
                      disabled={loadingDepartments}
                      value={field.value ? String(field.value) : ""}
                      onValueChange={(val) => field.onChange(parseInt(val, 10))}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={loadingDepartments ? "Loading departments..." : "Select Department"} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={String(dept.id)}>
                            {dept.name} ({dept.code})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      The institutional department administering this curriculum.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Course overview, prerequisites, or topics covered..."
                        rows={4}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Course summary and educational objectives.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={back}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Subject
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </CreateView>
  );
};

export default SubjectCreate;
