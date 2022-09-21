import "../styles/globals.css";
import type { AppProps } from "next/app";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
  createHttpLink,
} from "@apollo/client";
import { Layout } from "../components/Layout";
import { UserWrapper } from "../contexts/UserContext";
import { setContext } from "@apollo/client/link/context";
import Cookies from "universal-cookie";
const link = createHttpLink({
  uri: "http://localhost:5000/graphql",
  credentials: "same-origin",
});

const authLink = setContext((_, { headers }) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("accessToken");
  return {
    headers: {
      ...headers,
      authorization: accessToken,
    },
  };
});
export const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  ssrMode: true,
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <UserWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserWrapper>
    </ApolloProvider>
  );
}

export default MyApp;
