import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Layout } from "../components/Layout";
import { UserWrapper } from "../contexts/UserContext";
import Cookies from "universal-cookie";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { DataWrapper } from "../contexts/DataContext";

function MyApp({ Component, pageProps }: AppProps) {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  const wsLink =
    typeof window !== "undefined"
      ? new GraphQLWsLink(
          createClient({
            url: "ws://localhost:5000/graphql",
            connectionParams: {
              Authorization: accessToken,
            },
          })
        )
      : null;

  const httpLink = createHttpLink({
    uri: "http://localhost:5000/graphql",
    credentials: "same-origin",
    headers: {
      Authorization: accessToken,
    },
  });

  const link =
    typeof window !== "undefined" && wsLink != null
      ? split(
          ({ query }) => {
            const def = getMainDefinition(query);
            return (
              def.kind === "OperationDefinition" &&
              def.operation === "subscription"
            );
          },
          wsLink,
          httpLink
        )
      : httpLink;

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    ssrMode: true,
  });
  return (
    <ApolloProvider client={client}>
      <UserWrapper>
        <Layout>
          <DataWrapper>
            <Component {...pageProps} />
          </DataWrapper>
        </Layout>
      </UserWrapper>
    </ApolloProvider>
  );
}

export default MyApp;
