import { useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import jwt from "jsonwebtoken";
import { CREATE_USER, ME, SIGNIN_USER, UPDATE_USER } from "../gql";
import {
  createUser,
  createUserVariables,
} from "../gql/__generated__/createUser";
import { me, me_me } from "../gql/__generated__/me";
import {
  signInUser,
  signInUserVariables,
} from "../gql/__generated__/signInUser";
import { useRouter } from "next/router";
import {
  updateUser,
  updateUserVariables,
} from "../gql/__generated__/updateUser";
export const UserHook = () => {
  const [singInUser] = useMutation<signInUser>(SIGNIN_USER);
  const [createUser] = useMutation<createUser>(CREATE_USER);
  const [getMe] = useLazyQuery<me>(ME);
  const [updateUser] = useMutation<updateUser>(UPDATE_USER);

  const [user, setUser] = useState<me["me"] | null>(null);
  const cookies = new Cookies();
  const effectRan = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (effectRan.current) return;
    const accessToken = cookies.get("accessToken");
    if (accessToken) {
      getMe().then(({ data }) => {
        if (data) {
          setUser(data.me);
        }
      });
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  const SignInUser = async ({ data }: signInUserVariables) => {
    const res = await singInUser({
      variables: {
        data: data,
      },
    });
    if (res.data) {
      cookies.set("accessToken", res.data.signInUser.accessToken, {
        path: "/",
      });
      const decryptedUser = jwt.verify(
        res.data.signInUser.accessToken,
        "SECRET"
      ) as me_me;
      setUser(decryptedUser);
    }
    return res;
  };
  const SignUpUser = async ({ data }: createUserVariables) => {
    return await createUser({
      variables: {
        data: data,
      },
    });
  };
  const UpdateUser = async ({ data }: updateUserVariables) => {
    const res = await updateUser({
      variables: {
        data: data,
      },
    });
    if (res.data) {
      setUser(res.data.updateUser);
    }
    return res;
  };
  const logout = () => {
    cookies.remove("accessToken");
    router.reload();
  };

  return { SignInUser, SignUpUser, setUser, user, logout, UpdateUser };
};
