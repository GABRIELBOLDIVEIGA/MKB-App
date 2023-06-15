import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactElement } from "react";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('KMB_token') || '',
  },
  uri: process.env.URIGQL?.toString() || `${process.env.URIGQL}` || process.env.URIGQL || "http://localhost:4000/", // API local
  // uri: "http://192.168.100.106:4000/", // API mobile
  // uri: "https://api-mkb.herokuapp.com/", // API heroku
  // uri: `${process.env.URIGQL}` || "http://localhost:4000/", // API railway
  //  uri: 'https://mkb-api-production.up.railway.app/' // API railway
});
type Props = {
  children: ReactElement;
};
const APolloClient = ({ children }: Props) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default APolloClient;
