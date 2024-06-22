import { createContext, useContext, useEffect, useState } from "react";
import { customFetcher } from "@/helper/fetchInstance.ts";
import { UserModel } from "@/models/User.model.ts";

const CurrentUserContext = createContext({
  user: new UserModel(0, "", "", "", "", new Date(), false, ""),
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
    phone: "",
    created_at: new Date(),
    active: false,
    locality: "",
  });
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

  return (
    <CurrentUserContext.Provider value={{ user }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
