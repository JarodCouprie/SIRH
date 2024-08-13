import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

export default function NotFound() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="grid h-dvh w-full place-items-center bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-50">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-9xl font-bold">404</h1>
        <h2>Oops! On dirait que vous vous êtes perdus.</h2>
        <Button variant="callToAction" onClick={handleRedirect}>
          <ArrowLeftIcon className="mr-4 size-4" />
          Retourner à l'Accueil
        </Button>
      </div>
    </div>
  );
}
