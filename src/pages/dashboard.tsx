import React, { useEffect, useState } from "react";
import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  UserCheck,
  ArrowRight,
  Loader2,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY, type IdentityUser } from "@/providers/auth";
import { Link } from "react-router";

const API_URL = import.meta.env.VITE_BACKEND_BASE_URL;

const CHART_COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4"];

export const Dashboard: React.FC = () => {
  const cachedUser = localStorage.getItem(AUTH_USER_KEY);
  let user: IdentityUser | null = null;
  if (cachedUser) {
    try {
      user = JSON.parse(cachedUser);
    } catch {
      // ignore
    }
  }

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getHeaders = () => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/dashboard`, {
      headers: getHeaders(),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load dashboard data");
        return res.json();
      })
      .then((data) => {
        setDashboardData(data.data || data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="p-8 text-center space-y-3">
        <p className="text-destructive font-semibold">Error loading dashboard</p>
        <p className="text-xs text-muted-foreground">{error || "No data received."}</p>
        <Button size="sm" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  const role = user?.role || dashboardData.role || "STUDENT";
  const { stats } = dashboardData;

  return (
    <div className="space-y-6 pb-12">
      <Breadcrumb />

      {/* Header Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-xl border shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Welcome back, {user?.name || "Member"}
            </h1>
            <Badge
              variant="outline"
              className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30"
            >
              {role}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            {role === "ADMIN" &&
              "Institutional overview, master data analytics, and real-time enrollment statistics."}
            {role === "TEACHER" &&
              "Your teaching schedule, assigned course sections, and enrolled student rosters."}
            {role === "STUDENT" &&
              "Your active enrolled courses, upcoming timetable, and academic progress."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {role === "ADMIN" && (
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/portal/classes/create">
                <GraduationCap className="h-4 w-4" />
                New Class
              </Link>
            </Button>
          )}
          {role === "STUDENT" && (
            <Button asChild size="sm" className="gap-1.5">
              <Link to="/portal/enrollments">
                <KeyRound className="h-4 w-4" />
                Join Class
              </Link>
            </Button>
          )}
          {role === "TEACHER" && (
            <Button asChild variant="outline" size="sm" className="gap-1.5">
              <Link to="/portal/classes">
                <BookOpen className="h-4 w-4" />
                View My Classes
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. ADMINISTRATOR DASHBOARD */}
      {/* ==================================================================== */}
      {role === "ADMIN" && (
        <div className="space-y-6">
          {/* Key KPI Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Students
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <GraduationCap className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalStudents ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-0.5">Registered student accounts</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Faculty
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalTeachers ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-0.5">Faculty instructors</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Classes
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <BookOpen className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalClasses ?? 0}</div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                  <span className="text-emerald-600 font-semibold">{stats?.activeClasses ?? 0} active</span>
                  <span>•</span>
                  <span>{stats?.inactiveClasses ?? 0} inactive</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Enrollments
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
                  <UserCheck className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalEnrollments ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-0.5">Active course enrollments</p>
              </CardContent>
            </Card>
          </div>

          {/* Master Data Metrics Row */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <Card className="shadow-sm flex items-center p-4 gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Departments</p>
                <p className="text-xl font-bold">{stats?.totalDepartments ?? 0} Institutional Departments</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
                <Link to="/portal/departments">
                  View <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </Card>

            <Card className="shadow-sm flex items-center p-4 gap-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Subjects</p>
                <p className="text-xl font-bold">{stats?.totalSubjects ?? 0} Curricular Subjects</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="gap-1 text-xs">
                <Link to="/portal/subjects">
                  View <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </Card>
          </div>

          {/* Visual Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Enrollment by Department Bar Chart */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  Department Academic Breakdown
                </CardTitle>
                <CardDescription className="text-xs">
                  Distribution of students, faculty, and classes across departments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.enrollmentDistribution && dashboardData.enrollmentDistribution.length > 0 ? (
                  <div className="h-72 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dashboardData.enrollmentDistribution}>
                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                        <XAxis dataKey="code" fontSize={11} tickLine={false} />
                        <YAxis fontSize={11} tickLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "8px",
                            fontSize: "12px",
                          }}
                        />
                        <Legend wrapperStyle={{ fontSize: "11px" }} />
                        <Bar dataKey="students" name="Students" fill="#2563eb" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="classes" name="Classes" fill="#16a34a" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="teachers" name="Teachers" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-sm text-muted-foreground">
                    No department data available.
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Class Status Pie Chart */}
            <Card className="shadow-sm flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <PieChart className="h-4 w-4 text-primary" />
                  Class Status Distribution
                </CardTitle>
                <CardDescription className="text-xs">
                  Proportion of active vs inactive courses.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col items-center justify-center">
                {stats?.totalClasses > 0 ? (
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Active", value: stats.activeClasses },
                            { name: "Inactive", value: stats.inactiveClasses },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={50}
                          outerRadius={75}
                          paddingAngle={4}
                          dataKey="value"
                        >
                          <Cell fill="#16a34a" />
                          <Cell fill="#9ca3af" />
                        </Pie>
                        <Tooltip />
                        <Legend wrapperStyle={{ fontSize: "12px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No classes available.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Two-Column Activity & Lists */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Classes */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Recently Created Classes
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Latest additions to institutional offerings.
                  </CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/portal/classes">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {dashboardData.recentClasses && dashboardData.recentClasses.length > 0 ? (
                  <div className="divide-y text-xs">
                    {dashboardData.recentClasses.map((cls: any) => (
                      <div key={cls.id} className="py-2.5 flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Link
                            to={`/portal/classes/${cls.id}`}
                            className="font-semibold text-foreground hover:underline"
                          >
                            {cls.name}
                          </Link>
                          <p className="text-muted-foreground">
                            {cls.subject?.name} • {cls.teacher?.name || "No Teacher"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-muted-foreground">
                            {cls.enrolledCount ?? 0}/{cls.capacity}
                          </span>
                          <Badge
                            variant={cls.status === "active" ? "default" : "secondary"}
                            className="text-[10px] capitalize"
                          >
                            {cls.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-4 text-center">No recent classes.</p>
                )}
              </CardContent>
            </Card>

            {/* Recent Enrollment Activity */}
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" />
                    Recent Enrollment Activity
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Latest student registrations into sections.
                  </CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/portal/enrollments">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {dashboardData.recentEnrollments && dashboardData.recentEnrollments.length > 0 ? (
                  <div className="divide-y text-xs">
                    {dashboardData.recentEnrollments.map((enr: any) => (
                      <div key={enr.id} className="py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-7 w-7">
                            {enr.student?.image && (
                              <AvatarImage src={enr.student.image} alt={enr.student.name} />
                            )}
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                              {enr.student?.name?.[0] || "S"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{enr.student?.name}</p>
                            <p className="text-muted-foreground">{enr.class?.name}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="text-[10px] capitalize font-normal">
                            {enr.status}
                          </Badge>
                          <p className="text-[10px] text-muted-foreground mt-0.5">
                            {enr.enrolledAt ? new Date(enr.enrolledAt).toLocaleDateString() : ""}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-4 text-center">No recent enrollments.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Department Master Data Table */}
          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-primary" />
                  Department Master Statistics
                </CardTitle>
                <CardDescription className="text-xs">
                  Institutional statistics aggregated at the department level.
                </CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm" className="text-xs">
                <Link to="/portal/departments">Manage Departments</Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-muted/50 border-b uppercase font-semibold text-muted-foreground">
                    <tr>
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Department Name</th>
                      <th className="py-3 px-4 text-center">Subjects</th>
                      <th className="py-3 px-4 text-center">Faculty</th>
                      <th className="py-3 px-4 text-center">Students</th>
                      <th className="py-3 px-4 text-center">Classes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dashboardData.departmentStats?.map((dept: any) => (
                      <tr key={dept.id} className="hover:bg-muted/20">
                        <td className="py-3 px-4 font-mono font-bold text-primary">{dept.code}</td>
                        <td className="py-3 px-4 font-medium">{dept.name}</td>
                        <td className="py-3 px-4 text-center">{dept.subjectCount ?? 0}</td>
                        <td className="py-3 px-4 text-center">{dept.teacherCount ?? 0}</td>
                        <td className="py-3 px-4 text-center">{dept.studentCount ?? 0}</td>
                        <td className="py-3 px-4 text-center">{dept.classCount ?? 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 2. TEACHER DASHBOARD */}
      {/* ==================================================================== */}
      {role === "TEACHER" && (
        <div className="space-y-6">
          {/* Teacher KPI Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  My Classes
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <BookOpen className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalAssignedClasses ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {stats?.activeAssignedClasses ?? 0} active sections
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Enrolled Students
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Users className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalEnrolledStudents ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-0.5">Across all your classes</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Weekly Schedule
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <Calendar className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.upcomingSchedules?.length ?? 0}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Weekly instructional sessions</p>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Timetable & Assigned Classes Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Upcoming Schedules */}
            <Card className="lg:col-span-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Weekly Timetable
                </CardTitle>
                <CardDescription className="text-xs">
                  Your recurring lecture and lab timetable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.upcomingSchedules && dashboardData.upcomingSchedules.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.upcomingSchedules.map((s: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/40 rounded-lg border space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="font-semibold text-primary">
                            {s.day}
                          </Badge>
                          <span className="font-mono text-muted-foreground">
                            {s.startTime} – {s.endTime}
                          </span>
                        </div>
                        <p className="font-semibold text-foreground">{s.className}</p>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          {s.courseCode && <span className="font-mono">{s.courseCode}</span>}
                          {s.room && (
                            <span className="flex items-center gap-0.5">
                              <MapPin className="h-3 w-3" />
                              {s.room}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-6 text-center">
                    No timetable sessions scheduled.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Assigned Classes */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    My Assigned Classes
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Class sections under your instructional leadership.
                  </CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/portal/classes">Manage Classes</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {dashboardData.assignedClasses && dashboardData.assignedClasses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData.assignedClasses.map((cls: any) => (
                      <div
                        key={cls.id}
                        className="p-4 bg-muted/20 border rounded-lg flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            {cls.courseCode && (
                              <Badge variant="outline" className="font-mono text-[10px]">
                                {cls.courseCode}
                              </Badge>
                            )}
                            <Badge
                              variant={cls.status === "active" ? "default" : "secondary"}
                              className="text-[10px] capitalize"
                            >
                              {cls.status}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-sm text-foreground mt-2 line-clamp-1">
                            {cls.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {cls.subject?.name}
                          </p>
                        </div>

                        <div className="pt-2 border-t flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">
                            {cls.enrolledCount ?? 0} / {cls.capacity} Enrolled
                          </span>
                          <Link
                            to={`/portal/classes/${cls.id}`}
                            className="font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            Roster <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-8 text-center">
                    You have not been assigned to any classes yet.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 3. STUDENT DASHBOARD */}
      {/* ==================================================================== */}
      {role === "STUDENT" && (
        <div className="space-y-6">
          {/* Quick Metrics & Call to Action */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Enrolled Courses
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                  <GraduationCap className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats?.totalEnrolledClasses ?? 0}</div>
                <p className="text-xs text-muted-foreground mt-0.5">Active academic sections</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Weekly Sessions
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Clock className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.upcomingSchedules?.length ?? 0}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Weekly class hours</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Subjects
                </CardTitle>
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                  <BookOpen className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.enrolledSubjects?.length ?? 0}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Distinct academic subjects</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Invitation Code Action Box */}
          <Card className="bg-primary/5 border-primary/20 shadow-sm">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground">
                    Enroll in a New Class Section
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Join with an instructor invitation code or browse available open sections.
                  </p>
                </div>
              </div>
              <Button asChild size="sm" className="gap-1.5 shrink-0">
                <Link to="/portal/enrollments">
                  <KeyRound className="h-4 w-4" />
                  Join or Browse Classes
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* My Enrolled Classes & Timetable */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Weekly Timetable */}
            <Card className="lg:col-span-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Weekly Timetable
                </CardTitle>
                <CardDescription className="text-xs">
                  Your recurring class sessions this week.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dashboardData.upcomingSchedules && dashboardData.upcomingSchedules.length > 0 ? (
                  <div className="space-y-3">
                    {dashboardData.upcomingSchedules.map((s: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/40 rounded-lg border space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="font-semibold text-primary">
                            {s.day}
                          </Badge>
                          <span className="font-mono text-muted-foreground">
                            {s.startTime} – {s.endTime}
                          </span>
                        </div>
                        <p className="font-semibold text-foreground">{s.className}</p>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                          {s.courseCode && <span className="font-mono">{s.courseCode}</span>}
                          {s.room && (
                            <span className="flex items-center gap-0.5">
                              <MapPin className="h-3 w-3" />
                              {s.room}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground py-6 text-center">
                    No upcoming sessions scheduled.
                  </p>
                )}
              </CardContent>
            </Card>

            {/* My Active Courses Grid */}
            <Card className="lg:col-span-2 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    My Active Courses
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Classes currently in session.
                  </CardDescription>
                </div>
                <Button asChild variant="ghost" size="sm" className="text-xs">
                  <Link to="/portal/enrollments">All Enrollments</Link>
                </Button>
              </CardHeader>
              <CardContent>
                {dashboardData.enrolledClasses && dashboardData.enrolledClasses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dashboardData.enrolledClasses.map((cls: any) => (
                      <div
                        key={cls.id}
                        className="p-4 bg-muted/20 border rounded-lg flex flex-col justify-between space-y-3"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            {cls.courseCode && (
                              <Badge variant="outline" className="font-mono text-[10px]">
                                {cls.courseCode}
                              </Badge>
                            )}
                            <Badge variant="secondary" className="text-[10px] bg-green-600/10 text-green-700 capitalize">
                              {cls.enrollmentStatus || "Enrolled"}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-sm text-foreground mt-2 line-clamp-1">
                            {cls.name}
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            {cls.subject?.name}
                          </p>
                        </div>

                        {cls.teacher && (
                          <div className="flex items-center gap-2 pt-2 border-t text-xs">
                            <Avatar className="h-6 w-6">
                              {cls.teacher.image && (
                                <AvatarImage src={cls.teacher.image} alt={cls.teacher.name} />
                              )}
                              <AvatarFallback className="text-[10px]">
                                {cls.teacher.name?.[0] || "T"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground truncate">
                              {cls.teacher.name}
                            </span>
                          </div>
                        )}

                        <div className="pt-2 border-t flex justify-end">
                          <Link
                            to={`/portal/classes/${cls.id}`}
                            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                          >
                            Class Details <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-xs text-muted-foreground space-y-2">
                    <p>You have not enrolled in any classes yet.</p>
                    <Button asChild size="sm" variant="outline">
                      <Link to="/portal/enrollments">Browse Open Classes</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
