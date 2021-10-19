import { User } from "@src/fragments/types/User";
import React from "react";

interface UserContext {
  logout?: () => void;
  user?: User;
  storeName?: any;
  hasToken? : any;
}

export const UserContext = React.createContext<UserContext>({
  user: {}
});


export * from "./utils";
