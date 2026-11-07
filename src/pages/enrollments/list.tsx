import React, { useState, useEffect } from "react";
import { ListView } from "@/components/refine-ui/views/list-view";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Users,
  Search,
  KeyRound,
  Calendar,
  BookOpen,
  Plus,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
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
import { ClassDetails, EnrollmentItem, User } from "@/types";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const EnrollmentsList: React.FC = () => {
  const cachedUser = localStorage.getItem(AUTH_USER_KEY);
  let user: IdentityUser | null = null;
  if (cachedUser) {
    try {
      user = JSON.parse(cachedUser);
    } catch {
      // ignore
    }
  }
  const role = user?.role || "STUDENT";

  const getHeaders = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  // -------------------------------------------------------------
  // ADMIN STATE
  // -------------------------------------------------------------
  const [adminEnrollments, setAdminEnrollments] = useState<EnrollmentItem[]>([]);
  const [loadingAdminEnrollments, setLoadingAdminEnrollments] = useState(false);
  const [adminClasses, setAdminClasses] = useState<ClassDetails[]>([]);
  const [adminStudents, setAdminStudents] = useState<User[]>([]);
  const [filterClassId, setFilterClassId] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [adminEnrollModalOpen, setAdminEnrollModalOpen] = useState(false);
  const [modalClassId, setModalClassId] = useState<string>("");
  const [modalStudentId, setModalStudentId] = useState<string>("");
  const [modalSubmitting, setModalSubmitting] = useState(false);

  // -------------------------------------------------------------
  // STUDENT STATE
  // -------------------------------------------------------------
  const [myEnrollments, setMyEnrollments] = useState<any[]>([]);
  const [loadingMyEnrollments, setLoadingMyEnrollments] = useState(false);
  const [availableClasses, setAvailableClasses] = useState<ClassDetails[]>([]);
  const [loadingAvailable, setLoadingAvailable] = useState(false);
  const [inviteCodeInput, setInviteCodeInput] = useState("");
  const [joiningCode, setJoiningCode] = useState(false);
  const [joinMessage, setJoinMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // -------------------------------------------------------------
  // TEACHER STATE
  // -------------------------------------------------------------
  const [teacherClasses, setTeacherClasses] = useState<ClassDetails[]>([]);
  const [loadingTeacherClasses, setLoadingTeacherClasses] = useState(false);

  // Load Admin Data
  const loadAdminEnrollments = () => {
    if (role !== "ADMIN") return;
    setLoadingAdminEnrollments(true);

    const params = new URLSearchParams();
    if (filterClassId !== "all") params.append("classId", filterClassId);
    if (filterStatus !== "all") params.append("status", filterStatus);

    fetch(`${API_URL}/enrollments?${params.toString()}`, {
      headers: getHeaders(),
      credentials: "include",
    })
      .then((r) => (r.ok ? r.json() : { enrollments: [] }))
      .then((data) => setAdminEnrollments(data.enrollments || data.data || []))
      .catch(console.error)
      .finally(() => setLoadingAdminEnrollments(false));
  };

  useEffect(() => {
    if (role === "ADMIN") {
      loadAdminEnrollments();
      fetch(`${API_URL}/classes`, { headers: getHeaders(), credentials: "include" })
        .then((r) => (r.ok ? r.json() : { classes: [] }))
        .then((d) => setAdminClasses(d.classes || d.data || []))
        .catch(console.error);

      fetch(`${API_URL}/students`, { headers: getHeaders(), credentials: "include" })
        .then((r) => (r.ok ? r.json() : { students: [] }))
        .then((d) => setAdminStudents(d.students || d.data || []))
        .catch(console.error);
    }
  }, [role, filterClassId, filterStatus]);

  // Load Student Data
  const loadStudentData = () => {
    if (role !== "STUDENT" || !user?.id) return;
    setLoadingMyEnrollments(true);
    setLoadingAvailable(true);

    fetch(`${API_URL}/users/me`, { headers: getHeaders(), credentials: "include" })
      .then((r) => (r.ok ? r.json() : {}))
      .then((data: any) => {
        const u = data?.data || data?.user;
        if (u?.enrolledClasses) {
          setMyEnrollments(u.enrolledClasses);
        }
      })
      .catch(console.error)
      .finally(() => setLoadingMyEnrollments(false));

    fetch(`${API_URL}/classes?status=active`, { headers: getHeaders(), credentials: "include" })
      .then((r) => (r.ok ? r.json() : { classes: [] }))
      .then((d) => setAvailableClasses(d.classes || d.data || []))
      .catch(console.error)
      .finally(() => setLoadingAvailable(false));
  };

  useEffect(() => {
    if (role === "STUDENT") {
      loadStudentData();
    }
  }, [role, user?.id]);

  // Load Teacher Data
  useEffect(() => {
    if (role === "TEACHER" && user?.id) {
      setLoadingTeacherClasses(true);
      fetch(`${API_URL}/classes?teacherId=${user.id}`, {
        headers: getHeaders(),
        credentials: "include",
      })
        .then((r) => (r.ok ? r.json() : { classes: [] }))
        .then((d) => setTeacherClasses(d.classes || d.data || []))
        .catch(console.error)
        .finally(() => setLoadingTeacherClasses(false));
    }
  }, [role, user?.id]);

  // Join by Invite Code
  const handleJoinByCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteCodeInput.trim()) return;
    setJoiningCode(true);
    setJoinMessage(null);

    try {
      const res = await fetch(`${API_URL}/classes/join`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({ inviteCode: inviteCodeInput.trim().toUpperCase() }),
      });

      if (res.ok) {
        setJoinMessage({
          type: "success",
          text: "Successfully enrolled in class!",
        });
        setInviteCodeInput("");
        loadStudentData();
      } else {
        const errorData = await res.json();
        setJoinMessage({
          type: "error",
          text: errorData.error?.message || errorData.message || "Failed to join class",
        });
      }
    } catch (err: any) {
      setJoinMessage({ type: "error", text: err.message });
    } finally {
      setJoiningCode(false);
    }
  };

  // Student 1-click enroll
  const handleDirectEnroll = async (classId: number) => {
    try {
      const res = await fetch(`${API_URL}/classes/${classId}/enroll`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({}),
      });
      if (res.ok) {
        loadStudentData();
      } else {
        const errorData = await res.json();
        alert(errorData.error?.message || errorData.message || "Enrollment failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Drop enrollment
  const handleDrop = async (classId: number, studentId?: string) => {
    if (!confirm("Are you sure you want to drop this enrollment?")) return;

    try {
      const res = await fetch(`${API_URL}/classes/${classId}/drop`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({ studentId }),
      });
      if (res.ok) {
        if (role === "ADMIN") loadAdminEnrollments();
        if (role === "STUDENT") loadStudentData();
      } else {
        const errorData = await res.json();
        alert(errorData.error?.message || errorData.message || "Failed to drop enrollment");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Admin Manual Enroll
  const handleAdminEnroll = async () => {
    if (!modalClassId || !modalStudentId) return;
    setModalSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/enrollments`, {
        method: "POST",
        headers: getHeaders(),
        credentials: "include",
        body: JSON.stringify({
          classId: Number(modalClassId),
          studentId: modalStudentId,
        }),
      });
      if (res.ok) {
        setAdminEnrollModalOpen(false);
        setModalClassId("");
        setModalStudentId("");
        loadAdminEnrollments();
      } else {
        const errorData = await res.json();
        alert(errorData.error?.message || errorData.message || "Enrollment failed");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setModalSubmitting(false);
    }
  };

  return (
    <ListView>
      <Breadcrumb />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2 mb-6">
        <div>
          <h1 className="page-title text-2xl font-bold tracking-tight">Class Enrollments</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {role === "ADMIN" && "Manage institutional student enrollments, course rosters, and capacity."}
            {role === "STUDENT" && "View your enrolled courses, browse available sections, or join with an invitation code."}
            {role === "TEACHER" && "View your assigned course sections and enrolled student rosters."}
          </p>
        </div>

        {role === "ADMIN" && (
          <Button onClick={() => setAdminEnrollModalOpen(true)} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Provision Enrollment
          </Button>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ADMIN VIEW */}
      {/* ------------------------------------------------------------- */}
      {role === "ADMIN" && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="w-full sm:w-[240px]">
              <Select value={filterClassId} onValueChange={setFilterClassId}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {adminClasses.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name} {c.courseCode ? `(${c.courseCode})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full sm:w-[160px]">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="text-sm">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="enrolled">Enrolled</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Table */}
          <Card className="shadow-sm">
            <CardContent className="p-0">
              {loadingAdminEnrollments ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : adminEnrollments.length === 0 ? (
                <div className="text-center py-16 text-muted-foreground text-sm">
                  No enrollment records matching criteria.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      <tr>
                        <th className="py-3 px-4">Class</th>
                        <th className="py-3 px-4">Student</th>
                        <th className="py-3 px-4">Enrolled At</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {adminEnrollments.map((enr) => (
                        <tr key={enr.id} className="hover:bg-muted/20 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col">
                              <Link
                                to={`/portal/classes/${enr.class?.id}`}
                                className="font-semibold text-foreground hover:underline"
                              >
                                {enr.class?.name}
                              </Link>
                              {enr.class?.courseCode && (
                                <span className="text-xs text-muted-foreground font-mono">
                                  {enr.class.courseCode}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-2.5">
                              <Avatar className="h-7 w-7">
                                {enr.student?.image && (
                                  <AvatarImage src={enr.student.image} alt={enr.student.name} />
                                )}
                                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                                  {enr.student?.name?.[0] || "S"}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground text-xs">
                                  {enr.student?.name}
                                </span>
                                <span className="text-[10px] text-muted-foreground">
                                  {enr.student?.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground font-mono">
                            {enr.enrolledAt ? new Date(enr.enrolledAt).toLocaleDateString() : "—"}
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge
                              variant="secondary"
                              className={`capitalize text-xs ${
                                enr.status === "enrolled"
                                  ? "bg-green-600/10 text-green-700 border-green-200"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {enr.status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {enr.status === "enrolled" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDrop(enr.classId, enr.studentId)}
                                className="text-destructive hover:bg-destructive/10 text-xs h-7"
                              >
                                Drop
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Admin Provision Enrollment Dialog */}
          <Dialog open={adminEnrollModalOpen} onOpenChange={setAdminEnrollModalOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll Student into Class</DialogTitle>
                <DialogDescription>
                  Select an active class and student to provision an institutional enrollment.
                </DialogDescription>
              </DialogHeader>

              <div className="py-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Select Class</label>
                  <Select value={modalClassId} onValueChange={setModalClassId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a class..." />
                    </SelectTrigger>
                    <SelectContent>
                      {adminClasses.map((c) => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name} {c.courseCode ? `(${c.courseCode})` : ""}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold">Select Student</label>
                  <Select value={modalStudentId} onValueChange={setModalStudentId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a student..." />
                    </SelectTrigger>
                    <SelectContent>
                      {adminStudents.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name} ({s.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setAdminEnrollModalOpen(false)}
                  disabled={modalSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAdminEnroll}
                  disabled={!modalClassId || !modalStudentId || modalSubmitting}
                >
                  {modalSubmitting ? (
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
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* STUDENT VIEW */}
      {/* ------------------------------------------------------------- */}
      {role === "STUDENT" && (
        <div className="space-y-8">
          {/* Join with Invite Code Card */}
          <Card className="shadow-sm border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2 text-primary">
                <KeyRound className="h-5 w-5" />
                Join Class with Invitation Code
              </CardTitle>
              <CardDescription>
                Received an invitation code from your instructor? Enter it below to join the section immediately.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinByCode} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Input
                  type="text"
                  placeholder="e.g. ABCD-1234"
                  value={inviteCodeInput}
                  onChange={(e) => setInviteCodeInput(e.target.value.toUpperCase())}
                  className="font-mono text-sm tracking-wider uppercase bg-background"
                />
                <Button type="submit" disabled={!inviteCodeInput.trim() || joiningCode} className="shrink-0">
                  {joiningCode ? (
                    <span className="flex items-center gap-1.5">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Joining...
                    </span>
                  ) : (
                    "Join Class"
                  )}
                </Button>
              </form>

              {joinMessage && (
                <div
                  className={`mt-3 p-3 rounded-lg flex items-center gap-2 text-xs ${
                    joinMessage.type === "success"
                      ? "bg-green-600/10 text-green-700 border border-green-200"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {joinMessage.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <span>{joinMessage.text}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* My Enrolled Classes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  My Enrolled Classes
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Classes you are currently registered in for this semester.
                </p>
              </div>
              <Badge variant="outline" className="font-mono">
                {myEnrollments.length} Active Course{myEnrollments.length !== 1 ? "s" : ""}
              </Badge>
            </div>

            {loadingMyEnrollments ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : myEnrollments.length === 0 ? (
              <Card className="p-8 text-center border-dashed">
                <BookOpen className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm font-semibold text-foreground">You are not enrolled in any classes yet.</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Use an invitation code above or browse available classes below to enroll.
                </p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myEnrollments.map((item) => (
                  <Card key={item.id} className="shadow-sm overflow-hidden flex flex-col justify-between">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between gap-2">
                        {item.courseCode && (
                          <Badge variant="outline" className="font-mono text-[10px]">
                            {item.courseCode}
                          </Badge>
                        )}
                        <Badge
                          variant="secondary"
                          className="text-[10px] bg-green-600/10 text-green-700 capitalize"
                        >
                          {item.enrollmentStatus || "Enrolled"}
                        </Badge>
                      </div>
                      <CardTitle className="text-base font-bold mt-1 line-clamp-1">
                        {item.name}
                      </CardTitle>
                      {item.subject?.name && (
                        <CardDescription className="text-xs line-clamp-1">
                          {item.subject.name}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between pt-3 border-t mt-2">
                        <Link
                          to={`/portal/classes/${item.id}`}
                          className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                        >
                          View Class Details
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDrop(item.id)}
                          className="text-destructive hover:bg-destructive/10 text-xs h-7 px-2"
                        >
                          Drop
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Browse Available Eligible Classes */}
          <div className="space-y-4 pt-4 border-t">
            <div>
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Available Eligible Classes
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Active sections open for student registration.
              </p>
            </div>

            {loadingAvailable ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : availableClasses.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No classes currently open for enrollment.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableClasses.map((cls) => {
                  const isEnrolled = myEnrollments.some((e) => e.id === cls.id);
                  const isFull = (cls.enrolledCount ?? 0) >= cls.capacity;

                  return (
                    <Card key={cls.id} className="shadow-sm flex flex-col justify-between">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between gap-2">
                          <Badge variant="outline" className="font-mono text-[10px]">
                            {cls.courseCode || cls.subject?.code || "COURSE"}
                          </Badge>
                          <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                            <Users className="h-3 w-3" />
                            <span>
                              {cls.enrolledCount ?? 0}/{cls.capacity}
                            </span>
                          </div>
                        </div>
                        <CardTitle className="text-base font-bold mt-1 line-clamp-1">
                          {cls.name}
                        </CardTitle>
                        <CardDescription className="text-xs line-clamp-1">
                          {cls.subject?.name} • {cls.teacher?.name || "Faculty TBA"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between pt-3 border-t mt-2">
                          <Link
                            to={`/portal/classes/${cls.id}`}
                            className="text-xs text-muted-foreground hover:underline"
                          >
                            Details
                          </Link>

                          {isEnrolled ? (
                            <Badge variant="secondary" className="text-xs bg-green-600/10 text-green-700">
                              Enrolled
                            </Badge>
                          ) : isFull ? (
                            <Badge variant="destructive" className="text-xs">
                              Full
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() => handleDirectEnroll(cls.id)}
                              className="text-xs h-7"
                            >
                              Enroll Now
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TEACHER VIEW */}
      {/* ------------------------------------------------------------- */}
      {role === "TEACHER" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loadingTeacherClasses ? (
              <div className="col-span-full flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : teacherClasses.length === 0 ? (
              <div className="col-span-full text-center py-16 text-muted-foreground text-sm border border-dashed rounded-lg">
                No classes currently assigned to your account.
              </div>
            ) : (
              teacherClasses.map((cls) => (
                <Card key={cls.id} className="shadow-sm flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="outline" className="font-mono text-xs">
                        {cls.courseCode || "CLASS"}
                      </Badge>
                      <Badge
                        className={
                          cls.status === "active"
                            ? "bg-green-600/10 text-green-700 border-green-200"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {cls.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold mt-2">
                      {cls.name}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {cls.subject?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/40 p-2.5 rounded-lg border">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        Enrolled Students
                      </span>
                      <span className="font-semibold text-foreground">
                        {cls.enrolledCount ?? 0} / {cls.capacity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <Link
                        to={`/portal/classes/${cls.id}`}
                        className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
                      >
                        View Class & Roster
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                      <Link
                        to={`/portal/classes/${cls.id}/edit`}
                        className="text-xs text-muted-foreground hover:underline"
                      >
                        Edit Details
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </ListView>
  );
};

export default EnrollmentsList;
