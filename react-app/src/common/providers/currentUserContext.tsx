import React, { useEffect, useState } from "react";
import { UserModel } from "@/models/user/User.model.ts";
import { CurrentUserContext } from "@/common/hooks/useCurrentUser";
import { customFetcher } from "@/common/helper/fetchInstance.js";

export const CurrentUserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<UserModel>(new UserModel());
  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/me`).then((response) => {
      if (response.data) {
        setCurrentUser(response.data.data);
      }
    });
  };
  useEffect(() => {
    fetchUser().then();
  }, []);

  function refreshCurrentUser() {
    fetchUser().then();
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, refreshCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
