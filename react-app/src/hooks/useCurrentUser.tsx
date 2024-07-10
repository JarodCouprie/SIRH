import { createContext, useContext, useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { UserModel } from "@/models/User.model.ts";

const CurrentUserContext = createContext({
  user: new UserModel(),
  refreshUser: () => {},
});

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserProvider({ children }: any) {
  const [user, setUser] = useState<UserModel>(new UserModel());
  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/me`).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUser(response.data.data);
    });
  };
  useEffect(() => {
    fetchUser().then();
  }, []);

  function refreshUser() {
    fetchUser().then();
  }

  return (
    <CurrentUserContext.Provider value={{ user, refreshUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
