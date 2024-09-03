import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { NotificationsCard } from "@/modules/profile/components/notificationsCard.tsx";

export const Notifications = () => {
  return (
    <MainRoot title="Notifications">
      <NotificationsCard />
    </MainRoot>
  );
};
