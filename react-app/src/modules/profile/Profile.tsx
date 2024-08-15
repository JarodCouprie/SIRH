import { MainRoot } from "@/components/navigation/MainRoot.tsx";
import { UserInfos } from "@/modules/user/components/userInfos.js";
import { UserAddress } from "@/modules/user/components/userAddress.js";
import { UserBankInfos } from "@/modules/user/components/userBankInfos.js";
import { useEffect } from "react";
import { useCurrentUser } from "@/common/hooks/useCurrentUser.js";
import { UserAvatar } from "@/modules/user/components/userAvatar.js";

export const Profile = () => {
  const { currentUser, refreshCurrentUser } = useCurrentUser();

  useEffect(() => {
    refreshCurrentUser();
  }, []);

  return (
    <MainRoot title="Profil">
      <div className="flex items-center gap-2 p-4">
        <UserAvatar
          user={currentUser}
          setUser={refreshCurrentUser}
          path="profile/update-picture"
        />
        <div className="flex flex-col">
          <span className="text-3xl font-bold text-gray-950 dark:text-slate-200">
            {currentUser?.firstname} {currentUser?.lastname}
          </span>
          <span className="text-gray-500">{currentUser?.email}</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
          <UserInfos
            user={currentUser}
            setUser={refreshCurrentUser}
            path="profile/update-infos"
          />
        </div>
        <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
          <UserAddress
            user={currentUser}
            setUser={refreshCurrentUser}
            path="profile/update-address"
          />
          <UserBankInfos
            user={currentUser}
            setUser={refreshCurrentUser}
            path="profile/update-bank-infos"
          />
        </div>
      </div>
    </MainRoot>
  );
};
