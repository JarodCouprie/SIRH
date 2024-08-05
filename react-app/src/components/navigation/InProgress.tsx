import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { GiBarrier } from "react-icons/gi";

export const InProgress = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };
  return (
    <Card className="h-full bg-gradient-to-bl from-cyan-700">
      <CardContent className="grid h-full place-items-center">
        <div className="flex flex-col items-center gap-4">
          <GiBarrier className="size-52" />
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="text-4xl">Travaux en cours</div>
            <div>Cette fonctionnalités arrive très prochainement</div>
          </div>
          <Button variant="callToAction" onClick={handleRedirect}>
            Retourner à l'Accueil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
