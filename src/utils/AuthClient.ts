import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { GetServerSidePropsContext } from "next";
import Cookies from "universal-cookie";

export const AuthClient = (accessToken: string) => {
  // const cookie = new Cookies(req.headers.cookie);
  // const accessToken = cookie.get("accessToken");
  const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
  });
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: accessToken,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    ssrMode: true,
  });
  return client;
};
