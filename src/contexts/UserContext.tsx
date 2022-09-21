import { FetchResult } from "@apollo/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
} from "react";
import {
  createUser,
  createUserVariables,
} from "../gql/__generated__/createUser";
import { me_me } from "../gql/__generated__/me";
import {
  signInUser,
  signInUserVariables,
} from "../gql/__generated__/signInUser";
import {
  updateUser,
  updateUserVariables,
} from "../gql/__generated__/updateUser";
import { UserHook } from "../hooks/UserHook";

interface Context {
  SignInUser: ({
    data,
  }: signInUserVariables) => Promise<
    FetchResult<signInUser, Record<string, any>, Record<string, any>>
  >;
  SignUpUser: ({
    data,
  }: createUserVariables) => Promise<
    FetchResult<createUser, Record<string, any>, Record<string, any>>
  >;
  user: me_me | null;
  setUser: Dispatch<SetStateAction<me_me | null>>;
  logout: () => void;
  UpdateUser: ({
    data,
  }: updateUserVariables) => Promise<
    FetchResult<updateUser, Record<string, any>, Record<string, any>>
  >;
}
export const Context = createContext<Context>({} as Context);

export const UserWrapper = ({ children }: { children: ReactNode }) => {
  const { SignInUser, SignUpUser, setUser, user, logout, UpdateUser } =
    UserHook();
  return (
    <Context.Provider
      value={{
        SignInUser,
        SignUpUser,
        setUser,
        user,
        logout,
        UpdateUser,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const WithUser = () => {
  return useContext(Context);
};
