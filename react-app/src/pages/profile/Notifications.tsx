import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { InProgress } from "@/components/navigation/InProgress.tsx";

export const Notifications = () => {
  return (
    <MainRoot title="Notifications">
      <InProgress />
    </MainRoot>
  );
};
