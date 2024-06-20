import { createContext, useContext, useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { UserModel } from "@/models/UserModel.ts";

const CurrentUserContext = createContext({
  user: new UserModel(0, "", "", "", new Date(), false, 0, 0, 0),
});

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}

export function CurrentUserProvider({ children }: any) {
  const [user, setUser] = useState<UserModel>({
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    createdAt: new Date(),
    active: false,
    ca: 0,
    tt: 0,
    rtt: 0,
  });

  const fetchUser = async () => {
    await customFetcher(`http://localhost:5000/api/me`).then((response) => {
      if (response.response.status !== 200) {
        return;
      }
      setUser(response.data.data);
      console.log(response.data.data);
    });
  };

  useEffect(() => {
    fetchUser().then();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ user }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
