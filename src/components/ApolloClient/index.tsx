import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactElement } from "react";
const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/",
    // uri: "https://api-mkb.herokuapp.com/",
});
type Props = {
    children: ReactElement;
};
const APolloClient = ({ children }: Props) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default APolloClient;
