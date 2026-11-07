import * as z from "zod";

export const departmentSchema = z.object({
  code: z
    .string()
    .trim()
    .min(2, "Department code must be at least 2 characters")
    .max(50, "Department code must be at most 50 characters"),
  name: z
    .string()
    .trim()
    .min(2, "Department name must be at least 2 characters")
    .max(255, "Department name must be at most 255 characters"),
  description: z.string().optional().nullable(),
});

export const subjectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Subject name must be at least 2 characters")
    .max(255, "Subject name must be at most 255 characters"),
  code: z
    .string()
    .trim()
    .min(2, "Subject code must be at least 2 characters")
    .max(50, "Subject code must be at most 50 characters"),
  departmentId: z.coerce
    .number({
      required_error: "Department is required",
      invalid_type_error: "Department is required",
    })
    .min(1, "Department is required"),
  description: z.string().optional().nullable(),
});

export const teacherSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  departmentId: z.coerce
    .number({
      required_error: "Department is required",
      invalid_type_error: "Department is required",
    })
    .min(1, "Department is required"),
  status: z.enum(["active", "inactive"]).default("active"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters if provided",
    }),
  image: z.string().optional().nullable(),
  imageCldPubId: z.string().optional().nullable(),
});

export const studentSchema = z.object({
  name: z.string().trim().min(2, "Full name must be at least 2 characters"),
  email: z.string().trim().email("Invalid email address"),
  departmentId: z.coerce
    .number({
      required_error: "Department is required",
      invalid_type_error: "Department is required",
    })
    .min(1, "Department is required"),
  status: z.enum(["active", "inactive"]).default("active"),
  password: z
    .string()
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters if provided",
    }),
  image: z.string().optional().nullable(),
  imageCldPubId: z.string().optional().nullable(),
});

export const scheduleSchema = z.object({
  id: z.number().optional(),
  day: z.string().min(1, "Day is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  room: z.string().optional().nullable(),
});

export const classSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Class name must be at least 2 characters")
    .max(255, "Class name must be at most 255 characters"),
  description: z.string().optional().nullable(),
  courseCode: z.string().max(50).optional().nullable(),
  subjectId: z.coerce
    .number({
      required_error: "Subject is required",
      invalid_type_error: "Subject is required",
    })
    .min(1, "Subject is required"),
  teacherId: z.string().optional().nullable(),
  capacity: z.coerce
    .number({
      required_error: "Capacity is required",
      invalid_type_error: "Capacity is required",
    })
    .min(1, "Capacity must be at least 1")
    .default(30),
  status: z.enum(["active", "inactive"]).default("active"),
  bannerUrl: z.string().optional().nullable(),
  bannerCldPubId: z.string().optional().nullable(),
  inviteCode: z.string().optional().nullable(),
  schedules: z.array(scheduleSchema).optional(),
});

export const enrollmentSchema = z.object({
  classId: z.coerce
    .number({
      required_error: "Class ID is required",
      invalid_type_error: "Class ID is required",
    })
    .min(1, "Class ID is required"),
  studentId: z.string().min(1, "Student ID is required"),
});
