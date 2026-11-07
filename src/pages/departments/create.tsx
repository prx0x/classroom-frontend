import React from "react";
import { CreateView, CreateViewHeader } from "@/components/refine-ui/views/create-view";
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

const DepartmentCreate: React.FC = () => {
  const back = useBack();

  const form = useForm({
    resolver: zodResolver(departmentSchema),
    refineCoreProps: {
      resource: "departments",
      action: "create",
      redirect: "list",
    },
    defaultValues: {
      code: "",
      name: "",
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
    });
  };

  return (
    <CreateView>
      <CreateViewHeader resource="departments" title="Create Department" />

      <Card className="max-w-2xl mx-auto w-full shadow-sm">
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
          <CardDescription>
            Register a new institutional department or academic unit.
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
                    <FormLabel>Department Code *</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. CSE, ECE, ME"
                        className="uppercase font-mono"
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                      />
                    </FormControl>
                    <FormDescription>
                      Unique shorthand identifier for the department (e.g. CSE).
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
                      />
                    </FormControl>
                    <FormDescription>
                      Full institutional title of the department.
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
                        placeholder="Key focus areas, laboratory information, or research domains..."
                        rows={4}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Optional summary of academic disciplines and facilities.
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
                  Create Department
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </CreateView>
  );
};

export default DepartmentCreate;
