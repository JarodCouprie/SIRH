import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth.ts";
import { AuthTokens } from "@/type/context/auth-tokens.type.ts";
import { useCurrentUser } from "@/hooks/useCurrentUser.ts";

export function LoginForm() {
  const navigate = useNavigate();
  const { setToken } = useAuth() as AuthTokens;
  const { refreshCurrentUser } = useCurrentUser();
  const handleClickSubmitButton = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const userData = { email, password };
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const fetchData = await response.json();
    if (response.status === 200) {
      setToken(fetchData.data.accessToken, fetchData.data.refreshToken);
      refreshCurrentUser();
      navigate("/", { replace: true });
    } else {
      toast.error(`${fetchData.message}`);
    }
  };
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-12 bg-black text-gray-950 dark:text-gray-100">
      <div className="grid size-full grid-cols-3 rounded-xl">
        <div className="relative col-span-2 rounded max-lg:hidden">
          <div className="absolute size-full bg-[url('@/assets/pompidou.jpg')] bg-fixed bg-center opacity-50"></div>
          <div className="relative z-10 grid size-full place-items-center p-20">
            <div className="flex flex-col items-start gap-4">
              <h1 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-center text-8xl text-transparent">
                Bienvenue sur SIRH
              </h1>
              <p className="text-slate-50">
                La plateforme RH qui simplifie la gestion de votre entreprise !
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center rounded-r bg-white dark:bg-slate-900 max-lg:col-span-3">
          <h2 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-center text-4xl text-transparent">
            Connexion
          </h2>
          <form
            className="flex w-full flex-col items-center gap-6 px-20 py-6"
            onSubmit={handleClickSubmitButton}
          >
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-xl" htmlFor="email">
                Email
              </Label>
              <Input type="email" id="email" placeholder="Email" name="email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label className="text-xl" htmlFor="password">
                Mot de passe
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
              />
            </div>
            <Button type="submit" className="w-full" variant="default">
              Envoyer
              <PaperPlaneIcon className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
