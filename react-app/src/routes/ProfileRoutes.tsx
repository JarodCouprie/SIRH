import { Profile } from "@/components/profile/profile.tsx";
import { ResetPassword } from "@/components/profile/resetPassword.tsx";

export const profileRoutes = {
  path: "profile",
  children: [
    { path: "", element: <Profile /> },
    { path: "reset-password", element: <ResetPassword /> },
  ],
};
