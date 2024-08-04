import { createContext, useContext, useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { UserModel } from "@/models/user/User.model.ts";

const CurrentUserContext = createContext({
  currentUser: new UserModel(),
  refreshCurrentUser: () => {},
});

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserProvider({ children }: any) {
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
}
