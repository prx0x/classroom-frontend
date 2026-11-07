import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AUTH_USER_KEY, AUTH_TOKEN_KEY, type IdentityUser } from "@/providers/auth";
import { BACKEND_BASE_URL } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Clock,
  MapPin,
  GraduationCap,
  ArrowRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

interface ScheduleItem {
  id: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room?: string | null;
  className?: string;
  subjectCode?: string;
  subjectName?: string;
  teacherName?: string;
  classId?: string;
}

const DAYS_OF_WEEK = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

export default function SchedulesPage() {
  const navigate = useNavigate();
  const [role, setRole] = useState<"ADMIN" | "TEACHER" | "STUDENT">("STUDENT");
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string>("ALL");

  const loadSchedules = async () => {
    setLoading(true);
    setError(null);
    try {
      const cached = localStorage.getItem(AUTH_USER_KEY);
      let currentRole: "ADMIN" | "TEACHER" | "STUDENT" = "STUDENT";
      if (cached) {
        try {
          const user = JSON.parse(cached) as IdentityUser;
          if (user.role) currentRole = user.role;
        } catch {
          // ignore
        }
      }
      setRole(currentRole);

      const token = localStorage.getItem(AUTH_TOKEN_KEY);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      if (currentRole === "ADMIN") {
        // Fetch classes to compile complete institutional timetable
        const res = await fetch(`${BACKEND_BASE_URL}/classes?limit=100`, {
          headers,
          credentials: "omit",
        });
        if (!res.ok) throw new Error("Failed to load institutional classes");
        const json = await res.json();
        const classes = json.data || [];

        // For each class, fetch schedules
        const items: ScheduleItem[] = [];
        await Promise.all(
          classes.map(async (cls: any) => {
            try {
              const schedRes = await fetch(`${BACKEND_BASE_URL}/classes/${cls.id}/schedules`, {
                headers,
                credentials: "omit",
              });
              if (schedRes.ok) {
                const schedJson = await schedRes.json();
                const schedList = schedJson.data || [];
                schedList.forEach((s: any) => {
                  items.push({
                    id: s.id,
                    dayOfWeek: s.dayOfWeek,
                    startTime: s.startTime,
                    endTime: s.endTime,
                    room: s.room,
                    className: cls.name,
                    subjectCode: cls.subject?.code,
                    subjectName: cls.subject?.name,
                    teacherName: cls.teacher?.name || cls.teacher?.fullName,
                    classId: cls.id,
                  });
                });
              }
            } catch {
              // ignore individual class schedule failures
            }
          })
        );
        setSchedules(items);
      } else {
        // Teacher or Student: fetch from role dashboard which contains personalized upcoming schedules
        const endpoint =
          currentRole === "TEACHER"
            ? `${BACKEND_BASE_URL}/dashboard/teacher`
            : `${BACKEND_BASE_URL}/dashboard/student`;

        const res = await fetch(endpoint, {
          headers,
          credentials: "omit",
        });
        if (!res.ok) throw new Error("Failed to load your personal timetable");
        const json = await res.json();
        const scheds = json.data?.upcomingSchedules || [];
        const items: ScheduleItem[] = scheds.map((s: any) => ({
          id: s.id,
          dayOfWeek: s.dayOfWeek,
          startTime: s.startTime,
          endTime: s.endTime,
          room: s.room,
          className: s.class?.name || s.className,
          subjectCode: s.class?.subject?.code || s.subjectCode,
          subjectName: s.class?.subject?.name || s.subjectName,
          teacherName: s.class?.teacher?.name || s.teacherName,
          classId: s.classId || s.class?.id,
        }));
        setSchedules(items);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to load schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchedules();
  }, []);

  const filtered = schedules.filter((s) => {
    if (selectedDay === "ALL") return true;
    return s.dayOfWeek?.toUpperCase() === selectedDay;
  });

  // Sort by day of week then by start time
  const dayOrder: Record<string, number> = {
    MONDAY: 1,
    TUESDAY: 2,
    WEDNESDAY: 3,
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
  };

  const sorted = [...filtered].sort((a, b) => {
    const dayA = dayOrder[a.dayOfWeek?.toUpperCase()] || 99;
    const dayB = dayOrder[b.dayOfWeek?.toUpperCase()] || 99;
    if (dayA !== dayB) return dayA - dayB;
    return (a.startTime || "").localeCompare(b.startTime || "");
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Schedules</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {role === "ADMIN" &&
              "Complete institutional timetable and classroom allocations across all departments."}
            {role === "TEACHER" &&
              "Your weekly teaching roster and classroom allocations."}
            {role === "STUDENT" &&
              "Your enrolled classes weekly timetable and lecture locations."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={loadSchedules}
            disabled={loading}
          >
            <RefreshCw
              className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      {/* Day of Week Filter */}
      <div className="flex flex-wrap gap-2 items-center bg-muted/40 p-2 rounded-lg border">
        <span className="text-xs font-semibold text-muted-foreground mr-2 ml-1">
          Filter Day:
        </span>
        <Button
          size="sm"
          variant={selectedDay === "ALL" ? "default" : "ghost"}
          onClick={() => setSelectedDay("ALL")}
          className="text-xs h-8"
        >
          All Days
        </Button>
        {DAYS_OF_WEEK.map((day) => (
          <Button
            key={day}
            size="sm"
            variant={selectedDay === day ? "default" : "ghost"}
            onClick={() => setSelectedDay(day)}
            className="text-xs h-8 capitalize"
          >
            {day.toLowerCase()}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <RefreshCw className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : error ? (
        <Card className="border-destructive/30 bg-destructive/10">
          <CardContent className="py-8 text-center space-y-3">
            <AlertCircle className="h-8 w-8 text-destructive mx-auto" />
            <p className="text-sm text-destructive">{error}</p>
            <Button variant="outline" size="sm" onClick={loadSchedules}>
              Try Again
            </Button>
          </CardContent>
        </Card>
      ) : sorted.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="py-16 text-center space-y-3">
            <CalendarDays className="h-10 w-10 text-muted-foreground mx-auto" />
            <h3 className="text-base font-semibold">No schedules found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              {selectedDay === "ALL"
                ? "There are currently no active classroom schedules assigned."
                : `No classes are scheduled on ${selectedDay.toLowerCase()}.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((item) => (
            <Card
              key={item.id}
              className="hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between"
              onClick={() => {
                if (item.classId) navigate(`/portal/classes/show/${item.classId}`);
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="font-mono text-xs">
                    {item.dayOfWeek}
                  </Badge>
                  {item.room && (
                    <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                      <MapPin className="h-3 w-3" />
                      {item.room}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-base font-semibold mt-2 line-clamp-1">
                  {item.className || "Class"}
                </CardTitle>
                <CardDescription className="line-clamp-1">
                  {item.subjectCode ? `${item.subjectCode} — ` : ""}
                  {item.subjectName || "Subject"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">
                    {item.startTime} - {item.endTime}
                  </span>
                </div>
                {item.teacherName && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <GraduationCap className="h-3.5 w-3.5" />
                    <span>Faculty: {item.teacherName}</span>
                  </div>
                )}
                <div className="pt-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 text-primary hover:text-primary"
                  >
                    View Class <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
