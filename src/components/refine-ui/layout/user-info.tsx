import { useGetIdentity } from "@refinedev/core";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/refine-ui/layout/user-avatar";
import { cn } from "@/lib/utils";

type User = {
  id: string | number;
  name?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email: string;
  avatar?: string | null;
  role?: string;
};

export function UserInfo() {
  const { data: user, isLoading: userIsLoading } = useGetIdentity<User>();

  if (userIsLoading || !user) {
    return (
      <div className={cn("flex", "items-center", "gap-x-2")}>
        <Skeleton className={cn("h-10", "w-10", "rounded-full")} />
        <div className={cn("flex", "flex-col", "justify-between", "h-10")}>
          <Skeleton className={cn("h-4", "w-32")} />
          <Skeleton className={cn("h-4", "w-24")} />
        </div>
      </div>
    );
  }

  const displayName =
    user.fullName ||
    user.name ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.email;

  return (
    <div className={cn("flex", "items-center", "gap-x-2")}>
      <UserAvatar />
      <div
        className={cn(
          "flex",
          "flex-col",
          "justify-between",
          "h-10",
          "text-left"
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className={cn("text-sm", "font-medium", "text-foreground")}>
            {displayName}
          </span>
          {user.role && (
            <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary">
              {user.role}
            </span>
          )}
        </div>
        <span className={cn("text-xs", "text-muted-foreground")}>{user.email}</span>
      </div>
    </div>
  );
}

UserInfo.displayName = "UserInfo";
