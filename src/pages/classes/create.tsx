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
import { classSchema } from "@/lib/schema";
import { Loader2, Plus, Trash2, Calendar, Clock, MapPin } from "lucide-react";
import { Subject, User, Schedule } from "@/types";
import UploadWidget from "@/components/upload-widget";
import { Separator } from "@/components/ui/separator";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const ClassesCreate: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [teachers, setTeachers] = useState<User[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [schedules, setSchedules] = useState<Schedule[]>([
    { day: "Monday", startTime: "09:00", endTime: "10:30", room: "" },
  ]);

  useEffect(() => {
    Promise.all([
      fetch(`${API_URL}/subjects`).then((r) => (r.ok ? r.json() : { subjects: [] })),
      fetch(`${API_URL}/teachers`).then((r) => (r.ok ? r.json() : { teachers: [] })),
    ])
      .then(([subjsData, teachersData]) => {
        setSubjects(subjsData.subjects || subjsData.data || []);
        setTeachers(teachersData.teachers || teachersData.data || []);
      })
      .catch(console.error)
      .finally(() => setLoadingOptions(false));
  }, []);

  const form = useForm({
    resolver: zodResolver(classSchema),
    refineCoreProps: {
      resource: "classes",
      action: "create",
      redirect: "list",
    },
    defaultValues: {
      name: "",
      description: "",
      courseCode: "",
      subjectId: undefined,
      teacherId: "",
      capacity: 30,
      status: "active",
      bannerUrl: "",
      bannerCldPubId: "",
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

  const currentBannerUrl = watch("bannerUrl");
  const currentBannerPubId = watch("bannerCldPubId");

  const addScheduleSlot = () => {
    setSchedules((prev) => [
      ...prev,
      { day: "Wednesday", startTime: "11:00", endTime: "12:30", room: "" },
    ]);
  };

  const removeScheduleSlot = (index: number) => {
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  const updateScheduleSlot = (index: number, field: keyof Schedule, value: string) => {
    setSchedules((prev) =>
      prev.map((slot, i) => (i === index ? { ...slot, [field]: value } : slot))
    );
  };

  const onSubmit = (values: any) => {
    const payload: Record<string, unknown> = {
      name: String(values.name || "").trim(),
      description: values.description ? String(values.description).trim() : null,
      courseCode: values.courseCode ? String(values.courseCode).trim() : null,
      subjectId: Number(values.subjectId),
      teacherId: values.teacherId ? String(values.teacherId) : null,
      capacity: Number(values.capacity) || 30,
      status: values.status || "active",
      bannerUrl: values.bannerUrl || null,
      bannerCldPubId: values.bannerCldPubId || null,
      schedules: schedules.map((s) => ({
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
        room: s.room?.trim() ? s.room.trim() : null,
      })),
    };

    onFinish(payload as any);
  };

  return (
    <CreateView>
      <CreateViewHeader resource="classes" title="Create Institutional Class" />

      <div className="max-w-3xl mx-auto w-full space-y-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Class Overview & Master Data</CardTitle>
            <CardDescription>
              Assign the academic subject, faculty instructor, and configure classroom parameters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
                {/* Banner Upload */}
                <div className="space-y-2">
                  <FormLabel>Class Banner Image</FormLabel>
                  <UploadWidget
                    value={
                      currentBannerUrl
                        ? {
                            url: currentBannerUrl,
                            publicId: currentBannerPubId || "",
                          }
                        : null
                    }
                    onChange={(val) => {
                      setValue("bannerUrl", val?.url || "", { shouldValidate: true });
                      setValue("bannerCldPubId", val?.publicId || "", { shouldValidate: true });
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Upload an institutional banner or cover visual for the classroom.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Class Name */}
                  <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>
                          Class Name <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. Data Structures & Algorithms - Section A"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Course Code */}
                  <FormField
                    control={control}
                    name="courseCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course / Section Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g. CS201-A (defaults to subject code)"
                            value={field.value || ""}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Subject Dropdown */}
                  <FormField
                    control={control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Subject <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={(val) => field.onChange(val ? Number(val) : undefined)}
                          value={field.value ? String(field.value) : undefined}
                          disabled={loadingOptions}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={loadingOptions ? "Loading subjects..." : "Select Subject"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subjects.map((s) => (
                              <SelectItem key={s.id} value={s.id.toString()}>
                                {s.name} ({s.code})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Teacher Dropdown */}
                  <FormField
                    control={control}
                    name="teacherId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Faculty Instructor</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value || undefined}
                          disabled={loadingOptions}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={loadingOptions ? "Loading teachers..." : "Assign Teacher (optional)"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {teachers.map((t) => (
                              <SelectItem key={t.id} value={t.id}>
                                {t.name} ({t.email})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Capacity */}
                  <FormField
                    control={control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Student Capacity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={500}
                            placeholder="30"
                            value={field.value ?? 30}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          Maximum number of students permitted to enroll.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Status */}
                  <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active (Available for enrollment)</SelectItem>
                            <SelectItem value="inactive">Inactive (Archived)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Class Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide syllabus notes, prerequisites, or classroom instructions..."
                          rows={3}
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Schedules Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                        <Calendar className="h-4 w-4 text-primary" />
                        Class Schedule & Timetable
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Define recurring weekly sessions. Conflicts with existing faculty or room bookings will be checked automatically.
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addScheduleSlot}
                      className="gap-1.5"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Session
                    </Button>
                  </div>

                  {schedules.length === 0 ? (
                    <div className="border border-dashed rounded-lg p-6 text-center text-sm text-muted-foreground">
                      No schedule slots added yet. Click &quot;Add Session&quot; to configure timetable.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {schedules.map((slot, index) => (
                        <div
                          key={index}
                          className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-muted/30 border rounded-lg"
                        >
                          {/* Day */}
                          <div className="w-full sm:w-[150px]">
                            <Select
                              value={slot.day}
                              onValueChange={(val) => updateScheduleSlot(index, "day", val)}
                            >
                              <SelectTrigger className="h-9 text-xs">
                                <SelectValue placeholder="Day" />
                              </SelectTrigger>
                              <SelectContent>
                                {DAYS.map((d) => (
                                  <SelectItem key={d} value={d}>
                                    {d}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Start Time */}
                          <div className="flex items-center gap-1.5 w-full sm:w-auto">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <Input
                              type="time"
                              value={slot.startTime}
                              onChange={(e) => updateScheduleSlot(index, "startTime", e.target.value)}
                              className="h-9 w-[110px] text-xs font-mono"
                            />
                            <span className="text-xs text-muted-foreground">to</span>
                            <Input
                              type="time"
                              value={slot.endTime}
                              onChange={(e) => updateScheduleSlot(index, "endTime", e.target.value)}
                              className="h-9 w-[110px] text-xs font-mono"
                            />
                          </div>

                          {/* Room */}
                          <div className="flex items-center gap-1.5 flex-1 w-full sm:w-auto">
                            <MapPin className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                            <Input
                              placeholder="Room / Hall (e.g. LH-101)"
                              value={slot.room || ""}
                              onChange={(e) => updateScheduleSlot(index, "room", e.target.value)}
                              className="h-9 text-xs"
                            />
                          </div>

                          {/* Remove button */}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeScheduleSlot(index)}
                            className="h-9 w-9 text-muted-foreground hover:text-destructive shrink-0"
                            title="Remove session"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[140px]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Creating...
                      </span>
                    ) : (
                      "Create Class"
                    )}
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

export default ClassesCreate;
