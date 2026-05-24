import type { UserRole } from "@/types/auth";

export type UserProfile = {
  id: string;
  full_name: string;
  role: UserRole;
};
