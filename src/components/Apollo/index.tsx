import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactElement } from "react";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('KMB_token') || '',
  },
  uri: "http://localhost:4000/", // API local
  //  uri: 'https://mkb-api-production.up.railway.app/' // API railway
});
type Props = {
  children: ReactElement;
};
const APolloClient = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default APolloClient;
