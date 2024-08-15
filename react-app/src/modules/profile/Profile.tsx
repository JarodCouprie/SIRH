import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { InProgress } from "@/components/navigation/InProgress.tsx";

export const Profile = () => {
  return (
    <MainRoot title="Profil">
      <InProgress />
    </MainRoot>
  );
};
