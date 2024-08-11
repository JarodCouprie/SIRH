import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { OrganisationMap } from "@/components/organisation/OrganisationMap.js";
import { Button } from "@/components/ui/button.js";
import { PlusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const Organisation = () => {
  const navigate = useNavigate();

  const handleClickCreate = () => {
    navigate("agency/create");
  };

  const newOrg = (
    <Button variant="callToAction" onClick={handleClickCreate}>
      <PlusIcon className="mr-2 size-4" />
      Créer une organisation
    </Button>
  );

  return (
    <MainRoot title="Organisation" action={newOrg}>
      <div className="grid h-full grid-cols-4">
        <div className="col-span-1"></div>
        <div className="col-span-3">
          <OrganisationMap />
        </div>
      </div>
    </MainRoot>
  );
};
