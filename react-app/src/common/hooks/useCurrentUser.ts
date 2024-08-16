import { createContext, useContext } from "react";
import { UserModel } from "@/models/user/User.model.ts";

export const CurrentUserContext = createContext({
  currentUser: new UserModel(),
  refreshCurrentUser: () => {},
});

export function useCurrentUser() {
  return useContext(CurrentUserContext);
}
