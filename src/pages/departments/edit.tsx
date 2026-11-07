import React from "react";
import { EditView, EditViewHeader } from "@/components/refine-ui/views/edit-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { departmentSchema } from "@/lib/schema";
import { Loader2 } from "lucide-react";
import { useBack } from "@refinedev/core";

const DepartmentEdit: React.FC = () => {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(departmentSchema),
    refineCoreProps: {
      resource: "departments",
      action: "edit",
      redirect: "list",
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    control,
    refineCore: { onFinish, query },
  } = form;

  const isLoadingRecord = query?.isLoading;

  const onSubmit = (values: any) => {
    onFinish({
      ...values,
      code: String(values.code || "").trim().toUpperCase(),
    });
  };

  return (
    <EditView>
      <EditViewHeader resource="departments" title="Edit Department" />

      <Card className="max-w-2xl mx-auto w-full shadow-sm">
        <CardHeader>
          <CardTitle>Edit Department Information</CardTitle>
          <CardDescription>
            Update institutional code, department title, or descriptive summary.
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
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department Code *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. CSE, ECE"
                          className="uppercase font-mono"
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                        />
                      </FormControl>
                      <FormDescription>
                        Unique institutional abbreviation.
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
                      <FormLabel>Department Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Computer Science & Engineering"
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Official academic department name.
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
                          placeholder="Key academic domains and research centers..."
                          rows={4}
                          {...field}
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormDescription>
                        Optional description and details.
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

export default DepartmentEdit;
