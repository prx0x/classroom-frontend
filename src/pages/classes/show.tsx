import React, { useState, useEffect } from "react";
import { ShowView, ShowViewHeader } from "@/components/refine-ui/views/show-view";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useShow } from "@refinedev/core";
import { ClassDetails, User } from "@/types";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Copy,
  Check,
  RefreshCw,
  GraduationCap,
  BookOpen,
  Building2,
  Mail,
  UserCheck,
  UserX,
  Plus,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, type IdentityUser } from "@/providers/auth";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

interface RosterStudent {
  id: number;
  status: string;
  enrolledAt: string;
  student: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
    departmentId?: number | null;
    status: string;
  };
}

const ClassesShow: React.FC = () => {
  const { query } = useShow<ClassDetails>({
    resource: "classes",
  });

  const record = query?.data?.data as ClassDetails | undefined;
  const isLoading = query?.isLoading;

  const [copiedCode, setCopiedCode] = useState(false);
  const [regeneratingCode, setRegeneratingCode] = useState(false);
  const [currentInviteCode, setCurrentInviteCode] = useState<string | undefined>(undefined);

  // Roster state
  const [roster, setRoster] = useState<RosterStudent[]>([]);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [rosterError, setRosterError] = useState<string | null>(null);

  // Enroll modal state
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [allStudents, setAllStudents] = useState<User[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  const [enrolling, setEnrolling] = useState(false);

  // Current user role
  const cachedUser = localStorage.getItem(AUTH_USER_KEY);
  let userRole = "STUDENT";
  if (cachedUser) {
    try {
      const parsed = JSON.parse(cachedUser) as IdentityUser;
      if (parsed.role) userRole = parsed.role;
    } catch {
      // fallback
    }
  }

  const getHeaders = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    if (record?.inviteCode) {
      setCurrentInviteCode(record.inviteCode);
    }
  }, [record?.inviteCode]);

  // Load roster
  const loadRoster = () => {
    if (!record?.id) return;
    setLoadingRoster(true);
    setRosterError(null);

    fetch(`${API_URL}/classes/${record.id}/students`, {
      headers: getHeaders(),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("Roster access restricted to administrators and assigned faculty.");
          }
          throw new Error("Failed to load class roster");
        }
        return res.json();
      })
      .then((data) => {
        setRoster(data.students || data.data || []);
      })
      .catch((err) => {
        setRosterError(err.message);
      })
      .finally(() => setLoadingRoster(false));
  };

  useEffect(() => {
    if (record?.id) {
      loadRoster();
    }
  }, [record?.id]);

  // Load students for manual enrollment modal
  useEffect(() => {
    if (enrollModalOpen && allStudents.length === 0) {
      fetch(`${API_URL}/students`, {
        headers: getHeaders(),
        credentials: "include",
      })
        .then((r) => (r.ok ? r.json() : { students: [] }))
        .then((d) => setAllStudents(d.students || d.data || []))
        .catch(console.error);
    }
  }, [enrollModalOpen]);

  const handleCopyCode = () => {
    if (!currentInviteCode) return;
    navigator.clipboard.writeText(currentInviteCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleRegenerateCode = async () => {
    if (!record?.id) return;
    setRegeneratingCode(true);
    try {
      const res = await fetch(`${API_URL}/classes/${record.id}/regenerate-invite-code`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setCurrentInviteCode(data.inviteCode);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setRegeneratingCode(false);
    }
  };

  const handleEnrollStudent = async () => {
    if (!record?.id || !selectedStudentId) return;
    setEnrolling(true);
    try {
      const res = await fetch(`${API_URL}/classes/${record.id}/enroll`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({ studentId: selectedStudentId }),
      });
      if (res.ok) {
        setEnrollModalOpen(false);
        setSelectedStudentId("");
        loadRoster();
        query?.refetch();
      } else {
        const errorData = await res.json();
        alert(errorData.error?.message || errorData.message || "Enrollment failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  const handleDropStudent = async (studentId: string) => {
    if (!record?.id) return;
    if (!confirm("Are you sure you want to drop this student from the class?")) return;

    try {
      const res = await fetch(`${API_URL}/classes/${record.id}/drop`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({ studentId }),
      });
      if (res.ok) {
        loadRoster();
        query?.refetch();
      } else {
        const errorData = await res.json();
        alert(errorData.error?.message || errorData.message || "Failed to drop student");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <ShowView>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </ShowView>
    );
  }

  if (!record) {
    return (
      <ShowView>
        <div className="text-center py-16 text-muted-foreground">Class record not found.</div>
      </ShowView>
    );
  }

  const teacherInitials = record.teacher?.name
    ? record.teacher.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "T";

  const enrolledCount = record.enrolledCount ?? roster.length;
  const isFull = enrolledCount >= record.capacity;

  return (
    <ShowView>
      <ShowViewHeader resource="classes" title={record.name} />

      {/* Banner Header Card */}
      {record.bannerUrl && (
        <div className="relative w-full h-48 md:h-64 rounded-xl overflow-hidden mb-6 border shadow-sm">
          <img
            src={record.bannerUrl}
            alt={record.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div className="text-white space-y-1">
              <div className="flex items-center gap-2">
                {record.courseCode && (
                  <Badge className="bg-white/20 hover:bg-white/30 text-white font-mono text-xs backdrop-blur-sm">
                    {record.courseCode}
                  </Badge>
                )}
                <Badge
                  className={
                    record.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-500 text-white"
                  }
                >
                  {record.status}
                </Badge>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                {record.name}
              </h1>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Overview, Timetable, Roster */}
        <div className="lg:col-span-2 space-y-6">
          {/* Overview Info */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Class Master Data
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Academic Subject
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    {record.subject?.name || "Unassigned"}
                  </span>
                  {record.subject?.code && (
                    <Badge variant="outline" className="font-mono text-xs">
                      {record.subject.code}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Department
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-semibold text-foreground">
                    {record.department?.name ||
                      (typeof record.subject?.department === "object"
                        ? record.subject?.department?.name
                        : record.subject?.department) ||
                      "General"}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Faculty Instructor
                </span>
                {record.teacher ? (
                  <div className="flex items-center gap-3 mt-2 p-3 bg-muted/30 rounded-lg border">
                    <Avatar className="h-10 w-10">
                      {record.teacher.image && (
                        <AvatarImage src={record.teacher.image} alt={record.teacher.name} />
                      )}
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {teacherInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground text-sm">
                        {record.teacher.name}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {record.teacher.email}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground mt-1 italic">
                    No instructor currently assigned.
                  </p>
                )}
              </div>

              {record.description && (
                <div className="sm:col-span-2 pt-2 border-t">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Description & Syllabus Notes
                  </span>
                  <p className="text-sm text-foreground mt-1 whitespace-pre-wrap leading-relaxed">
                    {record.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Timetable / Schedules Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Class Weekly Schedule
              </CardTitle>
              <CardDescription>
                Recurring instructional sessions and room locations for this class.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {record.schedules && record.schedules.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {record.schedules.map((slot, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 bg-muted/30 border rounded-lg"
                    >
                      <div className="space-y-1">
                        <Badge variant="outline" className="font-semibold text-primary">
                          {slot.day}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                          <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>
                            {slot.startTime} – {slot.endTime}
                          </span>
                        </div>
                      </div>
                      {slot.room ? (
                        <div className="flex items-center gap-1 text-xs font-medium bg-background px-2.5 py-1 rounded border">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span>{slot.room}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground italic">Online / TBA</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                  No weekly schedule sessions configured for this class.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Roster Card */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Enrolled Students Roster
                </CardTitle>
                <CardDescription>
                  Students actively enrolled in this class section.
                </CardDescription>
              </div>

              {userRole === "ADMIN" && (
                <Button
                  size="sm"
                  onClick={() => setEnrollModalOpen(true)}
                  className="gap-1.5"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Enroll Student
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {loadingRoster ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : rosterError ? (
                <div className="p-4 bg-muted/40 rounded-lg text-xs text-muted-foreground border">
                  {rosterError}
                </div>
              ) : roster.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                  No students currently enrolled in this class.
                </div>
              ) : (
                <div className="divide-y border rounded-lg overflow-hidden">
                  {roster.map((r) => {
                    const initials = r.student.name
                      ? r.student.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      : "S";

                    return (
                      <div
                        key={r.id}
                        className="flex items-center justify-between p-3.5 hover:bg-muted/20 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {r.student.image && (
                              <AvatarImage src={r.student.image} alt={r.student.name} />
                            )}
                            <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-foreground">
                              {r.student.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {r.student.email}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Badge
                            variant="secondary"
                            className="capitalize text-xs font-normal"
                          >
                            {r.status}
                          </Badge>
                          {userRole === "ADMIN" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDropStudent(r.student.id)}
                              className="text-destructive hover:bg-destructive/10 text-xs h-7 px-2"
                            >
                              Drop
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Invitation Code & Capacity Meter */}
        <div className="space-y-6">
          {/* Invitation Code Card */}
          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Class Invitation Code</span>
                <Badge variant="outline" className="font-mono text-[10px] uppercase">
                  Unique Code
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs">
                Eligible students can enter this code in the portal to enroll directly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <code className="text-base font-mono font-bold bg-background px-3 py-1.5 rounded-lg border flex-1 text-center tracking-wider text-primary">
                  {currentInviteCode || "—"}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyCode}
                  title="Copy code"
                  className="shrink-0"
                >
                  {copiedCode ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {userRole === "ADMIN" && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRegenerateCode}
                  disabled={regeneratingCode}
                  className="w-full text-xs gap-1.5 mt-2"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${regeneratingCode ? "animate-spin" : ""}`}
                  />
                  Regenerate Code
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Capacity Meter */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>Capacity Status</span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {enrolledCount} / {record.capacity}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    isFull ? "bg-destructive" : "bg-primary"
                  }`}
                  style={{
                    width: `${Math.min(100, (enrolledCount / record.capacity) * 100)}%`,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{record.capacity - enrolledCount} seats remaining</span>
                {isFull ? (
                  <Badge variant="destructive" className="text-[10px] uppercase">
                    Full
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-[10px] text-green-600 border-green-300 uppercase">
                    Open
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Manual Student Enrollment Modal (ADMIN) */}
      <Dialog open={enrollModalOpen} onOpenChange={setEnrollModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enroll Student into Class</DialogTitle>
            <DialogDescription>
              Select a registered student account to provision enrollment into {record.name}.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-3">
            <label className="text-xs font-semibold text-foreground">
              Select Student
            </label>
            <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a registered student..." />
              </SelectTrigger>
              <SelectContent>
                {allStudents.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name} ({s.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEnrollModalOpen(false)}
              disabled={enrolling}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEnrollStudent}
              disabled={!selectedStudentId || enrolling}
            >
              {enrolling ? (
                <span className="flex items-center gap-1.5">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enrolling...
                </span>
              ) : (
                "Confirm Enrollment"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ShowView>
  );
};

export default ClassesShow;
