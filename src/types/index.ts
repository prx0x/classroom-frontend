export enum UserRole {
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  ADMIN = "ADMIN",
}

export type Department = {
  id: number;
  code: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type Subject = {
  id: number;
  name: string;
  code: string;
  description?: string | null;
  departmentId?: number;
  department?: Department | { id: number; name: string; code: string } | string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type AssignedClass = {
  id: number;
  name: string;
  courseCode?: string | null;
  status: string;
  capacity?: number;
  subjectId?: number;
  subject?: {
    id: number;
    name: string;
    code: string;
  } | null;
  createdAt?: string;
};

export type EnrolledClass = {
  enrollmentId: number;
  enrollmentStatus: string;
  enrolledAt: string;
  id: number;
  name: string;
  courseCode?: string | null;
  status: string;
  subject?: {
    id: number;
    name: string;
    code: string;
  } | null;
};

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified?: boolean;
  role: UserRole | string;
  status?: "active" | "inactive" | string;
  image?: string | null;
  imageCldPubId?: string | null;
  departmentId?: number | null;
  department?: Department | { id: number; name: string; code: string } | null;
  assignedClasses?: AssignedClass[];
  enrolledClasses?: EnrolledClass[];
  createdAt?: string;
  updatedAt?: string;
};

export type ListResponse<T = unknown> = {
  data?: T[];
  subjects?: T[];
  departments?: T[];
  users?: T[];
  teachers?: T[];
  students?: T[];
  classes?: T[];
  enrollments?: T[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

export type CreateResponse<T = unknown> = {
  data?: T;
};

export type GetOneResponse<T = unknown> = {
  data?: T;
};

declare global {
  interface CloudinaryUploadWidgetResults {
    event: string;
    info: {
      secure_url: string;
      public_id: string;
      delete_token?: string;
      resource_type: string;
      original_filename: string;
    };
  }

  interface CloudinaryWidget {
    open: () => void;
  }

  interface Window {
    cloudinary?: {
      createUploadWidget: (
        options: Record<string, unknown>,
        callback: (
          error: unknown,
          result: CloudinaryUploadWidgetResults
        ) => void
      ) => CloudinaryWidget;
    };
  }
}

export interface UploadWidgetValue {
  url: string;
  publicId: string;
}

export interface UploadWidgetProps {
  value?: UploadWidgetValue | null;
  onChange?: (value: UploadWidgetValue | null) => void;
  disabled?: boolean;
}

export type Schedule = {
  id?: number;
  day: string;
  startTime: string;
  endTime: string;
  room?: string | null;
};

export type ClassDetails = {
  id: number;
  name: string;
  description?: string | null;
  status: "active" | "inactive";
  capacity: number;
  enrolledCount?: number;
  courseCode?: string | null;
  courseName?: string | null;
  subjectId?: number;
  teacherId?: string | null;
  departmentId?: number | null;
  bannerUrl?: string | null;
  bannerCldPubId?: string | null;
  subject?: Subject;
  teacher?: User | null;
  department?: Department | null;
  schedules?: Schedule[];
  inviteCode?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ClassItem = ClassDetails;

export type EnrollmentItem = {
  id: number;
  classId: number;
  studentId: string;
  status: "enrolled" | "dropped" | "completed" | string;
  enrolledAt: string;
  class?: ClassDetails;
  subject?: Subject;
  student?: User;
  createdAt?: string;
  updatedAt?: string;
};

export type SignUpPayload = {
  email: string;
  name: string;
  password?: string;
  image?: string;
  imageCldPubId?: string;
  role: UserRole;
  status?: string;
  departmentId?: number | null;
};
