import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { InProgress } from "@/components/navigation/InProgress.tsx";

export const Dashboard = () => {
  return (
    <MainRoot title="Dashboard">
      <InProgress />
    </MainRoot>
  );
};
