import { UserModel } from "@/models/user/User.model.ts";
import React, { Dispatch, SetStateAction } from "react";
import { UserSecurity } from "@/modules/user/components/userSecurity.js";
import { UserAddress } from "@/modules/user/components/userAddress.js";
import { UserBankInfos } from "@/modules/user/components/userBankInfos.js";
import { UserInfos } from "@/modules/user/components/userInfos.js";

interface UserDetailsProps {
  user: UserModel;
  setUser: Dispatch<SetStateAction<UserModel>>;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user, setUser }) => {
  return (
    <div className="grid w-full grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4 max-2xl:col-span-3">
        <UserInfos user={user} setUser={setUser} />
        <UserSecurity user={user} setUser={setUser} />
      </div>
      <div className="col-span-2 flex flex-col gap-4 max-2xl:col-span-3">
        <UserAddress user={user} setUser={setUser} />
        <UserBankInfos user={user} setUser={setUser} />
      </div>
    </div>
  );
};
