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
import { teacherSchema } from "@/lib/schema";
import { Loader2, ShieldCheck, Info } from "lucide-react";
import { useBack } from "@refinedev/core";
import { Department } from "@/types";
import UploadWidget from "@/components/upload-widget";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const TeacherCreate: React.FC = () => {
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
    resolver: zodResolver(teacherSchema),
    refineCoreProps: {
      resource: "teachers",
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
      <CreateViewHeader resource="teachers" title="Provision Teacher Account" />

      <div className="max-w-2xl mx-auto w-full space-y-4">
        <div className="bg-muted/50 border rounded-lg p-4 flex items-start gap-3 text-xs text-muted-foreground">
          <Info className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-foreground">
              Administrator-Controlled Identity Provisioning
            </p>
            <p>
              Faculty identities are securely provisioned under the institutional domain.
              If no custom password is supplied, a cryptographically secure initial password will be assigned.
              Transactional invitation emails can be hooked to institutional SMTP in production without leaking credentials in logs.
            </p>
          </div>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Faculty Profile Details</CardTitle>
            <CardDescription>
              Set up credentials and department affiliation for the faculty member.
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
                        <Input placeholder="e.g. Dr. Rajesh Sharma" {...field} />
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
                      <FormLabel>Institutional Email *</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="faculty@iiitkota.ac.in"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Primary identity login email.
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
                      <FormLabel>Department Appointment *</FormLabel>
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
                          <SelectItem value="active">Active (Access Enabled)</SelectItem>
                          <SelectItem value="inactive">Inactive (Deactivated)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Inactive accounts cannot log in to the portal.
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
                        Minimum 8 characters. If omitted, a temporary 16-character secret is provisioned.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Profile Photo</FormLabel>
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
                    Upload avatar or faculty photo (JPG, PNG, WebP up to 5MB).
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
                    Provision Faculty Account
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

export default TeacherCreate;
