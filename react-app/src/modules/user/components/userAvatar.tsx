import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip.js";
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
} from "@/components/ui/alert-dialog.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.js";
import { FaPen } from "react-icons/fa";
import { Input } from "@/components/ui/input.js";
import { UserModel } from "@/models/user/User.model.js";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { customFetcher } from "@/common/helper/fetchInstance.js";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.js";

interface UserAvatarProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
  resource?: string;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  user,
  setUser,
  resource = "user",
}) => {
  const [file, setFile] = useState<File | null>(null);
  const { currentUser, refreshCurrentUser } = useCurrentUser();
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmitPicture = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      method: "PUT",
      body: formData,
    };
    await customFetcher(
      `http://localhost:5000/api/${resource}/set-picture/${user.id}`,
      config,
      false,
    ).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUser(response.data.data);

      if (currentUser.id === user.id) {
        refreshCurrentUser();
      }
    });
  };

  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>
              <Avatar className="size-14 cursor-pointer">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback>
                  {user?.firstname?.charAt(0)}
                  {user?.lastname?.charAt(0)}
                </AvatarFallback>
                <div className="absolute left-0 top-0 grid size-full place-items-center bg-slate-700 opacity-0 transition duration-200 hover:opacity-90">
                  <FaPen className="size-6 text-gray-50" />
                </div>
              </Avatar>
            </AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Modifier la photo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Nouvelle image de profil</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Input
            type="file"
            className="cursor-pointer bg-gray-50"
            onChange={handleFileChange}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmitPicture}>
            Modifier
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
