import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export function NewUser() {
  const navigate = useNavigate();
  const handleGoBackToList = () => {
    navigate("/user");
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <Button onClick={handleGoBackToList} variant="link">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        <span>Utilisateurs</span>
      </Button>
      <div className="w-full p-4">
        <Card>
          <CardHeader>
            <CardTitle>Nouvel utilisateur</CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <Label className="text-xl" htmlFor="name">
                Nom
              </Label>
              <Input type="text" id="name" placeholder="Nom" name="name" />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
