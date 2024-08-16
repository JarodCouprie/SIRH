import { Profile } from "@/modules/profile/Profile.tsx";
import { ResetPassword } from "@/modules/profile/ResetPassword.tsx";
import { Notifications } from "@/modules/profile/Notifications.tsx";

export const profileRoutes = {
  path: "profile",
  children: [
    { path: "", element: <Profile /> },
    { path: "reset-password", element: <ResetPassword /> },
    { path: "notifications", element: <Notifications /> },
  ],
};
