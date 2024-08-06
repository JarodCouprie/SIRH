import { Profile } from "@/pages/profile/Profile.tsx";
import { ResetPassword } from "@/pages/profile/ResetPassword.tsx";
import { Notifications } from "@/pages/profile/Notifications.tsx";

export const profileRoutes = {
  path: "profile",
  children: [
    { path: "", element: <Profile /> },
    { path: "reset-password", element: <ResetPassword /> },
    { path: "notifications", element: <Notifications /> },
  ],
};
