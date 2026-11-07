import React, { useEffect, useState } from "react";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { studentSchema } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { useBack } from "@refinedev/core";
import { Department } from "@/types";
import UploadWidget from "@/components/upload-widget";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const StudentEdit: React.FC = () => {
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
    resolver: zodResolver(studentSchema),
    refineCoreProps: {
      resource: "students",
      action: "edit",
      redirect: "list",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
    watch,
    refineCore: { onFinish, query },
  } = form;

  const isLoadingRecord = query?.isLoading;
  const currentImage = watch("image");
  const currentPublicId = watch("imageCldPubId");

  const onSubmit = (values: any) => {
    const payload: Record<string, unknown> = {
      name: String(values.name || "").trim(),
      email: String(values.email || "").trim().toLowerCase(),
      departmentId: Number(values.departmentId),
      status: values.status,
      image: values.image || null,
      imageCldPubId: values.imageCldPubId || null,
    };

    onFinish(payload as any);
  };

  return (
    <EditView>
      <EditViewHeader resource="students" title="Edit Student Record" />

      <Card className="max-w-2xl mx-auto w-full shadow-sm">
        <CardHeader>
          <CardTitle>Edit Student Information</CardTitle>
          <CardDescription>
            Update student profile, academic branch, or portal status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingRecord ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Priya Sharma" {...field} value={field.value ?? ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Student Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="student@iiitkota.ac.in"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="departmentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Academic Department / Branch *</FormLabel>
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
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Status</FormLabel>
                      <Select value={field.value ?? "active"} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active (Enrolled)</SelectItem>
                          <SelectItem value="inactive">Inactive (Suspended)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Toggle student account status.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Student Photograph</FormLabel>
                  <UploadWidget
                    value={
                      currentImage && currentPublicId
                        ? { url: currentImage, publicId: currentPublicId }
                        : null
                    }
                    onChange={(val) => {
                      setValue("image", val?.url ?? "", { shouldValidate: true });
                      setValue("imageCldPubId", val?.publicId ?? "", { shouldValidate: true });
                    }}
                  />
                </div>

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
                    Save Changes
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </EditView>
  );
};

export default StudentEdit;
