import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BellIcon,
  ExitIcon,
  Half2Icon,
  LockClosedIcon,
  MixerVerticalIcon,
  MoonIcon,
  PersonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "@/common/hooks/useTheme.ts";
import { useAuth } from "@/common/hooks/useAuth.ts";
import { AuthTokens } from "@/common/type/context/auth-tokens.type.ts";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.ts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.js";

export function UserMenu() {
  const { setSystemTheme, setDarkTheme, setLightTheme } = useTheme();
  const { currentUser } = useCurrentUser();
  const handleDarkTheme = () => {
    setDarkTheme();
  };
  const handleLightTheme = () => {
    setLightTheme();
  };
  const handleSystemTheme = () => {
    setSystemTheme();
  };
  const localTheme = localStorage.theme || "dark";
  return (
    <div className="border-t border-gray-700 p-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="noneLeft"
            className="flex w-full justify-between gap-2"
          >
            <div className="flex w-full gap-2">
              <Avatar className="size-8">
                <AvatarImage
                  src={currentUser?.avatar_url}
                  alt={`avatar image of ${currentUser?.firstname} ${currentUser?.lastname}`}
                />
                <AvatarFallback>
                  {currentUser.firstname.charAt(0)}
                  {currentUser.lastname.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start justify-start max-md:hidden">
                <span className="text-gray-50">
                  {currentUser.firstname} {currentUser.lastname}
                </span>
                <span className="text-xs text-gray-300">Connecté</span>
              </div>
            </div>
            <MixerVerticalIcon className="size-6 text-gray-300" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            {currentUser.firstname} {currentUser.lastname}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <NavLink to="/profile">
              <DropdownMenuItem>
                Mon profil
                <DropdownMenuShortcut>
                  <PersonIcon />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </NavLink>
            <NavLink to="/profile/notifications">
              <DropdownMenuItem>
                Notifications
                <DropdownMenuShortcut>
                  <BellIcon />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </NavLink>
            <NavLink to="/profile/reset-password">
              <DropdownMenuItem>
                Nouveau mot de passe
                <DropdownMenuShortcut>
                  <LockClosedIcon />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </NavLink>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Thème</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <div className="flex flex-col gap-1">
                    <DropdownMenuItem
                      onClick={handleLightTheme}
                      className={
                        localTheme === "light"
                          ? "bg-gray-200 dark:bg-gray-800"
                          : ""
                      }
                    >
                      Clair
                      <DropdownMenuShortcut>
                        <SunIcon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleDarkTheme}
                      className={
                        localTheme === "dark"
                          ? "bg-gray-200 dark:bg-gray-800"
                          : ""
                      }
                    >
                      Foncé
                      <DropdownMenuShortcut>
                        <MoonIcon />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleSystemTheme}
                    className={
                      localTheme === "os-default"
                        ? "bg-gray-200 dark:bg-gray-800"
                        : ""
                    }
                  >
                    Système
                    <DropdownMenuShortcut>
                      <Half2Icon />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <ConfirmLogOutDialog />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export function ConfirmLogOutDialog() {
  const navigate = useNavigate();
  const { setToken } = useAuth() as AuthTokens;
  const handleLogOut = () => {
    setToken("", "");
    navigate(`/login`);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Déconnexion
          <DropdownMenuShortcut>
            <ExitIcon />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr?</AlertDialogTitle>
          <AlertDialogDescription>
            Vous allez être déconnecté et redirigé vers l'écran de connexion.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogOut}>
            Déconnexion
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
