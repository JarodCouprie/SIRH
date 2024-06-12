import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth.tsx";
import { AuthTokens } from "@/type/context/authTokens.tsx";

export function LoginForm() {
  const navigate = useNavigate();
  const { setToken } = useAuth() as AuthTokens;
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
      navigate("/", { replace: true });
    } else {
      toast.error(`${fetchData.message}`);
    }
  };
  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-12 bg-gray-100 text-gray-950 dark:bg-gray-900 dark:text-gray-100">
      <h1 className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-5xl text-transparent">
        Bienvenue sur SIRH
      </h1>
      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleClickSubmitButton}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-xl" htmlFor="email">
            Email
          </Label>
          <Input type="email" id="email" placeholder="Email" name="email" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
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
  );
}
