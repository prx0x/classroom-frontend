import React, { useEffect, useState } from "react";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
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
import { Loader2, ShieldCheck, Info } from "lucide-react";
import { useBack } from "@refinedev/core";
import { Department } from "@/types";
import UploadWidget from "@/components/upload-widget";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const StudentCreate: React.FC = () => {
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
      action: "create",
      redirect: "list",
    },
    defaultValues: {
      name: "",
      email: "",
      departmentId: undefined,
      status: "active",
      password: "",
      image: "",
      imageCldPubId: "",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    setValue,
    watch,
    refineCore: { onFinish },
  } = form;

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

    if (values.password && String(values.password).trim().length >= 8) {
      payload.password = String(values.password).trim();
    }

    onFinish(payload as any);
  };

  return (
    <CreateView>
      <CreateViewHeader resource="students" title="Register Student Account" />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <div className="bg-muted/50 border rounded-lg p-4 flex items-start gap-3 text-xs text-muted-foreground">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-foreground">
              Institutional Student Registration
            </p>
            <p>
              Students are registered under official institute credentials.
              If an initial password is not specified, a secure random key is auto-generated.
              Credentials remain secured in the database hash without plaintext exposure in system logs.
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Student Profile Details</CardTitle>
            <CardDescription>
              Register academic information and department allocation for the student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Priya Sharma" {...field} />
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
                        />
                      </FormControl>
                      <FormDescription>
                        Unique institutional student login email.
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
                      <FormLabel>Academic Branch / Department *</FormLabel>
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
                      <Select value={field.value} onValueChange={field.onChange}>
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
                        Determines whether student portal access is enabled.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Password (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Leave blank to auto-generate secure password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Minimum 8 characters. Leave empty for safe random password provisioning.
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
                  <FormDescription>
                    Student ID card photo or avatar.
                  </FormDescription>
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
                    {isSubmitting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <ShieldCheck className="mr-2 h-4 w-4" />
                    )}
                    Register Student
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </CreateView>
  );
};

export default StudentCreate;
